import * as z from "zod"
import { TransactionType, TransactionStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModelSchema, CompleteStripeTransaction, RelatedStripeTransactionModelSchema } from "./index"

export const CreditTransactionModelSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  userId: z.string(),
  amount: z.number(),
  type: z.nativeEnum(TransactionType),
  status: z.nativeEnum(TransactionStatus),
})

export interface CompleteCreditTransaction extends z.infer<typeof CreditTransactionModelSchema> {
  User: CompleteUser
  StripeTransaction: CompleteStripeTransaction[]
}

/**
 * RelatedCreditTransactionModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCreditTransactionModelSchema: z.ZodSchema<CompleteCreditTransaction> = z.lazy(() => CreditTransactionModelSchema.extend({
  User: RelatedUserModelSchema,
  StripeTransaction: RelatedStripeTransactionModelSchema.array(),
}))
