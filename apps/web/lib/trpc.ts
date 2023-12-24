import type { AppRouter } from "@repo/api/types";
import { createTRPCReact } from "@trpc/react-query";

// Define the type of the TRPC client
type TRPCClient = ReturnType<typeof createTRPCReact<AppRouter>>;

// Create the TRPC client
const trpc: TRPCClient = createTRPCReact<AppRouter>();

export default trpc;
export { trpc };
