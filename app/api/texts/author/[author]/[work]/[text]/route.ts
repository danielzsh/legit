// app/api/texts/author/[author]/[work]/[text]/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { author: string, work: string, text: string } }) {
  const textPath = path.join(process.cwd(), 'texts', params.author, params.work, `${params.text}.md`);

  try {
    const textContent = fs.readFileSync(textPath, 'utf8');
    return NextResponse.json({ content: textContent });
  } catch (error) {
    console.error('Error reading text content:', error);
    return NextResponse.json({ error: 'Failed to load text content' }, { status: 500 });
  }
}
