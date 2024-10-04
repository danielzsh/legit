import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = await fetch(`https://www.latin-is-simple.com/api/vocabulary/search/${request.nextUrl.search}`)
  return Response.json(await response.json())
}
