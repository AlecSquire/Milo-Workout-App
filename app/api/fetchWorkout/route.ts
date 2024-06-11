import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const muscle = searchParams.get("muscle");
  const name = searchParams.get("name");

  const fetcher = async (url: string, headers: { "X-Api-Key"?: string }) => {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }
    return res.json();
  };

  const finalURL = `https://api.example.com/workouts?muscle=${muscle}&name=${name}`;
  const headers = { "X-Api-Key": request.headers.get("X-Api-Key") || "" };

  try {
    const data = await fetcher(finalURL, headers);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
