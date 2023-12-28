import { ChatVideoButton } from "@/components/chats/chat-video-button";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { Hash } from "lucide-react";
import React from "react";
import { ChatAudioButton } from "./chat-audio-button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
  connect: React.ReactNode;
}

export const ChatHeader = ({
  serverId,
  name,
  type,
  imageUrl,
  connect,
}: ChatHeaderProps) => {
  return (
    <div className="px-3 flex items-center h-14 border-neutral-200 dark:border-[#181b2b] border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mr-2" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl!} className="h-8 w-8 mr-2" />
      )}
      <div className="my-5">
        <p className="font-semibold text-md text-black dark:text-white">
          {name}
        </p>
        <p className=" text-[0.8rem] font-extralight">{connect}</p>
      </div>
        <div className="ml-auto flex items-center">
          {type === "conversation" && (
            <ChatVideoButton />
          )}
          {type === "conversation" && (
            <ChatAudioButton />
          )}
        </div>
    </div>
  );
};
