import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const API_KEY = process.env.NEXT_PUBLIC_SPORTMONKS_TOKEN;
  const API_URL = `https://api.sportmonks.com/v3/football/tv-stations?api_token=${API_KEY}`;

  try {
    const { data } = await axios.get(API_URL);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
     return NextResponse.json({ error: `Failed to fetch matches:${error}` }, { status: 500 });
  }
}
