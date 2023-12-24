import { createContextInner } from "../routes/context.js";
import { testRouter } from "../routes/index.js";

export const createTestCaller = async () => {
  const ctx = await createContextInner();
  return testRouter.createCaller(ctx);
};
