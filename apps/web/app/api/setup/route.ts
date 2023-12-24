import { NextResponse } from "next/server";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { config } from "@repo/shared";

import { allFieldsSchema } from "../../../lib/fields";

const AUTH_URL = config.AUTH_URL;

export async function POST(req: Request) {
  try {
    const session = await getSession();
    const accessToken = await getAccessToken().catch((err) => {
      console.error(err.message);
      return null;
    });

    if (!accessToken) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    if (!session) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const data = await req.json();
    if (!data) {
      return NextResponse.json(
        { message: "No data provided" },
        { status: 400 },
      );
    }

    const verifyData = allFieldsSchema.parse(data);

    if (!verifyData) {
      return NextResponse.json(
        { message: "Invalid data provided" },
        { status: 400 },
      );
    }

    const URL = `${AUTH_URL}/api/setup`;
    console.log("URL: ", URL);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken.accessToken}`,
    };

    const res = await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(verifyData),
    }).catch((err) => {
      console.error(err);
      return null;
    });

    if (!res) {
      return NextResponse.json({ message: "Error" }, { status: 500 });
    }

    const result = await res.json().catch((err) => {
      return { error: err.message ?? "Error" };
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Error" }, { status: 500 });
    }

    return NextResponse.json({ ...result }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message ?? "Error" },
      { status: 500 },
    );
  }
}
