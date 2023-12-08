import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  console.log(' Validate token');
  const token = req.headers.authorization;

  // if (!token) {
  //   throw new TRPCError({
  //     code: 'UNAUTHORIZED',
  //     message: 'You are not authorized',
  //   });
  // }

  return {
    token: token,
  };
};

type Context = inferAsyncReturnType<typeof createContext>;
export const trpc = initTRPC.context<Context>().create();
