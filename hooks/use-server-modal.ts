import { create } from "zustand";

interface useServerModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useServerModal = create<useServerModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
