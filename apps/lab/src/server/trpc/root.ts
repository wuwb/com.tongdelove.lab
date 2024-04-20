import { createTRPCRouter, publicProcedure, createCallerFactory } from "./index";
import { z } from 'zod';
import { exampleRouter } from "@/server/routers/example";
import { authRouter } from "@/server/routers/auth";
import { postRouter } from "@/server/routers/post";
import { linkRouter } from "@/server/routers/link";

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
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
