import React from 'react';

import { trpc } from '../lib/trpc';

const Hello: React.FC = () => {
  const req = trpc.helloWorld.useQuery();
  const {refetch} = req

  if (req.isError) {
    return <>Error</>;
  }

  if (req.isLoading) {
    return <>Loading</>;
  }

  return <div>
    {req.data}
      <h4>
        <button onClick={() => {
          refetch()
        }}>Invalidate</button>
      </h4>
    </div>;
};

export default Hello;
