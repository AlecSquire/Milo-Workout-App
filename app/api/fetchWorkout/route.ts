import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const muscle = searchParams.get("muscle");
  const name = searchParams.get("name");
  const type = searchParams.get("type");
  const API_KEY_WORKOUT = process.env.API_KEY_WORKOUT;

  const queryParams = new URLSearchParams();
  if (muscle) queryParams.append("muscle", muscle);
  if (name) queryParams.append("name", name);
  if (type) queryParams.append("type", type);

  const apiUrl = `https://api.api-ninjas.com/v1/exercises?${queryParams.toString()}&offset=2`;

  try {
    const response = await fetch(apiUrl, {
      headers: { "X-Api-Key": API_KEY_WORKOUT },
    });
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText },
        { status: response.status }
      );
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
