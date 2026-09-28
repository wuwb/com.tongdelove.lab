import { type InferSelectModel } from 'drizzle-orm'
import * as schema from './schema'

/**
 * drizzle 推导的行类型，用于替代原先从 @prisma/client 导入的模型类型。
 * 用法与原先的 `User` / `FreelancerTask` 等一致，但字段以 drizzle schema 为准
 * （注意：Prisma 经 @map 的字段在 drizzle 中可能不同名，如 login -> userLogin）。
 */
export type User = InferSelectModel<typeof schema.users>
export type Account = InferSelectModel<typeof schema.accounts>
export type FreelancerTask = InferSelectModel<typeof schema.freelancerTask>
export type TemuRequest = InferSelectModel<typeof schema.temuRequests>
export type DataCleaningQueue = InferSelectModel<
  typeof schema.dataCleaningQueue
>
export type Post = InferSelectModel<typeof schema.post>
export type Category = InferSelectModel<typeof schema.category>
export type Product = InferSelectModel<typeof schema.product>
export type Order = InferSelectModel<typeof schema.order>
export type Customer = InferSelectModel<typeof schema.customer>
export type Company = InferSelectModel<typeof schema.company>
export type Topic = InferSelectModel<typeof schema.topic>
export type Link = InferSelectModel<typeof schema.link>
export type Page = InferSelectModel<typeof schema.page>
export type Analyze = InferSelectModel<typeof schema.analyze>
export type TaobaoOrderRaw = InferSelectModel<typeof schema.taobaoOrderRaw>
export type LoginLog = InferSelectModel<typeof schema.loginLog>

/**
 * 抓取来源枚举。
 * 原先来自 @prisma/client 的 Prisma enum；这里用常量对象替代，
 * 既可作为值使用（SourceEnum['codemart']），也可作为类型使用。
 */
export const SourceEnum = {
  YUANJISONG: 'yuanjisong',
  OSCHINA: 'oschina',
  CODEMART: 'codemart',
  A5: 'a5',
  TASKCITY: 'taskcity',
  SHIXIAN: 'shixian',
  MAYIGEEK: 'mayigeek',
  RRKF: 'rrkf',
} as const

export type SourceEnumValue = (typeof SourceEnum)[keyof typeof SourceEnum]
