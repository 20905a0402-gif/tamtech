"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

const CHECKOUT_PENDING_KEY = "tamtech-checkout-pending";

export function markCheckoutPending() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(CHECKOUT_PENDING_KEY, Date.now().toString());
  }
}

export function clearCheckoutPending() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(CHECKOUT_PENDING_KEY);
  }
}

export default function CheckoutReturnHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    const handleReturn = () => {
      if (pathname === "/order-success") return;

      const pending = sessionStorage.getItem(CHECKOUT_PENDING_KEY);
      if (!pending) return;

      const elapsed = Date.now() - Number(pending);
      // Ignore immediate focus events right after opening WhatsApp
      if (elapsed < 3000) return;
      if (elapsed > 30 * 60 * 1000) {
        clearCheckoutPending();
        return;
      }

      clearCheckoutPending();
      clearCart();
      router.push("/order-success");
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        handleReturn();
      }
    };

    window.addEventListener("focus", handleReturn);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("focus", handleReturn);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname, router, clearCart]);

  return null;
}
