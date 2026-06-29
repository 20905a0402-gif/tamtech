"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, ShoppingBag, ArrowRight, Mail } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { clearCheckoutPending } from "@/components/CheckoutReturnHandler";
import { COMPANY_INFO } from "@/lib/design-tokens";

export default function OrderSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCheckoutPending();
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#E8ECF0] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-gray-100 px-6 py-10 sm:px-8 sm:py-12 text-center">
        {/* Success icon */}
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#0D98BA]/10 blur-md scale-125" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#0D98BA] to-[#25D366] shadow-md">
            <svg
              className="h-9 w-9 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-6" />
            </svg>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Order Placed Successfully!
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">
          Thank you. Your cart details were sent through WhatsApp and our team
          will confirm your order.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#EEF0F8] text-gray-800 font-semibold text-sm hover:bg-[#e4e7f4] transition-colors border border-gray-200"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            href="/shop"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0D98BA] to-[#25D366] text-white font-semibold text-sm shadow-md hover:opacity-95 transition-opacity"
          >
            <ShoppingBag className="h-4 w-4" />
            Shop
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#0D98BA]">
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="inline-flex items-center gap-1 hover:underline"
          >
            <Mail className="h-3.5 w-3.5" />
            {COMPANY_INFO.email}
          </a>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <a
            href={`tel:${COMPANY_INFO.phones.tollFree}`}
            className="hover:underline"
          >
            Toll Free :- {COMPANY_INFO.phones.tollFree}
          </a>
        </div>
      </div>
    </div>
  );
}
