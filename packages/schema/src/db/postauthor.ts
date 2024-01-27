import * as z from "zod"

export const PostAuthorModelSchema = z.object({
  id: z.string(),
  name: z.string(),
})
