import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function GET() {
  const session = await getSession();

  const message = session?.user?.name ?? "Hello from the API";

  return NextResponse.json({ message, session }, { status: 200 });
}
