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
import qs from "query-string";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const { apiUrl, query } = data;

  const isModalOpen = isOpen && type === "deleteMessage";

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.delete(url);

      onClose();
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
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center md:text-sm text-[12px] text-gray-700 px-6">
            This action cannot be undone. This will permanently delete your
            images, videos and messages and remove from our
            servers.
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
