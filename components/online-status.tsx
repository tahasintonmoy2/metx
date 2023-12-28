"use client";

import { useSocket } from "./providers/socket-provider";

export const OnlineStatus = () => {
  const { isOnline } = useSocket();

  if (!isOnline) {
    return (
      <p className="dark:text-zinc-400 md:block hidden text-zinc-500 ml-1 font-semibold text-[12px]">
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
