"use client";

import { Modal } from "@/components/ui/modal";
import { UserAvatar } from "@/components/user-avatar";
import { useModal } from "@/hooks/use-modal";
import { cn } from "@/lib/utils";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  Check,
  Crown,
  Hexagon,
  Loader2,
  MoreVertical,
  ShieldCheck,
  ShieldQuestion,
  UserMinus2
} from "lucide-react";
import qs from "query-string";
import { useState } from "react";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";

interface MembersModalProps {
  role?: MemberRole;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-600" />,
  ADMIN: <Crown className="h-4 w-4 ml-2 text-blue-600" />,
};

export const MembersModal = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [loadingId, setLoadingId] = useState("");
  const { server } = data as { server: ServerWithMembersWithProfiles };
  const isModalOpen = isOpen && type === "members";

  const onKick =async (memberId:string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        }
      });

      const response = await axios.delete(url);
      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      toast.error(`Failed to kick, error ${error}`)
    } finally {
      setLoadingId("")
    }
  }

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        }
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data })
    } catch (error) {
      toast.error(`Failed to change role error ${error}`)
    } finally {
      setLoadingId("")
    }
  }

  return (
    <Modal
      title="Manage Members"
      description={`${server?.members?.length} Members`}
      isOpen={isModalOpen}
      onClose={onClose}
    >
      <div>
        <div
          className={cn(
            "my-6 mx-5 space-y-4 overflow-x-hidden overflow-y-auto w-[450px]",
            server?.members?.length > 2 ? "h-32" : "h-auto"
          )}
        >
          {server?.members?.map((member) => (
            <div className="flex items-center gap-x-2" key={member.id}>
              <UserAvatar src={member.profile.imageUrl} />
              <div className="flex flex-col gap-y-1">
                <div className="text-xs font-semibold flex items-center">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs text-gray-600">{member?.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="focus:border-none focus-visible:outline-none">
                        <MoreVertical className="h-5 w-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <ShieldQuestion className="h-5 w-5 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-36">
                              <DropdownMenuItem onClick={() => onRoleChange(member.id, "GUEST")}>
                                <Hexagon className="h-5 w-5 mr-2" />
                                <span>Guest</span>
                                {member.role === "GUEST" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onRoleChange(member.id, "MODERATOR")}>
                                <ShieldCheck className="h-5 w-5 mr-2" />
                                <span>Modertor</span>
                                {member.role === "MODERATOR" && (
                                  <Check className="h-4 w-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <UserMinus2 className="h-5 w-5 mr-2" />
                          Kick {member.profile.name}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className="h-4 w-4 ml-auto animate-spin" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
