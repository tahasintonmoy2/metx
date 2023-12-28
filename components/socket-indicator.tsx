"use client";

import { useSocket } from "@/components/providers/socket-provider";
import { Badge } from "@/components/ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-[#ff0000] cursor-default text-white border-none">
        Fallback: Disconnected from our server
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-green-500 cursor-default text-white border-none">
      Connected
    </Badge>
  );
};
