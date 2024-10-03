"use client";
import Image from "next/image";
import TextCard from "@/components/TextCard";
import { getTexts } from '@/lib/texts';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [texts, setTexts] = useState([]);

  // Fetch the texts from the API route
  useEffect(() => {
    const fetchTexts = async () => {
      const res = await fetch('/api/texts');
      const data = await res.json();
      setTexts(data);
    };

    fetchTexts();
  }, []);

  return (
    <div className="mt-48">
      <h1 className="text-5xl font-bold text-center text-gray-800">Legit.</h1>
      <p className="mt-4 text-lg text-gray-700 text-center">
        A modern tool for reading Latin.
      </p>
      <div className="flex flex-wrap justify-center p-4 mt-12">
        {texts.length > 0 ? (
          texts.map((text) => (
            <TextCard
              key={text.id}
              title={text.title || text.id}
              description={text.description || 'No description available'}
              href={`/texts/${text.id}`}
            />
          ))
        ) : (
          <p>Loading texts...</p>
        )}
      </div>
    </div>
  );
}
