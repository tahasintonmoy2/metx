"use client";

import { ActionHint } from "@/components/action-hint";
import { ModalType, useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { 
  Channel, 
  ChannelType, 
  MemberRole, 
  Server 
} from "@prisma/client";
import {
  Edit,
  Hash,
  Lock,
  Trash,
  Video,
  Volume2
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Volume2,
  [ChannelType.VIDEO]: Video,
};

export const ServerChannel = ({
  channel,
  server,
  role,
}: ServerChannelProps) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);

  const Icon = iconMap[channel.type];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/channels/${channel.id}`);
  }

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, {channel, server})
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <button
    onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center hover:bg-gray-300 dark:hover:bg-[#181b2b] gap-x-2 w-full mb-1 transition",
        params?.channelId === channel.id &&
          "text-primary dark:bg-[#181b2b] bg-gray-300 dark:text-zinc-200 dark:group-hover:text-white"
      )}
    >
      <Icon className={cn(
        "flex-shrink-0 h-5 w-5 text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 dark:text-zinc-400",
        params?.channelId === channel.id &&
        "text-primary dark:text-zinc-200 text-slate-800 bg-gray-300 dark:bg-transparent dark:group-hover:text-white"        
      )}/>
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-gray-500 group-hover:text-gray-700 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center md:opacity-0 md:group-hover:opacity-100 gap-x-2">
          <ActionHint description="Edit Channel" side="top">
            <Edit
              onClick={(e) => onAction(e, "editChannel")}
              className="h-4 w-4 text-gray-600 dark:text-zinc-300"
            />
          </ActionHint>
          <ActionHint description="Delete Channel" side="top">
            <Trash
              onClick={(e) => onAction(e, "deleteChannel")}
              className="h-4 w-4 text-red-600"
            />
          </ActionHint>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto h-4 w-4 text-gray-600 dark:text-zinc-300" />
      )}
    </button>
  );
};
