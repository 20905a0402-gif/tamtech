"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { ArrowRight, Check } from "lucide-react";
import WhatsAppLogo from "./WhatsAppLogo";
import { useCartStore } from "@/store/useCartStore";
import { generateWhatsAppPayload } from "@/lib/whatsapp-formatter";
import { markCheckoutPending } from "@/components/CheckoutReturnHandler";

interface WhatsAppCheckoutButtonProps {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryLocation?: string;
  additionalNotes?: string;
  className?: string;
  variant?: "primary" | "floating" | "compact";
  label?: string;
}

export default function WhatsAppCheckoutButton({
  customerName,
  customerPhone,
  customerEmail,
  deliveryLocation,
  additionalNotes,
  className = "",
  variant = "primary",
  label = "Checkout via WhatsApp",
}: WhatsAppCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  
  const items = useCartStore((state) => state.items);
  const services = useCartStore((state) => state.services);
  const getCartId = useCartStore((state) => state.getCartId);

  const handleCheckout = useCallback(async () => {
    // Check online status
    if (typeof window !== "undefined" && !window.navigator.onLine) {
      setIsOffline(true);
      
      // Store cart data for later
      const cartData = {
        items,
        services,
        timestamp: Date.now(),
        customerName,
        customerPhone,
        customerEmail,
        deliveryLocation,
        additionalNotes,
      };
      localStorage.setItem("tamtech-pending-cart", JSON.stringify(cartData));
      
      toast.error("Connection paused", {
        description: "We have saved your inquiry and will connect you to WhatsApp once your signal returns.",
        duration: 5000,
        icon: <ArrowRight className="h-4 w-4" />,
      });
      
      return;
    }

    setIsOffline(false);

    if (items.length === 0 && services.length === 0) {
      toast.error("Your cart is empty", {
        description: "Please add products or services before checking out.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const cartId = getCartId();
      const payload = generateWhatsAppPayload({
        items,
        services,
        cartId,
        customerName,
        customerPhone,
        customerEmail,
        deliveryLocation,
        additionalNotes,
      });

      if (payload.isTruncated) {
        toast.warning("Large order detected", {
          description: "Your order details have been summarized. Full details will be sent to our sales team.",
          duration: 4000,
        });
      }

      // Open WhatsApp in new tab
      markCheckoutPending();
      window.open(payload.url, "_blank");
      
      toast.success("Opening WhatsApp...", {
        description: "Continue your inquiry with our sales team.",
        duration: 3000,
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    items,
    services,
    getCartId,
    customerName,
    customerPhone,
    customerEmail,
    deliveryLocation,
    additionalNotes,
  ]);

  // Variant styles
  const variantStyles = {
    primary: `w-full flex items-center justify-center gap-2 px-6 py-3 
      bg-[#8AC926] hover:bg-[#6FA11E] text-white font-semibold rounded-lg
      shadow-md hover:shadow-lg transition-all duration-200`,
    floating: `fixed bottom-24 right-4 z-[1600] md:hidden
      flex items-center justify-center h-14 w-14 rounded-full 
      bg-[#8AC926] hover:bg-[#6FA11E] shadow-lg hover:shadow-xl
      active:scale-95 transition-all duration-200`,
    compact: `flex items-center justify-center gap-1.5 px-4 py-2 
      bg-[#8AC926] hover:bg-[#6FA11E] text-white text-sm font-medium rounded-md
      transition-all duration-200`,
  };

  const isDisabled = isLoading || (items.length === 0 && services.length === 0);

  if (variant === "floating") {
    return (
      <button
        onClick={handleCheckout}
        disabled={isDisabled}
        className={`${variantStyles[variant]} ${className} ${
          isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Checkout via WhatsApp"
      >
        {isLoading ? (
          <ArrowRight className="h-6 w-6 animate-spin" />
        ) : (
          <>
            <WhatsAppLogo size={20} className="text-white" />
            {/* Online indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8AC926] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8AC926]"></span>
            </span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={isDisabled}
      className={`${variantStyles[variant]} ${className} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      } ${isOffline ? "bg-gray-500 hover:bg-gray-600" : ""}`}
    >
      {isLoading ? (
        <>
          <ArrowRight className="h-5 w-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <WhatsAppLogo size={20} className="text-white" />
          <span>
            {isOffline 
              ? "Waiting for connection..." 
              : items.length > 0 || services.length > 0
                ? label
                : "Cart is empty"
            }
          </span>
        </>
      )}
    </button>
  );
}
