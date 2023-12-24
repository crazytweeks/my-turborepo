"use client";
import { FC, PropsWithChildren, useState } from "react";
import SuperJSON from "superjson";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";

import trpc from "../lib/trpc";

const port = 5000;
const prefix = "/trpc";
const urlEnd = `localhost:${port}${prefix}`;

const token: string | null = "12345";

const getToken = async () => {
  return new Promise<string>((resolve, reject) => {
    if (!token) {
      return reject("No token");
    }

    setTimeout(() => {
      resolve(token);
    }, 100);
  });
};

const TrpcWrapper: FC<
  PropsWithChildren<{ headersPromise: Promise<Headers> }>
> = ({ children, headersPromise }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [wsClient] = useState(() =>
    createWSClient({
      url: `ws://${urlEnd}?AUTH_TOKEN=${token}`,
    }),
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        splitLink({
          condition(op) {
            return op.type === "subscription";
          },
          true: wsLink({ client: wsClient }),
          false: httpBatchLink({
            url: `http://${urlEnd}`,
            async headers() {
              try {
                const jwt = await getToken();

                const headers = new Map(await headersPromise);
                headers.set("x-trpc-source", "nextjs-react");

                return { authorization: jwt, ...Object.fromEntries(headers) };
              } catch (error) {
                console.error("Error creating auth header", error);
                return {};
              }
            },
          }),
        }),
      ],
      transformer: SuperJSON,
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default TrpcWrapper;
