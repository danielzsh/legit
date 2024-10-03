// app/texts/[author]/[work]/page.tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function WorkPage({ params }: { params: { author: string, work: string } }) {
  const workPath = path.join(process.cwd(), 'texts', params.author, params.work);
  const chapters = fs.readdirSync(workPath).filter((chapter) => chapter.endsWith('.md'));

  return (
    <div>
      <h1>{params.work} by {params.author}</h1>
      <ul>
        {chapters.map((chapter) => {
          const slug = chapter.replace('.md', '');
          return (
            <li key={slug}>
              <Link href={`/texts/${params.author}/${params.work}/${slug}`}>
                Chapter {slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
