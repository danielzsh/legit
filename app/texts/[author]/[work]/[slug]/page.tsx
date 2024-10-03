// app/texts/[author]/[work]/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import { Text } from '@/components/text';

export default async function TextPage({ params }: { params: { author: string, work: string, slug: string } }) {
  const textPath = path.join(process.cwd(), 'texts', params.author, params.work, `${params.slug}.md`);
  const textContent = fs.readFileSync(textPath, 'utf8');
  return <Text text={textContent} />;
}
