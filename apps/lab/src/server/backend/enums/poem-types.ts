/**
 * 诗词相关的接口类型。
 *
 * 原先这些类型由 @prisma/client 生成（依赖数据库 schema 生成结果）。
 * lab 不再直连数据库后，改为按 services/server 的 HTTP 接口返回结构在前端声明。
 */

export interface PoemAuthor {
  [key: string]: unknown
  id: number
  name: string
  nameZhHant?: string | null
  namePinYin?: string | null
  introduce?: string | null
  birthDate?: number | null
  deathDate?: number | null
  dynasty?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export interface PoemTag {
  [key: string]: unknown
  id: number
  name: string
  nameZhHant?: string | null
  type?: string | null
  typeZhHant?: string | null
  introduce?: string | null
  introduceZhHant?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export interface Poem {
  [key: string]: unknown
  id: number
  slug: string
  title: string
  content: string
  locale?: string | null
  link?: string | null
  image?: string | null
  createdAt: string
  updatedAt: string
  annotation?: string | null
  annotationZhHant?: string | null
  authorId: number
  classify?: string | null
  conetntPinYin?: string | null
  contentZhHant?: string | null
  genre?: string | null
  introduce?: string | null
  introduceZhHant?: string | null
  titlePinYin?: string | null
  titleZhHant?: string | null
  translation?: string | null
  translationEn?: string | null
  translationZhHant?: string | null
  views: number
}

export interface User {
  id: string
  email: string
  name?: string | null
  username?: string | null
  image?: string | null
  about?: string | null
  interests?: string | null
  tagline?: string | null
  language?: string | null
  location?: string | null
  createdAt?: string | null
  isPublic: boolean
  role: string
}
