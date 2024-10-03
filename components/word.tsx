"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
export function Word({ word }: { word: string }) {
  return <Popover className="relative inline">
    <PopoverButton>{word}</PopoverButton>
    <PopoverPanel anchor="bottom" className="flex flex-col">
      <a href="/analytics">Analytics</a>
      <a href="/engagement">Engagement</a>
      <a href="/security">Security</a>
      <a href="/integrations">Integrations</a>
    </PopoverPanel>
  </Popover>
  return <span className="cursor-pointer" onClick={async () => {
    const response = await fetch(`https://www.latin-is-simple.com/api/vocabulary/search/?query=${word}&forms_only=false`)
    alert(await response.json())
  }}>{word + ' '}</span>
}
