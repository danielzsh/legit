// app/texts/[author]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import TextCard from "@/components/TextCard";

export default function AuthorPage({ params }: { params: { author: string } }) {
  const [works, setWorks] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(`/api/texts/author/${params.author}`);
        if (!response.ok) {
          throw new Error('Failed to fetch works');
        }
        const data = await response.json();
        setWorks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWorks();
  }, [params.author]);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-wrap justify-center p-4">
      <Breadcrumb author={params.author} />
      <h1 className="w-full text-center text-3xl mb-6 ">Works by {params.author}</h1>
      {works.length > 0 ? (
        works.map((work) => (
          <TextCard
            key={work}
            title={work}
            description={`Read ${work} by ${params.author}`}
            href={`/texts/${params.author}/${work}`}
          />
        ))
      ) : (
        <p>Loading works...</p>
      )}
    </div>
  );
}
