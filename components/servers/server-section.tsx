"use client";

import { ActionHint } from "@/components/action-hint";
import { useModal } from "@/hooks/use-modal";
import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { Plus, Settings } from "lucide-react";
import { useEffect, useState } from "react";

interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
  sectionType: "channels" | "members";
}

export const ServerSection = ({
  label,
  role,
  channelType,
  server,
  sectionType,
}: ServerSectionProps) => {
  const { onOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-gray-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== MemberRole.GUEST && sectionType === "channels" && (
        <ActionHint description="Cretae new channel" side="top">
          <button
            onClick={() => onOpen("createChannel", { channelType })}
            className="text-sinc-500 hover:text-gray-800 dark:hover:text-gray-400 hover:bg-gray-300 py-2 px-2 rounded-md dark:text-zinc-400 dark:hover:bg-[#181b2b] transition"
          >
            <Plus className="h-5 w-5" />
          </button>
        </ActionHint>
      )}
      {role === MemberRole.ADMIN && sectionType === "members" && (
        <ActionHint description="Manage Members" side="top">
          <button
            onClick={() => onOpen("members", { server })}
            className="text-sinc-500 hover:text-gray-800 hover:bg-gray-300 dark:hover:text-gray-400 py-2 px-2 rounded-md dark:text-zinc-400 dark:hover:bg-[#181b2b] transition"
          >
            <Settings className="h-5 w-5" />
          </button>
        </ActionHint>
      )}
    </div>
  );
};
