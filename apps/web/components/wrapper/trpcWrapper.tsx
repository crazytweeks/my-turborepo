"use client";

import { FC, PropsWithChildren, useState } from "react";
import Box from "@mui/material/Box";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import SuperJSON from "superjson";

import trpc from "../../lib/trpc";

const BACKEND_URL = process.env.BACKEND_URL ?? null;

const port = 5000;
const prefix = "/trpc";
const urlEnd = BACKEND_URL ?? `localhost:${port}${prefix}`;

const TrpcWrapper: FC<
  PropsWithChildren<{ headersPromise: Promise<Headers>; accessToken: string }>
> = ({ children, headersPromise, accessToken }) => {
  const [url] = useState(`${urlEnd}?AUTH_TOKEN=${accessToken}`);

  const [queryClient] = useState(() => new QueryClient());
  const [wsClient] = useState(() =>
    createWSClient({
      url: `ws://${url}`,
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
            url: `${
              urlEnd.startsWith("http")
                ? urlEnd
                : urlEnd.startsWith("https")
                  ? urlEnd
                  : `http://${urlEnd}`
            }`,
            async headers() {
              try {
                const headers = new Map(await headersPromise);
                headers.set("x-trpc-source", "nextjs-react");

                return {
                  authorization: accessToken,
                  ...Object.fromEntries(headers),
                };
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
    <>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />

          {children}
        </QueryClientProvider>
      </trpc.Provider>
    </>
  );
};

export default TrpcWrapper;
