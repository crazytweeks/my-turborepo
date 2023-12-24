"use client";

import { useState } from "react";

import trpc from "../lib/trpc";

const Sub = () => {
  const [random, setRandom] = useState(0);
  const [a, setA] = useState<string | null>(null);

  const [time, setTime] = useState<number>(0);

  trpc.example.randomNumber.useSubscription(undefined, {
    enabled: true,
    onData(data) {
      setRandom(data.randomNumber);
      setA(data.auth);
    },
  });

  trpc.example.currentTime.useSubscription(undefined, {
    enabled: true,
    onData(data) {
      setTime(data.currentTime);
    },
  });
  return (
    <div>
      Sub {random} : {a}
      <br />
      <div>{new Date(time).toLocaleString()}</div>
    </div>
  );
};

export default Sub;
