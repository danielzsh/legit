"use client";
import Image from "next/image";
import TextCard from "@/components/TextCard";
import { getTexts } from '@/lib/texts';
import React, { useEffect, useState } from 'react';
import path from 'path';

export default function Home() {
  const [authors, setAuthors] = useState<string[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch('/api/texts/author');
      const data = await response.json();
      setAuthors(data);
    };

    fetchAuthors();
  }, []);

  return (
    <div className="mt-40 min-h-screen h-full overflow-x-hidden">
      <header className="mb-40 text-center">
        <h1 className="text-5xl font-bold text-center text-gray-900">Legit.</h1>
        <p className="mt-4 text-lg text-gray-700 text-center">
          A modern tool for reading Latin.
        </p>
      </header>
      <div className="bg-lime-100 pb-24">
        <h2 className="pt-24 mb-5 ml-24 text-3xl font-semibold text-left text-gray-800"> Explore Authors </h2>
        <div className="flex flex-wrap ml-16 justify-left p-4">
          {authors.length > 0 ? (
            authors.map((author) => (
              <TextCard
                key={author}
                title={author}
                description={`Works by ${author}`} // Placeholder description
                href={`/texts/${author}`} // Link to the author's page
              />
            ))
          ) : (
            <p>Loading Authors...</p>
          )}
        </div>
      </div>
    </div>
  );
}
