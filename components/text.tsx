"use client";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

type Definition = {
  id?: number,
  intern_type?: string,
  short_name: string,
  full_name?: string,
  type?: {
    name: string,
    label: string
  },
  translations_unstructured?: {
    en: string,
    de: string
  },
  url?: string
}

export function Text({ text }: { text: string }) {
  const emptyDefn = { short_name: 'Loading...' };
  const [word, setWord] = useState<string | null>(null);
  const [defn, setDefn] = useState<Definition[]>([emptyDefn]);
  const [ind, setInd] = useState(0);
  return (
    <>
      {text.split(/ /g).map((w, i) =>
        <span className="cursor-pointer" key={i} onClick={async () => {
          setInd(0);
          setDefn([emptyDefn]);
          setWord(w);
          const response = await fetch(`https://www.latin-is-simple.com/api/vocabulary/search/?query=${w}&forms_only=false`)

          setDefn(await response.json())
        }}>{w + ' '}</span>)}
      <Dialog
        open={word != null}
        onClose={() => { setWord(null); }}
        transition
        className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="space-y-4 border bg-white p-12 rounded-md w-2/4 xl:w-1/3">
            <DialogTitle className="font-bold">{defn[ind].short_name}</DialogTitle>
            <p className="italic">{defn[ind]?.full_name}</p>
            <p>{defn[ind]?.translations_unstructured?.en}</p>
            <div className="flex justify-end align-center select-none">
              <p className="mr-2">{`${ind + 1}/${defn.length}`}</p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="size-6 cursor-pointer"
                onClick={() => setInd((ind + defn.length - 1) % defn.length)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                className="size-6 cursor-pointer"
                onClick={() => setInd((ind + 1) % defn.length)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
