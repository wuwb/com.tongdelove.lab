/**
 * AppleGuide 数据结构。
 * 原先这些类型定义在 pages/_app.tsx 旁的 @/client 私有模块中，
 * 该模块在 pages -> App Router 迁移时未保留，这里按组件实际用到的字段就地重建。
 * 数据来源为 trpc.appleGuide.getAll -> JSON.parse(item.data)。
 */

export enum GuideConclusion {
  BUY_NOW = 'Buy Now',
  CAUTION = 'Caution',
  DONT_BUY = "Don't Buy",
  NEUTRAL = 'Neutral',
}

export type ProductType = {
  name: string
  advice: {
    conclusion: GuideConclusion
    note: string
  }
  lastRelease: string
  daysSinceLastRelease: number
  average: number
  recentReleases: Array<{
    date: string
    daysSince: number
  }>
}

export type DataType = {
  name: string
  contentClass: string
  products: ProductType[]
}
