import * as z from "zod"
import { CompleteCreditTransaction, RelatedCreditTransactionModelSchema } from "./index"

export const StripeTransactionModelSchema = z.object({
  sessionId: z.string(),
  transactionId: z.string(),
})

export interface CompleteStripeTransaction extends z.infer<typeof StripeTransactionModelSchema> {
  CreditTransaction: CompleteCreditTransaction
}

/**
 * RelatedStripeTransactionModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStripeTransactionModelSchema: z.ZodSchema<CompleteStripeTransaction> = z.lazy(() => StripeTransactionModelSchema.extend({
  CreditTransaction: RelatedCreditTransactionModelSchema,
}))
