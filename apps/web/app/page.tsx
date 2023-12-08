'use client';
import styles from './page.module.css';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '../lib/trpc';
import { httpBatchLink } from '@trpc/client';
import Hello from '../components/Hello';
import { Button } from '@ui/components/button';

export default function Page(): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3003/trpc',
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <main className={styles.main}>
          <Hello />
          <Button>Workssss</Button>
        </main>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
