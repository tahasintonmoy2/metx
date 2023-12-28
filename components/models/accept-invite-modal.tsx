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

import {
  DialogFooter
} from "@/components/ui/dialog"
import { redirect } from "next/navigation";


export const AcceptInviteModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { server } = data;

  const isModalOpen = isOpen && type === "acceptInvite";

  const handleClose = () => {
    onClose()
  };

  const onAccept = async () => {
    return redirect(`/servers/${server?.id}`)
  };

  return (
    <Modal title="Accept Invite" description="To accept this invite to join this server" isOpen={isModalOpen} onClose={onClose}>
      <div>
        <div className="p-6">
          <DialogFooter>
            <Button onClick={onClose} className="bg-transparent border-none dark:hover:bg-[#181b2b] dark:text-white" disabled={isLoading}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onAccept}>
              Accept
            </Button>
          </DialogFooter>
        </div>
      </div>
    </Modal>
  );
};
