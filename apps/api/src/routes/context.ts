// Reference required for compilation
import type fastify from "fastify";
import { inferAsyncReturnType } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContextInner() {
  return {};
}

const getParamValueFromUrl = (url: string, param: string) =>
  new Promise<string>((resolve, reject) => {
    const urlParams = new URLSearchParams(url);
    const value = urlParams.get(`/trpc?${param}`) ?? urlParams.get(param);

    if (!value) {
      return reject(`No ${param} provided`);
    }
    return resolve(value);
  });

// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const server = req.server;
  const auth =
    req.headers.authorization ??
    (await getParamValueFromUrl(req.url, "AUTH_TOKEN"));

  // if (!auth) {
  //   throw new TRPCError({
  //     code: "UNAUTHORIZED",
  //     message: "No authorization token provided",
  //   });
  // }
  const decodedUrl = decodeURIComponent(auth ?? "");
  return {
    fastify: server,
    auth: decodedUrl,
    req,
    res,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
export type InnerContext = inferAsyncReturnType<typeof createContextInner>;
