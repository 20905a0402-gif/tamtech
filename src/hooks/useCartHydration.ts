"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { getBrowserClient, Product } from "@/lib/supabase";

// Hook to handle cart hydration with fresh data from Supabase
export function useCartHydration() {
  useEffect(() => {
    const hydrateCart = async () => {
      const currentItems = useCartStore.getState().items;
      if (currentItems.length === 0) {
        useCartStore.getState().setIsHydrated(true);
        return;
      }

      try {
        const supabase = getBrowserClient();
        
        // Extract SKUs from cart items
        const skus = currentItems.map((item) => item.sku);

        // Fetch fresh product data from Supabase
        const { data: products, error } = await supabase
          .from("products")
          .select("id, sku, base_price, inventory_count, is_active")
          .in("sku", skus);

        if (error) {
          console.error("Error hydrating cart:", error);
          useCartStore.getState().setIsHydrated(true);
          return;
        }

        // Create a map for quick lookup
        const productMap = new Map(
          products?.map((p: Product) => [p.sku, p]) || []
        );

        // Update cart items with fresh data
        useCartStore.setState((state) => ({
          items: state.items.map((item) => {
            const freshData = productMap.get(item.sku);
            
            if (!freshData) {
              // Product no longer exists, mark as unavailable
              return { ...item, unavailable: true };
            }

            if (!freshData.is_active) {
              // Product is inactive
              return { ...item, unavailable: true, inactive: true };
            }

            if (freshData.inventory_count < item.quantity) {
              // Stock has decreased
              return {
                ...item,
                price: freshData.base_price,
                stockLimited: true,
                maxStock: freshData.inventory_count,
              };
            }

            // Update price if changed
            return {
              ...item,
              price: freshData.base_price,
            };
          }),
          isHydrated: true,
        }));
      } catch (error) {
        console.error("Cart hydration failed:", error);
        useCartStore.getState().setIsHydrated(true);
      }
    };

    hydrateCart();
  }, []);

  return useCartStore((state) => state.isHydrated);
}
