import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
  

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  const API_KEY = process.env.NEXT_PUBLIC_SPORTMONKS_TOKEN;
  const API_URL = `https://api.sportmonks.com/v3/football/fixtures/date/${date}?api_token=${API_KEY}&includes=participants;league;scores`;

  try {
    const { data } = await axios.get(API_URL);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch matches:${error}` }, { status: 500 });
  }
}
