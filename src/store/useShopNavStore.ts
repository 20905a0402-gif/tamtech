import { create } from "zustand";

interface ShopNavStore {
  onOpenFilters: (() => void) | null;
  onOpenSort: (() => void) | null;
  registerHandlers: (onFilter: () => void, onSort: () => void) => void;
  unregisterHandlers: () => void;
}

export const useShopNavStore = create<ShopNavStore>((set) => ({
  onOpenFilters: null,
  onOpenSort: null,
  registerHandlers: (onFilter, onSort) =>
    set({ onOpenFilters: onFilter, onOpenSort: onSort }),
  unregisterHandlers: () => set({ onOpenFilters: null, onOpenSort: null }),
}));
