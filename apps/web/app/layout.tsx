import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { cache } from "react";

import TrpcWrapper from "../components/trpcWrapper";

import type { Metadata } from "next";
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
        <nav>
          <div>
            <a href="/">Home</a>
          </div>
        </nav>
        <TrpcWrapper headersPromise={getHeaders()}>{children}</TrpcWrapper>
      </body>
    </html>
  );
}
