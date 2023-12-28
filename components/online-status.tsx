"use client";

import { Member } from "@prisma/client";
import React, {useState, useEffect} from 'react'
import { useSocket } from "./providers/socket-provider";

interface OnlineStatusProps {
    member?: Member
}


export const OnlineStatus = ({
 member
}: OnlineStatusProps) => {
    const { socket, isOnline } = useSocket();

    if (!isOnline) {
       return (
        <p className="dark:text-zinc-400 text-zinc-500 ml-1 font-semibold text-[12px]">
         - is Offline 
        </p>
       )
    }

  return (
    <p className="text-green-500 ml-1 font-semibold text-[12px]">
       - is Online 
    </p>
  )
}
