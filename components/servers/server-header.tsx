"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus
} from "lucide-react";
import { MdGroups } from "react-icons/md";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button className="w-full font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-[#181b2b] border-b-2 hover:border-[#24283d] dark:hover:bg-[#181b2b] transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-[#131622] dark:border-[#181b2b] font-semibold w-56">
        <DropdownMenuItem
          onClick={() => onOpen("invite", { server })}
          className="dark:hover:bg-indigo-600 group dark:text-indigo-500"
        >
          <span className="dark:text-indigo-500 group-hover:dark:text-white text-indigo-600">
            Invite People
          </span>
          <UserPlus className="h-5 w-5 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-zinc-300 dark:bg-[#212333]" />
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="dark:hover:bg-indigo-600 group"
          >
            <span className="group-hover:dark:text-white">Server Settings</span>
            <Settings className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="dark:hover:bg-indigo-600"
          >
            Manage members
            <MdGroups size={23} className="ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel", { server })}
            className="dark:hover:bg-indigo-600"
          >
            Create Channel
            <PlusCircle className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <>
            <DropdownMenuSeparator className="bg-zinc-300 dark:bg-[#212333]" />
            <DropdownMenuItem
              className="dark:hover:bg-red-600 text-red-600 group"
              onClick={() => onOpen("deleteServer", { server })}
            >
              <span className="group-hover:dark:text-white">Delete Server</span>
              <Trash className="h-5 w-5 ml-auto" />
            </DropdownMenuItem>
          </>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="dark:hover:bg-red-600 text-red-600 group"
          >
            <span className="group-hover:dark:text-white">Leave Server</span>
            <LogOut className="h-5 w-5 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
