import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from "@repo/server";

// Define the type of the TRPC client
type TRPCClient = ReturnType<typeof createTRPCReact<AppRouter>>;

// Create the TRPC client
const trpc: TRPCClient = createTRPCReact<AppRouter>();

export default trpc;
export { trpc }