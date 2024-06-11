import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const fetcher = async (url: string, headers: { "X-Api-Key"?: string }) => {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }
    return res.json();
  };

  const url = request.url;
  const headers = {
    "X-Api-Key": request.headers.get("X-Api-Key") || undefined,
  };

  try {
    const data = await fetcher(url, headers);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
