// app/texts/[author]/[work]/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Text } from '@/components/text';
import Breadcrumb from '@/components/Breadcrumb';

export default async function TextPage({ params }: { params: { author: string, work: string, slug: string } }) {
  const textPath = path.join(process.cwd(), 'texts', params.author, params.work, `${params.slug}.md`);
 
  // Read the markdown file and parse the metadata and content
  const fileContents = fs.readFileSync(textPath, 'utf8');
  const { content, data } = matter(fileContents); // data contains the metadata, content contains the markdown content
  
  return (
    <div className="ml-40">
      <Breadcrumb author={params.author} work={params.work} chapter={params.slug} />
      <div className="mt-10 mr-60">
        {/* Display metadata */}
        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p className="text-gray-600">{data.date}</p>
        <p className="text-gray-900">Author: {data.author}</p>
        <p className="text-md text-gray-800">{data.litperiod} - {data.type}</p>
        <p className="italic pb-10">Description: {data.description}</p>
        {/* Render the actual content of the markdown file */}
        <Text text={content} />
      </div>
    </div>
  );
}
