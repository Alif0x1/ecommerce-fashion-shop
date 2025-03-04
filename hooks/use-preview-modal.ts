import { Product } from "@/types";
import { create } from "zustand";

interface PreviewModalState {
  isOpen: boolean;
  data: Product | undefined;
  onOpen : (data: Product) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalState>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data) => set({ data  , isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;