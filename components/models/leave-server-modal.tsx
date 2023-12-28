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
import { useState } from "react";
import { toast } from "sonner";

export const LeaveServerModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { server } = data;

  const isModalOpen = isOpen && type === "leaveServer";

  const onClick = async () => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/servers/${server?.id}/leave`);

      onClose();
      router.refresh();
      router.push("/");
      toast.success(`Leaved to ${server?.name}`);
    } catch (error) {
      toast.error(`Failed to leave, ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center md:text-2xl pt-7">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center md:text-sm text-[12px] text-gray-700 px-6">
            Are you absolutely sure to leave{" "}
            <span className="text-blue-600 font-semibold">{server?.name}</span>{" "}
            ?
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
          <Button 
           disabled={isLoading} 
           variant="delete" 
           onClick={onClick}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
