// app/api/texts/author/[author]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { author: string } }) {
  const authorPath = path.join(process.cwd(), 'texts', params.author);

  try {
    const works = fs.readdirSync(authorPath).filter((work) => {
      const workPath = path.join(authorPath, work);
      return fs.statSync(workPath).isDirectory(); // Only return directories (works)
    });

    return NextResponse.json(works);
  } catch (error) {
    console.error('Error reading works for author:', error);
    return NextResponse.json({ error: 'Failed to load works for author' }, { status: 500 });
  }
}
