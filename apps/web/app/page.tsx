"use client";
import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';

import Hello from '../components/Hello';
import trpc from '../lib/trpc';
import styles from './page.module.css';

export default function Page(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3003/trpc",
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <main className={styles.main}>
          <Hello />
          <button>Workssss</button>
        </main>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
