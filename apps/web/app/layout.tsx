import type { Metadata } from "next";

import "../components/global.css";

import { Suspense } from "react";
import { Inter } from "next/font/google";

import FullPageLoader from "../components/components/FullpageLoader";
import AuthedTrpcWrapper from "../components/wrapper/authedTrpcWrapper";
import UserWrapper from "../components/wrapper/userWrapper";
import WpLayout from "../components/wrapper/wpWrapper";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<FullPageLoader />}>
          <UserWrapper>
            <WpLayout>
              <AuthedTrpcWrapper>{children}</AuthedTrpcWrapper>
            </WpLayout>
          </UserWrapper>
        </Suspense>
      </body>
    </html>
  );
}
