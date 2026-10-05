import type { UnPromisify } from '@tongdelove/utils'
import type { SearchPoemsParams } from './SearchPoems.types'
import { labPoemApi } from '@/server/backend/lab-poem.api'

type SearchPoems = UnPromisify<ReturnType<SearchPoemsQuery['searchPoems']>>

/**
 * 诗词查询（迁移自 apps/lab）。
 *
 * 数据访问已改为调用 services/server，lab 不再直连数据库；
 * keywords 的聚合下推由服务端完成，避免 n+1。
 */
export class SearchPoemsQuery {
  execute = async (params: SearchPoemsParams) => {
    return this.searchPoems(params)
  }

  /**
   * @todo 多对多关联后续可在服务端用 raw query 进一步优化。
   */
  private searchPoems = async (params: SearchPoemsParams) => {
    const { limit, offset } = params ?? {}

    return labPoemApi.searchWithKeywords({ limit, offset })
  }
}
