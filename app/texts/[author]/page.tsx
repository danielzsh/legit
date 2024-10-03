// app/texts/[author]/page.tsx
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function AuthorPage({ params }: { params: { author: string } }) {
  const authorPath = path.join(process.cwd(), 'texts', params.author);
  const works = fs.readdirSync(authorPath).filter((work) => {
    const workPath = path.join(authorPath, work);
    return fs.statSync(workPath).isDirectory();
  });

  return (
    <div>
      <h1>Works by {params.author}</h1>
      <ul>
        {works.map((work) => (
          <li key={work}>
            <Link href={`/texts/${params.author}/${work}`}>{work}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
