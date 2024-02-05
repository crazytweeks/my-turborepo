import React, { cache, FC, PropsWithChildren } from "react";
import { headers } from "next/headers";
import { getSession } from "@auth0/nextjs-auth0";

import TrpcWrapper from "./trpcWrapper";

// Lazy load headers
const getHeaders = cache(() => Promise.resolve(headers()));

const AuthedTrpcWrapper: FC<PropsWithChildren> = async ({ children }) => {
  const session = await getSession().catch(() => {
    return null;
  });

  const accessToken = session?.accessToken;

  return (
    <>
      {accessToken ? (
        <TrpcWrapper headersPromise={getHeaders()} accessToken={accessToken}>
          {children}
        </TrpcWrapper>
      ) : (
        <div>Not logged in</div>
      )}
    </>
  );
};

export default AuthedTrpcWrapper;
