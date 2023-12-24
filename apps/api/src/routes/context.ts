import { inferAsyncReturnType, TRPCError } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

// Reference required for compilation
import type fastify from "fastify";

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContextInner() {
  return {};
}

function getParamValueFromUrl(url: string, param: string) {
  const urlParams = new URLSearchParams(url.split("?")[1]);
  const v = urlParams.get(param);
  return v;
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const server = req.server;
  const auth =
    req.headers.authorization ?? getParamValueFromUrl(req.url, "AUTH_TOKEN");

  if (!auth) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred, please try again later.",
      cause: new Error("No auth token provided"),
    });
  }

  return {
    fastify: server,
    auth,
    req,
    res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
export type InnerContext = inferAsyncReturnType<typeof createContextInner>;
