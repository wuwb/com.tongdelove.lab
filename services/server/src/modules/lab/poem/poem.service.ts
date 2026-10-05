import { Injectable, Logger } from '@nestjs/common'
import { and, asc, count, desc, eq, ilike, inArray, or, sql } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import {
  keyword,
  poem,
  poemAuthor,
  poemCard,
  poemKeywords,
  poemTag,
  poemToPoemTag,
} from '@/core/database/drizzle/schema'

/**
 * lab 诗词业务的 Drizzle 数据访问层。
 *
 * 承接原 apps/lab 中 tRPC routers（poem/poemAuthor/poemCard/poemTag）
 * 的全部查询与写入逻辑，前端改为通过本模块的 HTTP 接口访问。
 */
@Injectable()
export class LabPoemService {
  private readonly logger = new Logger(LabPoemService.name)

  constructor(private readonly drizzle: DrizzleService) {}

  // ---------------------------------------------------------------- poem

  async count() {
    const [row] = await this.drizzle.db.select({ value: count() }).from(poem)
    return Number(row?.value ?? 0)
  }

  /** 判断同一作者下是否存在同名诗词（返回是否重复）。 */
  async isSame(input: { authorId: number; title: string }) {
    const [row] = await this.drizzle.db
      .select({ value: count() })
      .from(poem)
      .where(
        and(eq(poem.authorId, input.authorId), eq(poem.title, input.title)),
      )
    return Number(row?.value ?? 0) > 1
  }

  async deleteById(id: number) {
    await this.drizzle.db.delete(poemCard).where(eq(poemCard.poemId, id))
    const [row] = await this.drizzle.db
      .delete(poem)
      .where(eq(poem.id, id))
      .returning()
    return row ?? null
  }

  async findByAuthorId(input: {
    authorId: number
    page?: number
    pageSize?: number
    select?: Array<'title' | 'titlePinYin' | 'content' | 'views' | 'author'>
  }) {
    const { authorId } = input
    const page = input.page ?? 1
    const pageSize = input.pageSize ?? 28
    const select = input.select ?? ['title', 'titlePinYin']

    const where = eq(poem.authorId, authorId)

    const [totalRow, data] = await Promise.all([
      this.drizzle.db.select({ value: count() }).from(poem).where(where),
      this.drizzle.db
        .select({
          id: poem.id,
          title: poem.title,
          titlePinYin: poem.titlePinYin,
          content: poem.content,
          views: poem.views,
          author: poemAuthor,
        })
        .from(poem)
        .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
        .where(where)
        .limit(pageSize)
        .offset((page - 1) * pageSize),
    ])

    const total = Number(totalRow[0]?.value ?? 0)

    // 与原 prisma select 行为保持一致：未选中的字段不出现在返回中
    const rows = data.map((item) => ({
      id: item.id,
      ...(select.includes('title') ? { title: item.title } : {}),
      ...(select.includes('titlePinYin')
        ? { titlePinYin: item.titlePinYin }
        : {}),
      ...(select.includes('content') ? { content: item.content } : {}),
      ...(select.includes('views') ? { views: item.views } : {}),
      ...(select.includes('author') && item.author ? { author: item.author } : {}),
    }))

    return { data: rows, page, pageSize, hasNext: page * pageSize < total, total }
  }

  async sitemap() {
    return this.drizzle.db
      .select({ id: poem.id, updatedAt: poem.updatedAt })
      .from(poem)
  }

  async search(keyword: string) {
    const pattern = `%${keyword}%`
    const where = keyword
      ? or(
          ilike(poem.title, pattern),
          ilike(poem.content, pattern),
          ilike(poemAuthor.name, pattern),
        )
      : undefined

    return this.drizzle.db
      .select({
        author: { id: poemAuthor.id, name: poemAuthor.name },
        title: poem.title,
        content: poem.content,
        id: poem.id,
      })
      .from(poem)
      .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
      .where(where)
      .orderBy(desc(poem.titlePinYin))
      .limit(50)
  }

  /** 诗词列表查询，支持三种排序策略。 */
  async find(input: {
    page?: number
    pageSize?: number
    sort?: 'updatedAt' | 'improve' | 'createdAt'
  }) {
    const page = input.page ?? 1
    const pageSize = input.pageSize ?? 28
    const sort = input.sort

    let data: Array<typeof poem.$inferSelect & {
      author: typeof poemAuthor.$inferSelect | null
    }>

    if (sort === 'improve') {
      // 待优化的 待完善：translation 为空的排在前面
      const rows = await this.drizzle.db
        .select({ poem: poem, author: poemAuthor })
        .from(poem)
        .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
        .orderBy(sql`${poem.translation} desc nulls first`)
        .limit(pageSize)
        .offset((page - 1) * pageSize)
      data = rows.map((row) => ({ ...row.poem, author: row.author }))
    } else if (sort === 'updatedAt') {
      // 首页推荐：取最近更新的 500 条，过滤出有译文的
      const rows = await this.drizzle.db
        .select({ poem: poem, author: poemAuthor })
        .from(poem)
        .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
        .orderBy(desc(poem.updatedAt))
        .limit(500)
      data = rows
        .map((row) => ({ ...row.poem, author: row.author }))
        .filter((item) => item.translation)
        .slice(0, pageSize)
    } else {
      const rows = await this.drizzle.db
        .select({ poem: poem, author: poemAuthor })
        .from(poem)
        .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
        .orderBy(desc(poem.createdAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize)
      data = rows.map((row) => ({ ...row.poem, author: row.author }))
    }

    const total = await this.count()

    return { data, page, pageSize, hasNext: page * pageSize < total, total }
  }

  /** 根据 id 查找诗词，同时异步累加 views。 */
  async findById(id: number) {
    void this.drizzle.db
      .update(poem)
      .set({ views: sql`${poem.views} + 1` })
      .where(eq(poem.id, id))
      .catch((error) => this.logger.error(error))

    const [row] = await this.drizzle.db
      .select({ poem: poem, author: poemAuthor })
      .from(poem)
      .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
      .where(eq(poem.id, id))
      .limit(1)

    if (!row) return null

    const tags = await this.listTagsByPoemId(id)
    const cards = await this.listCardsByPoemId(id)

    return { ...row.poem, author: row.author, tags, cards }
  }

  async findByTagId(input: { id: number; page?: number; pageSize?: number }) {
    const page = input.page ?? 1
    const pageSize = input.pageSize ?? 28
    const { id } = input

    const [tag] = await this.drizzle.db
      .select()
      .from(poemTag)
      .where(eq(poemTag.id, id))
      .limit(1)

    if (!tag) return null

    const ids = await this.listPoemIdsByTagId(id)
    const total = ids.length

    const rows = ids.length
      ? await this.drizzle.db
          .select({ poem: poem, author: poemAuthor })
          .from(poem)
          .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
          .where(inArray(poem.id, ids))
          .limit(pageSize)
          .offset((page - 1) * pageSize)
      : []

    return {
      data: rows.map((item) => ({ ...item.poem, author: item.author })),
      page,
      pageSize,
      hasNext: page * pageSize < total,
      tag,
      total,
    }
  }

  // ------------------------------------------------------- 多对多关联辅助

  async listPoemIdsByTagId(tagId: number) {
    const rows = await this.drizzle.db
      .select({ id: poemToPoemTag.a })
      .from(poemToPoemTag)
      .where(eq(poemToPoemTag.b, tagId))
    return rows.map((row) => row.id)
  }

  async listTagsByPoemId(poemId: number) {
    const rows = await this.drizzle.db
      .select({ tag: poemTag })
      .from(poemToPoemTag)
      .innerJoin(poemTag, eq(poemToPoemTag.b, poemTag.id))
      .where(eq(poemToPoemTag.a, poemId))
    return rows.map((row) => row.tag)
  }

  async listCardsByPoemId(poemId: number) {
    return this.drizzle.db
      .select()
      .from(poemCard)
      .where(eq(poemCard.poemId, poemId))
  }

  // ---------------------------------------------------------- poem_author

  async countAuthors() {
    const [row] = await this.drizzle.db
      .select({ value: count() })
      .from(poemAuthor)
    return Number(row?.value ?? 0)
  }

  async authorSitemap() {
    return this.drizzle.db
      .select({ id: poemAuthor.id, updatedAt: poemAuthor.updatedAt })
      .from(poemAuthor)
  }

  private authorPoemCount() {
    return sql<number>`(
      select count(*)::int from ${poem} where ${poem.authorId} = ${poemAuthor.id}
    )`
  }

  async findAuthors(input: {
    page?: number
    pageSize?: number
    keyword?: string
  }) {
    const page = input.page ?? 1
    const pageSize = input.pageSize ?? 28
    const where = input.keyword
      ? ilike(poemAuthor.name, `%${input.keyword}%`)
      : undefined

    const [totalRow, rows] = await Promise.all([
      this.drizzle.db
        .select({ value: count() })
        .from(poemAuthor)
        .where(where),
      this.drizzle.db
        .select({
          id: poemAuthor.id,
          name: poemAuthor.name,
          namePinYin: poemAuthor.namePinYin,
          introduce: poemAuthor.introduce,
          birthDate: poemAuthor.birthDate,
          deathDate: poemAuthor.deathDate,
          dynasty: poemAuthor.dynasty,
          createdAt: poemAuthor.createdAt,
          updatedAt: poemAuthor.updatedAt,
          poemCount: this.authorPoemCount(),
        })
        .from(poemAuthor)
        .where(where)
        .orderBy(sql`(${this.authorPoemCount()}) desc`)
        .limit(pageSize)
        .offset((page - 1) * pageSize),
    ])

    const total = Number(totalRow[0]?.value ?? 0)

    return {
      data: rows.map((row) => ({
        ...row,
        _count: { poems: Number(row.poemCount) },
      })),
      page,
      pageSize,
      hasNext: page * pageSize < total,
      total,
    }
  }

  async findAuthorById(id: number) {
    const [row] = await this.drizzle.db
      .select({
        id: poemAuthor.id,
        name: poemAuthor.name,
        namePinYin: poemAuthor.namePinYin,
        introduce: poemAuthor.introduce,
        birthDate: poemAuthor.birthDate,
        deathDate: poemAuthor.deathDate,
        dynasty: poemAuthor.dynasty,
        createdAt: poemAuthor.createdAt,
        updatedAt: poemAuthor.updatedAt,
        poemCount: this.authorPoemCount(),
      })
      .from(poemAuthor)
      .where(eq(poemAuthor.id, id))
      .limit(1)

    if (!row) return null
    return { ...row, _count: { poems: Number(row.poemCount) } }
  }

  /** 查询没有任何诗词的作者 */
  async findAuthorsWithoutPoem() {
    return this.drizzle.db
      .select({
        id: poemAuthor.id,
        name: poemAuthor.name,
        dynasty: poemAuthor.dynasty,
      })
      .from(poemAuthor)
      .where(
        sql`not exists (select 1 from ${poem} where ${poem.authorId} = ${poemAuthor.id})`,
      )
  }

  async createAuthor(input: {
    id?: number
    name: string
    nameZhHant?: string
    birthDate?: number
    deathDate?: number
    introduce?: string
    namePinYin?: string
    dynasty: string
  }) {
    const name = input.name.toLocaleLowerCase()

    if (input.id) {
      const [row] = await this.drizzle.db
        .update(poemAuthor)
        .set({
          name,
          nameZhHant: input.nameZhHant ?? null,
          introduce: input.introduce ?? null,
          birthDate: input.birthDate ?? null,
          deathDate: input.deathDate ?? null,
          namePinYin: input.namePinYin ?? null,
          dynasty: input.dynasty,
        })
        .where(eq(poemAuthor.id, input.id))
        .returning()
      return row ?? null
    }

    const exist = await this.drizzle.db
      .select({ id: poemAuthor.id })
      .from(poemAuthor)
      .where(
        and(eq(poemAuthor.name, name), eq(poemAuthor.dynasty, input.dynasty)),
      )

    if (exist.length > 0) {
      throw new Error('Author already exists')
    }

    const [row] = await this.drizzle.db
      .insert(poemAuthor)
      .values({ name, nameZhHant: input.nameZhHant ?? null, dynasty: input.dynasty })
      .returning()
    return row ?? null
  }

  async deleteAuthorById(id: number) {
    const [row] = await this.drizzle.db
      .delete(poemAuthor)
      .where(eq(poemAuthor.id, id))
      .returning()
    return row ?? null
  }

  // ------------------------------------------------------------- poem_tag

  private tagPoemCount() {
    return sql<number>`(
      select count(*)::int from ${poemToPoemTag} where ${poemToPoemTag.b} = ${poemTag.id}
    )`
  }

  async findTags(input: { type?: string | null; page?: number; pageSize?: number }) {
    const page = input.page ?? 1
    const pageSize = input.pageSize ?? 28
    const where = input.type ? eq(poemTag.type, input.type) : undefined

    const [totalRow, rows] = await Promise.all([
      this.drizzle.db
        .select({ value: count() })
        .from(poemTag)
        .where(where),
      this.drizzle.db
        .select({
          id: poemTag.id,
          name: poemTag.name,
          nameZhHant: poemTag.nameZhHant,
          type: poemTag.type,
          typeZhHant: poemTag.typeZhHant,
          introduce: poemTag.introduce,
          introduceZhHant: poemTag.introduceZhHant,
          createdAt: poemTag.createdAt,
          updatedAt: poemTag.updatedAt,
          poemCount: this.tagPoemCount(),
        })
        .from(poemTag)
        .where(where)
        .orderBy(sql`(${this.tagPoemCount()}) desc`)
        .limit(pageSize)
        .offset((page - 1) * pageSize),
    ])

    const total = Number(totalRow[0]?.value ?? 0)

    return {
      data: rows.map((row) => ({
        ...row,
        _count: { poems: Number(row.poemCount) },
      })),
      page,
      pageSize,
      hasNext: page * pageSize < total,
      total,
    }
  }

  async tagSitemap(type?: string) {
    const where = type ? eq(poemTag.type, type) : undefined
    return this.drizzle.db
      .select({ id: poemTag.id, updatedAt: poemTag.updatedAt })
      .from(poemTag)
      .where(where)
  }

  async countTags() {
    const [allRow, cipaiRow] = await Promise.all([
      this.drizzle.db.select({ value: count() }).from(poemTag),
      this.drizzle.db
        .select({ value: count() })
        .from(poemTag)
        .where(eq(poemTag.type, '词牌名')),
    ])
    return [Number(allRow[0]?.value ?? 0), Number(cipaiRow[0]?.value ?? 0)]
  }

  async findTagById(id: number) {
    const [row] = await this.drizzle.db
      .select()
      .from(poemTag)
      .where(eq(poemTag.id, id))
      .limit(1)
    if (!row) return null

    const ids = await this.listPoemIdsByTagId(id)
    const poems = ids.length
      ? await this.drizzle.db
          .select()
          .from(poem)
          .where(inArray(poem.id, ids))
      : []

    return { ...row, poems }
  }

  /** 标签下的诗词（含作者）以及标签自身 */
  async findTagStatisticsById(id: number) {
    const [tag] = await this.drizzle.db
      .select()
      .from(poemTag)
      .where(eq(poemTag.id, id))
      .limit(1)

    if (!tag) return null

    const ids = await this.listPoemIdsByTagId(id)

    const rows = ids.length
      ? await this.drizzle.db
          .select({ poem: poem, author: poemAuthor })
          .from(poem)
          .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
          .where(inArray(poem.id, ids))
      : []

    return { data: rows, tag, total: ids.length }
  }

  /** 将诗词关联到标签 */
  async connectPoemsToTag(input: { tagId: number; ids: number[] }) {
    if (input.ids.length) {
      await this.drizzle.db
        .insert(poemToPoemTag)
        .values(input.ids.map((id) => ({ a: id, b: input.tagId })))
        .onConflictDoNothing()
    }

    const [row] = await this.drizzle.db
      .select()
      .from(poemTag)
      .where(eq(poemTag.id, input.tagId))
      .limit(1)
    return row ?? null
  }

  async deleteTagById(id: number) {
    await this.drizzle.db.delete(poemToPoemTag).where(eq(poemToPoemTag.b, id))
    const [row] = await this.drizzle.db
      .delete(poemTag)
      .where(eq(poemTag.id, id))
      .returning()
    return row ?? null
  }

  async createTag(input: {
    id?: number
    name: string
    nameZhHant?: string
    type?: string
    typeZhHant?: string
    introduce?: string
    introduceZhHant?: string
  }) {
    if (input.id) {
      const [row] = await this.drizzle.db
        .update(poemTag)
        .set({
          name: input.name,
          nameZhHant: input.nameZhHant ?? null,
          type: input.type ?? null,
          typeZhHant: input.typeZhHant ?? null,
          introduce: input.introduce ?? null,
          introduceZhHant: input.introduceZhHant ?? null,
        })
        .where(eq(poemTag.id, input.id))
        .returning()
      return row ?? null
    }

    const [row] = await this.drizzle.db
      .insert(poemTag)
      .values({
        name: input.name,
        nameZhHant: input.nameZhHant ?? null,
        type: input.type ?? null,
        typeZhHant: input.typeZhHant ?? null,
        introduce: input.introduce ?? null,
        introduceZhHant: input.introduceZhHant ?? null,
      })
      .returning()
    return row ?? null
  }

  // ------------------------------------------------------------ poem_card

  /** 查询还需要生成卡片图片的诗词 */
  async findPoemsNeedCard(input: { page?: number; tagName?: string }) {
    const page = input.page ?? 1
    const tagName = input.tagName ?? '七言律诗'

    const [tag] = await this.drizzle.db
      .select({ id: poemTag.id })
      .from(poemTag)
      .where(eq(poemTag.name, tagName))
      .limit(1)

    const ids = tag ? await this.listPoemIdsByTagId(tag.id) : []
    const cardPoemIds = await this.listPoemIdsWithCards()

    // 标签下有诗词，且尚未生成过卡片
    const pendingIds = ids.filter((id) => !cardPoemIds.includes(id))
    const total = pendingIds.length

    const rows = pendingIds.length
      ? await this.drizzle.db
          .select({
            id: poem.id,
            title: poem.title,
            content: poem.content,
            author: poemAuthor,
          })
          .from(poem)
          .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
          .where(inArray(poem.id, pendingIds))
          .orderBy(asc(poem.id))
          .limit(30)
          .offset((page - 1) * 30)
      : []

    return { data: rows, total, pageCount: Math.ceil(total / 30) }
  }

  async listPoemIdsWithCards() {
    const rows = await this.drizzle.db
      .selectDistinct({ id: poemCard.poemId })
      .from(poemCard)
    return rows.map((row) => row.id)
  }

  async createCardItem(input: { poemId: number; content: string; url: string }) {
    const [row] = await this.drizzle.db
      .insert(poemCard)
      .values({ poemId: input.poemId, url: input.url, content: input.content })
      .returning()
    return row ?? null
  }

  async findCards(input: { page?: number; pageSize?: number }) {
    const page = input.page ?? 1
    const pageSize = input.pageSize ?? 28

    const [totalRow, data] = await Promise.all([
      this.drizzle.db.select({ value: count() }).from(poemCard),
      this.drizzle.db
        .select()
        .from(poemCard)
        .orderBy(desc(poemCard.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
    ])

    const total = Number(totalRow[0]?.value ?? 0)
    return { data, hasNext: page * pageSize < total, total, page, pageSize }
  }

  async randomCards() {
    const total = await this.countCards()
    if (total === 0) return []

    const skip = Math.floor(Math.random() * total)

    return this.drizzle.db
      .select({
        id: poemCard.id,
        content: poemCard.content,
        url: poemCard.url,
        poemId: poemCard.poemId,
        title: poem.title,
      })
      .from(poemCard)
      .leftJoin(poem, eq(poemCard.poemId, poem.id))
      .orderBy(desc(poemCard.id))
      .limit(30)
      .offset(skip)
  }

  async countCards() {
    const [row] = await this.drizzle.db
      .select({ value: count() })
      .from(poemCard)
    return Number(row?.value ?? 0)
  }

  /** 按片段查找诗词，用于按额度（quota）批量生成卡片。 */
  async findCardQuotaPoems(quotas: string[]) {
    if (!quotas.length) {
      throw new Error('quotas is empty')
    }

    const results = await Promise.all(
      quotas.map((item) =>
        this.drizzle.db
          .select({
            id: poem.id,
            title: poem.title,
            content: poem.content,
            author: poemAuthor,
          })
          .from(poem)
          .leftJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
          .where(ilike(poem.content, `%${item}%`))
          .limit(1),
      ),
    )

    const exists = await Promise.all(
      quotas.map((item) =>
        this.drizzle.db
          .select({ id: poemCard.id })
          .from(poemCard)
          .where(ilike(poemCard.content, `%${item}%`))
          .limit(1),
      ),
    )

    return results
      .map((rows, index) => {
        const item = rows[0]
        if (!item) return null
        return { ...item, content: quotas[index]! }
      })
      .filter((item, index) => {
        if (!item) return false
        if (exists[index]?.length) return false
        return true
      })
      .slice(0, 30)
  }

  /**
   * 诗词列表（含 keywords），迁移自 apps/lab 的 SearchPoemsQuery。
   * @todo 多对多关联后续可用 raw query 优化，避免 n+1。
   */
  async searchPoemsWithKeywords(params: { limit?: number; offset?: number }) {
    const { limit, offset } = params ?? {}

    const base = this.drizzle.db
      .select({
        poem: poem,
        keywords: sql<Array<{ keyword: { name: string } }>>`
          coalesce(
            (
              select json_agg(json_build_object('name', k.name))
              from ${poemKeywords} pk
              inner join ${keyword} k on k.id = pk.keyword_id
              where pk.poem_id = ${poem.id}
            ),
            '[]'::json
          )`,
      })
      .from(poem)
      .innerJoin(poemAuthor, eq(poem.authorId, poemAuthor.id))
      .orderBy(desc(poemAuthor.name))

    const query =
      limit !== undefined && offset !== undefined
        ? base.limit(limit).offset(offset)
        : limit !== undefined
          ? base.limit(limit)
          : offset !== undefined
            ? base.offset(offset)
            : base

    const rows = await query

    return rows.map((row) => {
      const { createdAt, updatedAt, ...rest } = row.poem
      return {
        ...rest,
        keywords: row.keywords.map((item) => item.keyword.name),
      }
    })
  }
}
