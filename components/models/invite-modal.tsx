"use client";

import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MemberRole } from "@prisma/client";

interface InviteModalProps {
  role?: MemberRole;
}

export const InviteModal = ({
 role
}: InviteModalProps) => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const origin = useOrigin();
  const { server } = data;

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const isModalOpen = isOpen && type === "invite";

  const isAdmin = role === MemberRole.ADMIN;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNewLink = async () => {
    try {
      setIsLoading(true);
      const resp = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen("invite", { server: resp.data });
    } catch (error) {
      toast.error(`Generate failed a new link error ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Invite Peoples" isOpen={isModalOpen} onClose={onClose}>
      <div>
        <div className="p-6">
          <Label
            htmlFor="link"
            className="uppercase text-xs font-semibold dark:text-gray-500"
          >
            Server Invite Link to <span className="text-blue-600">{server?.name}</span>
          </Label>
          <div className=" flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              id="link"
              value={inviteUrl}
              className="bg-zinc-300/50 w-full text-black border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              readOnly
            />
            <Button
              disabled={isLoading}
              type="submit"
              size="sm"
              className="px-3 dark:hover:bg-slate-400/50 dark:bg-slate-300/60"
              onClick={onCopy}
            >
              <span className="sr-only">Copy</span>
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
         {isAdmin && (
          <Button
            onClick={onNewLink}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="mt-4 text-zinc-500"
          >
            {isLoading ? (
              <>
                Generating a new link
                <RefreshCw className="h-4 w-4 animate-spin ml-2" />
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Generate a new link
              </>
            )}
          </Button>
         )} 
        </div>
      </div>
    </Modal>
  );
};
