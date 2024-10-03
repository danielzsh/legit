// app/api/texts/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const textsDirectory = path.join(process.cwd(), 'texts');

export async function GET() {
  const fileNames = fs.readdirSync(textsDirectory);
  
  const texts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(textsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });
  return NextResponse.json(texts);
}
