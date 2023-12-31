import { NextResponse } from "next/server";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const GET = async () => {
  try {
    const token = await getAccessToken();

    return NextResponse.json({
      token,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
        statusText: "Unauthorized user",
        headers: { "WWW-Authenticate": "Bearer" },
      },
    );
  }
};
