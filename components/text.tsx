"use client";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";

type Definition = {
  id: number;
  intern_type: string;
  short_name: string;
  full_name: string;
  type: {
    name: string;
    label: string;
  };
  translations_unstructured: {
    en: string;
    de: string;
  };
  url: string;
};

// gets unique identifier for a definition
// for instance, adjective/132
function unique(d: Definition) {
  return `${d.intern_type}/${d.id}`;
}

export function Text({ text }: { text: string }) {
  const definitions = collection(db, "definitions");
  const emptyDefn = { short_name: "Loading..." } as Definition;
  const [word, setWord] = useState<string | null>(null);
  const [defn, setDefn] = useState<Definition[]>([emptyDefn]);
  const [defnInfo, setDefnInfo] = useState<DocumentData>({});
  const [ind, setInd] = useState(0);
  const freq = (defnInfo: DocumentData, defn: Definition) => {
    if (!defnInfo) return 0;
    const name = unique(defn);
    console.log(name, name in defnInfo ? defnInfo[name] : 0);
    return name in defnInfo ? defnInfo[name] : 0;
  };
  return (
    <>
      {text.split("\n").map((line, i) => (
        <div key={i}>
          {line.split(/ /g).map((w, i) => (
            <span
              className="cursor-pointer"
              key={i}
              onClick={async () => {
                setInd(0);
                setDefn([emptyDefn]);
                // get rid of punctuations and macrons
                const W = w
                  .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "");
                setWord(W);
                const resp = await fetch(`/api/defn?query=${W}`);
                const defn = await resp.json();
                const docSnap = await getDoc(doc(definitions, W));
                const defnInfo = docSnap.exists() ? docSnap.data() : {};
                if (defnInfo) {
                  console.log(defn);
                  // sort definitions by frequency
                  defn.sort(
                    (a: Definition, b: Definition) =>
                      freq(defnInfo, b) - freq(defnInfo, a),
                  );
                  console.log(defn);
                }
                setDefn(defn);
                setDefnInfo(defnInfo);
              }}
            >
              {w + " "}
            </span>
          ))}
        </div>
      ))}
      <Dialog
        open={word != null}
        onClose={() => {
          setWord(null);
        }}
        transition
        className="z-50 fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="flex flex-col border bg-white p-12 rounded-md h-2/4 w-2/4 xl:w-1/3">
            {/* information for current definition */}
            <DialogTitle className="font-bold">
              {defn[ind]?.short_name}
            </DialogTitle>
            {/* <p className="italic">{word}</p> */}
            <p className="italic">{defn[ind].intern_type}</p>
            <p className="italic">{defn[ind].full_name}</p>
            <p>{defn[ind]?.translations_unstructured?.en}</p>

            {/* bottom bar to cycle through definitions */}
            <div className="flex align-center select-none mt-auto">
              <button
                className="w-full mr-2 bg-gray-300"
                onClick={() => {
                  defnInfo[unique(defn[ind])] = freq(defnInfo, defn[ind]) + 1;
                  setDoc(doc(definitions, word!), defnInfo);
                  setWord(null);
                }}
              >
                Use this definition
              </button>
              <p className="mr-2">{`${ind + 1}/${defn.length}`}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
                onClick={() => setInd((ind + defn.length - 1) % defn.length)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
                onClick={() => setInd((ind + 1) % defn.length)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
