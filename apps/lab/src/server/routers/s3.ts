import {
  deleteFileFromBucket,
  generatePresignedUrlUserImage,
  listFilesInBucket,
  putFileToBucket,
} from '@/server/api/s3'
import { z } from 'zod'
import { protectedProcedure, router, publicProcedure } from '@/server/trpc/trpc'

export const s3Router = router({
  getPresignedUrl: publicProcedure
    .input(
      z.object({
        key: z.string(),
        contentType: z.string(),
        bucket: z.string(),
      })
    )
    .mutation(({ input }) => {
      return generatePresignedUrlUserImage(
        input.key,
        input.contentType,
        input.bucket
      )
    }),
  listFilesInBucket: protectedProcedure
    .input(
      z.object({
        bucket: z.string(),
        prefix: z.string().optional(),
      })
    )
    .query(({ input }) => {
      return listFilesInBucket(input.bucket, input.prefix)
    }),
  putFileToBucket: protectedProcedure
    .input(
      z.object({
        bucket: z.string(),
        key: z.string(),
        body: z.any().optional(),
        contentType: z.string().optional(),
        contentLanguage: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      return putFileToBucket(
        input.bucket,
        input.key,
        input.body,
        input.contentType,
        input.contentLanguage
      )
    }),
  putFilesToBucket: protectedProcedure
    .input(
      z.object({
        bucket: z.string(),
        files: z.array(
          z.object({
            key: z.string(),
            body: z.any().optional(),
            contentType: z.string().optional(),
          })
        ),
      })
    )
    .mutation(({ input }) => {
      return Promise.all(
        input.files.map((file) =>
          putFileToBucket(input.bucket, file.key, file.body, file.contentType)
        )
      )
    }),
  deleteFileFromBucket: protectedProcedure
    .input(
      z.object({
        bucket: z.string(),
        key: z.string(),
      })
    )
    .mutation(({ input }) => {
      return deleteFileFromBucket(input.bucket, input.key)
    }),
  createFolder: protectedProcedure
    .input(
      z.object({
        bucket: z.string(),
        folder: z.string(),
      })
    )
    .mutation(({ input }) => {
      return putFileToBucket(input.bucket, input.folder)
    }),
})
