import React, { FC } from "react";

import { trpc } from "../lib/trpc";
import Sub from "./Sub";

const Hello: FC = () => {
  const { refetch, isError, isLoading, data, error } =
    trpc.example.example.useQuery({
      id: "hello",
    });

  if (isError) {
    return (
      <div>
        <h4>
          <div>Error: {error.message}</div>
          <button
            onClick={() => {
              refetch();
            }}
          >
            Retry
          </button>
        </h4>
      </div>
    );
  }

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <div>
      <h4>
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>

        <Sub />
        <button
          onClick={() => {
            refetch();
          }}
        >
          Invalidate
        </button>
      </h4>
    </div>
  );
};

export default Hello;
