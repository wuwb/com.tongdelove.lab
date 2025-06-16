import * as z from "zod"

export const OpensourceProjectModelSchema = z.object({
  id: z.string(),
  cid: z.string(),
  fid: z.string(),
  name: z.string(),
  description: z.string(),
  githubUrl: z.string(),
  githubStars: z.number().int(),
  opensourceLicense: z.number().int(),
  link: z.string(),
  lastUpdate: z.date(),
  version: z.string(),
  opensourceLicenseId: z.string(),
})
