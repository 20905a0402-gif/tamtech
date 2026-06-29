import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Product type matching Supabase schema
export interface Product {
  id: string;
  name: string;
  slug: string;
  price_kes: number;
  category: "Tools" | "Materials" | "EV";
  sub_category: string;
  description?: string;
  specs?: Record<string, unknown>;
  image_url?: string;
  images?: string[];
  inventory_count: number;
  is_active: boolean;
  brand?: string;
  sku: string;
}

// Service type matching Supabase schema
export interface Service {
  id: string;
  name: string;
  slug: string;
  category: "Aluminium" | "Kitchen" | "Shower" | "Railing";
  description?: string;
  short_description?: string;
  features?: string[];
  starting_price_kes?: number;
  image_url?: string;
}

// Cart item type
export interface CartItem {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  attributes?: Record<string, string>;
}

export interface CartService {
  id: string;
  name: string;
  description?: string;
  details?: string;
}

// Wishlist item type
export interface WishlistItem {
  id: string;
  sku: string;
  name: string;
  price_kes: number;
  image_url?: string;
  added_at: string;
}

interface CartState {
  // Cart items
  items: CartItem[];
  services: CartService[];
  // Wishlist items
  wishlist: WishlistItem[];
  
  // Hydration state
  isHydrated: boolean;
  setIsHydrated: (value: boolean) => void;
  
  // Cart actions
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // Service actions
  addService: (service: CartService) => void;
  removeService: (id: string) => void;
  clearServices: () => void;
  
  // Wishlist actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  moveToCart: (productId: string) => void;
  
  // Computed values
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCartId: () => string;
  getWishlistCount: () => number;
}

// Generate cart ID
const generateCartId = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TAM-${timestamp}${random}`;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      services: [],
      wishlist: [],
      isHydrated: false,
      
      // Hydration setter
      setIsHydrated: (value) => set({ isHydrated: value }),
      
      // Add item to cart
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.sku === item.sku);
          
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.sku === item.sku
                  ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                  : i
              ),
            };
          }
          
          return {
            items: [
              ...state.items,
              { ...item, quantity: item.quantity || 1 },
            ],
          };
        });
      },
      
      // Remove item from cart
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
      },
      
      // Update item quantity
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity } : i
          ),
        }));
      },
      
      // Clear all items
      clearCart: () => set({ items: [] }),
      
      // Add service
      addService: (service) => {
        set((state) => {
          const exists = state.services.find((s) => s.id === service.id);
          if (exists) return state;
          
          return {
            services: [...state.services, service],
          };
        });
      },
      
      // Remove service
      removeService: (id) => {
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        }));
      },
      
      // Clear all services
      clearServices: () => set({ services: [] }),
      
      // Wishlist actions
      addToWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.find((i) => i.id === product.id);
          if (exists) return state;
          return {
            wishlist: [
              ...state.wishlist,
              {
                id: product.id,
                sku: product.sku,
                name: product.name,
                price_kes: product.price_kes,
                image_url: product.image_url,
                added_at: new Date().toISOString(),
              },
            ],
          };
        });
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter((i) => i.id !== productId),
        }));
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.some((i) => i.id === productId);
      },
      
      clearWishlist: () => set({ wishlist: [] }),
      
      moveToCart: (productId) => {
        const item = get().wishlist.find((i) => i.id === productId);
        if (item) {
          get().addItem({
            id: item.id,
            sku: item.sku,
            name: item.name,
            price: item.price_kes,
            quantity: 1,
            image: item.image_url,
          });
          get().removeFromWishlist(productId);
        }
      },
      
      // Get total items count
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      // Get total price
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      
      // Get cart ID
      getCartId: () => {
        // In a real implementation, this would be stored and retrieved
        return generateCartId();
      },
      
      // Get wishlist count
      getWishlistCount: () => {
        return get().wishlist.length;
      },
    }),
    {
      name: "tamtech-cart",
      storage: createJSONStorage(() => localStorage),
      // Only persist items and services, not UI state
      partialize: (state) => ({
        items: state.items,
        services: state.services,
        wishlist: state.wishlist,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setIsHydrated(true);
        }
      },
    }
  )
);
