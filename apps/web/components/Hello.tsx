import React from 'react';
import { trpc } from '../lib/trpc';

const Hello: React.FC = () => {
  const req = trpc.helloWorld.useQuery();

  if (req.isError) {
    return <>Error</>;
  }

  if (req.isLoading) {
    return <>Loading</>;
  }

  return <>{req.data}</>;
};

export default Hello;
