"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface ModalProps {
  title: string;
  description?: string;
  onClose: () => void;
  isOpen: boolean;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="bg-white p-0 text-black overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center md:text-2xl pt-7">{title}</DialogTitle>
          <DialogDescription className="text-center md:text-sm text-[12px] text-gray-700 px-6">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
