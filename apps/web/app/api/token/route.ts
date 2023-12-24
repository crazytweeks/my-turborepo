import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    access_token: null,
    expires_in: 3600,
    token_type: "Bearer",
  });
};
