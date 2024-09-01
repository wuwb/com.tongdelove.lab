import * as z from "zod"
import { UserLanguageCode, UserPermissionRole } from "@prisma/client"
import { CompleteAccount, RelatedAccountModelSchema, CompleteSession, RelatedSessionModelSchema, CompleteAuthenticator, RelatedAuthenticatorModelSchema, CompleteRole, RelatedRoleModelSchema, CompleteLink, RelatedLinkModelSchema, CompleteDept, RelatedDeptModelSchema, CompletePost, RelatedPostModelSchema, CompleteOrder, RelatedOrderModelSchema, CompletePayMehod, RelatedPayMehodModelSchema, CompleteTelephone, RelatedTelephoneModelSchema, CompleteCart, RelatedCartModelSchema, CompleteBook, RelatedBookModelSchema, CompleteBookChapter, RelatedBookChapterModelSchema, CompleteBookStar, RelatedBookStarModelSchema, CompleteHandBook, RelatedHandBookModelSchema, CompleteHandBookChapter, RelatedHandBookChapterModelSchema, CompleteArticle, RelatedArticleModelSchema, CompleteComment, RelatedCommentModelSchema, CompleteCreditTransaction, RelatedCreditTransactionModelSchema } from "./index"

export const UserModelSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  about: z.string().nullish(),
  interests: z.string().nullish(),
  isPublic: z.boolean(),
  tagline: z.string().nullish(),
  location: z.string().nullish(),
  subscription: z.string().nullish(),
  credit: z.number(),
  subscriptionStart: z.date().nullish(),
  stripeCustomerId: z.string().nullish(),
  language: z.nativeEnum(UserLanguageCode).nullish(),
  username: z.string().nullish(),
  gender: z.number().int(),
  birthday: z.date().nullish(),
  last_login_time: z.date().nullish(),
  last_login_ip: z.string(),
  level: z.number().int(),
  login: z.string().nullish(),
  pass: z.string().nullish(),
  password: z.string().nullish(),
  nicename: z.string().nullish(),
  url: z.string().nullish(),
  activationKey: z.string().nullish(),
  status: z.number().int().nullish(),
  displayName: z.string().nullish(),
  resetKey: z.string().nullish(),
  phone: z.string().nullish(),
  spam: z.number().int().nullish(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  age: z.number().int().nullish(),
  platform: z.number().int().nullish(),
  isSuper: z.number().int().nullish(),
  avatar: z.string().nullish(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
  role: z.nativeEnum(UserPermissionRole),
  deptId: z.string().nullish(),
  weixin_openid: z.string(),
  session_key: z.string(),
  subscriptionId: z.string().nullish(),
  customerId: z.string().nullish(),
  variantId: z.number().int().nullish(),
  currentPeriodEnd: z.number().int().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModelSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  Authenticator: CompleteAuthenticator[]
  roles: CompleteRole[]
  link: CompleteLink[]
  dept?: CompleteDept | null
  post: CompletePost[]
  order: CompleteOrder[]
  payMehod: CompletePayMehod[]
  telephone?: CompleteTelephone | null
  cart: CompleteCart[]
  book: CompleteBook[]
  bookChapter: CompleteBookChapter[]
  bookStar: CompleteBookStar[]
  handbook: CompleteHandBook[]
  handbookChapter: CompleteHandBookChapter[]
  article: CompleteArticle[]
  comment: CompleteComment[]
  CreditTransaction: CompleteCreditTransaction[]
}

/**
 * RelatedUserModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModelSchema: z.ZodSchema<CompleteUser> = z.lazy(() => UserModelSchema.extend({
  accounts: RelatedAccountModelSchema.array(),
  sessions: RelatedSessionModelSchema.array(),
  Authenticator: RelatedAuthenticatorModelSchema.array(),
  roles: RelatedRoleModelSchema.array(),
  link: RelatedLinkModelSchema.array(),
  dept: RelatedDeptModelSchema.nullish(),
  post: RelatedPostModelSchema.array(),
  order: RelatedOrderModelSchema.array(),
  payMehod: RelatedPayMehodModelSchema.array(),
  telephone: RelatedTelephoneModelSchema.nullish(),
  cart: RelatedCartModelSchema.array(),
  book: RelatedBookModelSchema.array(),
  bookChapter: RelatedBookChapterModelSchema.array(),
  bookStar: RelatedBookStarModelSchema.array(),
  handbook: RelatedHandBookModelSchema.array(),
  handbookChapter: RelatedHandBookChapterModelSchema.array(),
  article: RelatedArticleModelSchema.array(),
  comment: RelatedCommentModelSchema.array(),
  CreditTransaction: RelatedCreditTransactionModelSchema.array(),
}))
