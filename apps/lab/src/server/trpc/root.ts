import { createTRPCRouter, publicProcedure, createCallerFactory } from './trpc'
import { z } from 'zod'
import { exampleRouter } from '../routers/example'
import { authRouter } from '../routers/auth'
import { postRouter } from '../routers/post'
import { linkRouter } from '../routers/link'
import { poemRouter } from '../routers/poem'
import { poemAuthorRouter } from '../routers/poemAuthor'
import { poemCardRouter } from '../routers/poemCard'
import { poemTagRouter } from '../routers/poemTag'
import { appleGuideRouter } from '../routers/appleGuide'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(opts => {
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
  auth: authRouter,
  post: postRouter,
  example: exampleRouter,
  link: linkRouter,

  // 诗词
  poem: poemRouter,
  poemAuthor: poemAuthorRouter,
  poemCard: poemCardRouter,
  poemTag: poemTagRouter,
  appleGuide: appleGuideRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
