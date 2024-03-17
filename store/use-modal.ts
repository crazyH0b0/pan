import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type ModalType = "createFolder";

interface ModalData {
  name?: string;
}

export interface ModalProps {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  OnOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalProps>()(
  devtools(
    immer((set) => ({
      type: null,
      data: {},
      isOpen: false,
      OnOpen: (type, data = {}) => set({ isOpen: true, type, data }),
      onClose: () => set({ isOpen: false, type: null }),
    })),
  ),
);
