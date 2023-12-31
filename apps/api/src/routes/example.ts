import { z } from 'zod';

import { observable } from '@trpc/server/observable';

import { publicProcedure, router } from './trpc.js';

const testSchema = z.object({
  id: z.string(),
});

let num = 0;

export const exampleRouter = router({
  example: publicProcedure.input(testSchema).query(({ ctx, input }) => {
    return {
      id: input.id,
      user: ctx.auth,
    };
  }),

  randomNumber: publicProcedure.subscription(({ ctx }) => {
    return observable<{ randomNumber: number; auth: string }>((emit) => {
      const timer = setInterval(() => {
        num++;
        console.log("num: ", num);
        emit.next({ randomNumber: num, auth: ctx.auth });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    });
  }),

  currentTime: publicProcedure.subscription(() => {
    return observable<{ currentTime: number }>((emit) => {
      const timer = setInterval(() => {
        emit.next({ currentTime: Date.now() });
      }, 100);

      return () => {
        clearInterval(timer);
      };
    });
  }),
});
