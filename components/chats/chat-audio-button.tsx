"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from "query-string";

import { ActionHint } from "@/components/action-hint";

import { Phone, PhoneOff } from "lucide-react";

export const ChatAudioButton = () => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();

   const isAudio = searchParams?.get("audio");

   const onClick = () => {
     const url = qs.stringifyUrl({
        url: pathname || "",
        query: {
            audio: isAudio ? undefined : true,
        }
     }, {skipNull: true});

     router.push(url)
   }

   const Icon = isAudio ? PhoneOff : Phone;
   const tooltipLabel = isAudio ? "End audio calling" : "Start audio calling"

  return (
    <ActionHint description={tooltipLabel} side="bottom">
        <button onClick={onClick} className="hover:opacity-75 transition mr-4">
            <Icon className="h-5 w-5 text-slate-600 dark:text-zinc-400"/>
        </button>
    </ActionHint>
  )
}