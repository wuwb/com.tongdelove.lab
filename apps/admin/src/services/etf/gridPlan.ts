import { BaseService } from '@/services/base'
import type { State } from '@/pages/Etf/common/store'

const gridPlanService = new BaseService('etf/grid-plan')

export type GridPlanItem = {
  id: string
  name: string
  fundName: string | null
  fundCode: string | null
  config: State
  createdAt: string
  updatedAt: string
}

export type GridPlanListResult = {
  data: GridPlanItem[]
  count: number
}

export type SaveGridPlanParams = {
  name: string
  fundName?: string
  fundCode?: string
  config: State
}

// 后端返回的数据带有多层包装：{ code, data: { code, data: 业务数据 } }
// 需要逐层剥离，避免调用方拿到包装对象而非业务数据
function unwrap<T>(res: any): T | undefined {
  let payload = res
  while (
    payload &&
    typeof payload === 'object' &&
    'code' in payload &&
    'data' in payload
  ) {
    payload = payload.data
  }
  return payload as T | undefined
}

export function createGridPlan(params: SaveGridPlanParams) {
  return gridPlanService.create(params).then((res) => unwrap<GridPlanItem>(res))
}

export async function listGridPlan(params?: {
  page?: number
  pageSize?: number
}): Promise<GridPlanListResult> {
  const payload = unwrap<Partial<GridPlanListResult>>(
    await gridPlanService.list(params),
  )
  return {
    data: Array.isArray(payload?.data) ? payload.data : [],
    count: Number(payload?.count) || 0,
  }
}

export function getGridPlan(params: { id: string }) {
  return gridPlanService.get(params).then((res) => unwrap<GridPlanItem>(res))
}

export function removeGridPlan(params: { id: string }) {
  return gridPlanService.remove(params)
}
