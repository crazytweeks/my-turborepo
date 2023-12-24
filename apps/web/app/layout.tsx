import type { Metadata } from "next";
import { cache } from "react";
import { Inter } from "next/font/google";
import { headers } from "next/headers";

import TrpcWrapper from "../components/trpcWrapper";
import UserWrapper from "../components/userWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Create T3 Turbo",
  description: "Simple monorepo with shared backend for web & mobile apps",
  openGraph: {
    title: "Create T3 Turbo",
    description: "Simple monorepo with shared backend for web & mobile apps",
    url: "https://create-t3-turbo.vercel.app",
    siteName: "Create T3 Turbo",
  },
};

// Lazy load headers
const getHeaders = cache(() => Promise.resolve(headers()));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserWrapper>
          <TrpcWrapper headersPromise={getHeaders()}>{children}</TrpcWrapper>
        </UserWrapper>
      </body>
    </html>
  );
}
