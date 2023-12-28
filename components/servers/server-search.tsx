"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { CommandIcon, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export const ServerSearch = ({ data }: ServerSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({id, type}: {id: string, type: "channel" | "member"}) => {
    setIsOpen(false)

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }
    
    if (type === "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 bg-gray-300/90 hover:bg-gray-400/40 dark:bg-[#131622] dark:hover:bg-[#181b2b] w-full transition"
      >
        <Search className="h-4 w-4 dark:text-gray-500 text-slate-600" />
        <p className="text-sm font-semibold dark:text-gray-500 text-slate-600">
          Search
        </p>
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border dark:border-[#181b2b] dark:bg-[#0f111a] px-1.5 font-mono text-[10px] font-medium text-slate-600">
          {process.platform === "darwin" ? (
            <>
              <span className="text-xs">
                <CommandIcon className="h-3 w-3" />
              </span>
              <span className="text-base">K</span>
            </>
          ) : (
            <>
              <span className="text-xs font-semibold">Ctrl</span>
              <span className="text-base">K</span>
            </>
          )}
        </kbd>
      </button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="Search moderator, channels, members" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data.map(({label, type, data}) => {
            if (data?.length === 0) return null;

            return (
            <CommandGroup heading={label} key={label}>
              {data?.map(({id, icon, name}) => {
                return (
                  <CommandItem key={id} className="dark:hover:bg-[#181b2b]" onSelect={() => onClick({ id, type})}>
                    {icon}
                    <span>{name}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};
