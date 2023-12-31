import { z } from 'zod';

import { publicProcedure, router } from './trpc.js';

const saveUserHashInput = z.object({
  hash: z.string(),
  userEmail: z.string()
});

export const serverRouter = router({
  saveUserHash: publicProcedure.input(saveUserHashInput)
    .output(z.boolean())
    .query((input) => {
      console.log("input: ", input);
      return true;
    })
});
