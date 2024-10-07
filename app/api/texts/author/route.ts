// app/api/texts/author/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const textsDirectory = path.join(process.cwd(), "texts");

export async function GET() {
  try {
    const authors = fs.readdirSync(textsDirectory).filter((author) => {
      const authorPath = path.join(textsDirectory, author);
      return fs.statSync(authorPath).isDirectory(); // Only return directories (authors)
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.error("Error reading authors:", error);
    return NextResponse.json(
      { error: "Failed to load authors" },
      { status: 500 },
    );
  }
}
