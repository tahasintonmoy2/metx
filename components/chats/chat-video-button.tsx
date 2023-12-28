"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from "query-string";

import { ActionHint } from "@/components/action-hint";

import { Video, VideoOff } from "lucide-react";

export const ChatVideoButton = () => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();

   const isVideo = searchParams?.get("video");

   const onClick = () => {
     const url = qs.stringifyUrl({
        url: pathname || "",
        query: {
            video: isVideo ? undefined : true,
        }
     }, {skipNull: true});

     router.push(url)
   }

   const Icon = isVideo ? VideoOff : Video;
   const tooltipLabel = isVideo ? "End video calling" : "Start video calling"

  return (
    <ActionHint description={tooltipLabel} side="bottom">
        <button onClick={onClick} className="hover:opacity-75 transition mr-4">
            <Icon className="h-6 w-6 text-slate-600 dark:text-zinc-400"/>
        </button>
    </ActionHint>
  )
}