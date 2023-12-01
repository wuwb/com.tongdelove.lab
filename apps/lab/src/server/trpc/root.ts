import { createTRPCRouter, publicProcedure } from "./index";
import { z } from 'zod';
import { exampleRouter } from "./routers/example";
import { authRouter } from "./routers/auth";
import { postRouter } from "./routers/post";

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
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  auth: authRouter,
  post: postRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
