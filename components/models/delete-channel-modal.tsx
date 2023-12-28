"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { server, channel } = data;

  const isModalOpen = isOpen && type === "deleteChannel";

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });
      await axios.delete(url);

      onClose();
      toast.success(`Channel deleted to ${server?.name}`);
      router.push(`/servers/${server?.id}`);
      router.refresh();
    } catch (error) {
      toast.error(`Failed to delete, ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center md:text-2xl pt-7">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center md:text-sm text-[12px] text-gray-700 px-6">
            This action cannot be undone. This will permanently delete your{" "}
            <span className="text-blue-600 font-semibold">
              #{channel?.name}
            </span>{" "}
            server and remove your all data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-200 px-6 py-4">
          <Button
            disabled={isLoading}
            variant="ghost"
            onClick={onClose}
            className="md:mt-0 mt-4 focus-visible:ring-transparent focus:outline-none"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} variant="delete" onClick={onClick}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
