import { publicProcedure, router } from "./trpc.js";

export const healthRouter = router({
  health: publicProcedure.query(({ ctx }) => {
    return {
      health: "ok",
    };
  }),
});
