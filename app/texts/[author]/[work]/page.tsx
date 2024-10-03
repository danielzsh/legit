// app/texts/[author]/[work]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import TextCard from '@/components/TextCard';
import Breadcrumb from '@/components/Breadcrumb';

export default function WorkPage({ params }: { params: { author: string, work: string } }) {
  const [chapters, setChapters] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(`/api/texts/author/${params.author}/${params.work}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chapters');
        }
        const data = await response.json();
        setChapters(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchChapters();
  }, [params.author, params.work]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-wrap justify-center p-4">
      <Breadcrumb author={params.author} work={params.work} />
      <h1 className="w-full text-center text-2xl mb-6">{params.work} by {params.author}</h1>
      {chapters.length > 0 ? (
        chapters.map((chapter) => {
          const slug = chapter.replace('.md', '');
          return (
            <TextCard
              key={slug}
              title={`${slug}`}
              description={`Read ${slug} of ${params.work}`}
              href={`/texts/${params.author}/${params.work}/${slug}`}
            />
          );
        })
      ) : (
        <p>No chapters found for this work.</p>
      )}
    </div>
  );
}
