// app/api/texts/author/[author]/[work]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { author: string, work: string } }) {
  const workPath = path.join(process.cwd(), 'texts', params.author, params.work);

  try {
    const chapters = fs.readdirSync(workPath).filter((chapter) => chapter.endsWith('.md'));

    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error reading texts for work:', error);
    return NextResponse.json({ error: 'Failed to load texts for work' }, { status: 500 });
  }
}
