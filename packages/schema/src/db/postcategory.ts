import * as z from "zod"

export const PostCategoryModelSchema = z.object({
  id: z.string(),
  postId: z.string(),
  categoryId: z.string(),
  createdAt: z.date().nullish(),
})
