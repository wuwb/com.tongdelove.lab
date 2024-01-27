import * as z from "zod"
import { BookStarStatus } from "@prisma/client"
import { CompleteUser, RelatedUserModelSchema } from "./index"

export const BookStarModelSchema = z.object({
  id: z.string(),
  htmlContent: z.string(),
  status: z.nativeEnum(BookStarStatus),
  star: z.number().int(),
  bookId: z.string(),
  userId: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date(),
  isDeleted: z.boolean(),
})

export interface CompleteBookStar extends z.infer<typeof BookStarModelSchema> {
  user: CompleteUser
}

/**
 * RelatedBookStarModelSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBookStarModelSchema: z.ZodSchema<CompleteBookStar> = z.lazy(() => BookStarModelSchema.extend({
  user: RelatedUserModelSchema,
}))
