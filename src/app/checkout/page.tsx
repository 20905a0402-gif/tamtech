"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  MapPin,
  Zap,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatKES } from "@/lib/format";
import WhatsAppCheckoutButton from "@/components/ui/WhatsAppCheckoutButton";
import {
  PICKUP_LOCATIONS,
  EXPRESS_PICKUP_FEE,
} from "@/lib/pickup-locations";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice } = useCartStore();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [pickupId, setPickupId] = useState(PICKUP_LOCATIONS[0].id);
  const [expressPickup, setExpressPickup] = useState(false);

  const selectedPickup =
    PICKUP_LOCATIONS.find((l) => l.id === pickupId) ?? PICKUP_LOCATIONS[0];
  const itemsTotal = getTotalPrice();
  const expressFee = expressPickup ? EXPRESS_PICKUP_FEE : 0;
  const grandTotal = itemsTotal + expressFee;
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-16 text-center px-4 overflow-x-hidden">
        <h1 className="text-2xl font-bold text-gray-900">No items to checkout</h1>
        <p className="mt-2 text-gray-600">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-flex px-6 py-3 bg-[#0D98BA] text-white font-semibold rounded-xl"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const canCheckout = fullName.trim().length > 0 && /^\d{10}$/.test(phone.trim());

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-6 lg:py-10 pb-10 overflow-x-hidden w-full max-w-[100vw]">
      <div className="mx-auto w-full max-w-6xl px-4 min-w-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-5 lg:gap-6 min-w-0">
          {/* Left column */}
          <div className="space-y-5 min-w-0">
            {/* Order Items */}
            <section className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-gray-100 min-w-0 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-5 w-5 text-[#0D98BA] shrink-0" />
                <h2 className="text-lg font-bold text-gray-900 truncate">
                  Order Items ({totalQty})
                </h2>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-100 bg-gray-50/50 p-3 min-w-0 overflow-hidden"
                  >
                    <div className="flex gap-3 min-w-0">
                      <div className="h-14 w-14 shrink-0 rounded-lg bg-white overflow-hidden border border-gray-100">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs">
                            N/A
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-gray-400 font-medium">
                          PRODUCT
                        </p>
                        <p className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          SKU: {item.sku}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100/80">
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      <div className="text-right">
                        <p className="font-bold text-gray-900 text-sm">
                          Ksh {formatKES(item.price * item.quantity)}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          Ksh {formatKES(item.price)} each
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/cart"
                className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-[#0D98BA] hover:text-[#0B7A94]"
              >
                <ArrowLeft className="h-4 w-4" />
                Edit items in cart
              </Link>
            </section>

            {/* Customer Details */}
            <section className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-gray-100 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Customer Details
              </h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Kamau"
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20"
                    />
                  </div>
                  <div className="min-w-0">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone (10 digits) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                      }
                      placeholder="0712345678"
                      className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20"
                  />
                </div>
                <div className="min-w-0">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Additional note (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special instructions..."
                    className="w-full rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 text-sm focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20 resize-none"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-5 min-w-0">
            {/* Pickup Location */}
            <section className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-gray-100 min-w-0 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-[#0D98BA] shrink-0" />
                <h2 className="text-lg font-bold text-gray-900">Pickup Location</h2>
              </div>

              <div className="relative min-w-0">
                <select
                  value={pickupId}
                  onChange={(e) => setPickupId(e.target.value)}
                  className="w-full appearance-none rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 pr-10 text-sm font-medium text-gray-900 focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20"
                >
                  {PICKUP_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="mt-3 rounded-xl bg-[#E6F4F8]/60 border border-[#0D98BA]/15 p-4 text-sm text-gray-700 space-y-1 break-words">
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {selectedPickup.address}
                </p>
                <p>
                  <span className="font-medium">Toll-free:</span>{" "}
                  {selectedPickup.tollFree}
                </p>
                <p>
                  <span className="font-medium">Hours:</span>{" "}
                  {selectedPickup.hours}
                </p>
              </div>

              <label className="mt-3 flex items-center gap-3 rounded-xl bg-[#E6F4F8]/60 border border-[#0D98BA]/15 p-4 cursor-pointer min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#0D98BA] shrink-0" />
                    <span className="font-semibold text-gray-900 text-sm">
                      Express Pickup
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Priority processing +Ksh {formatKES(EXPRESS_PICKUP_FEE)}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={expressPickup}
                  onChange={(e) => setExpressPickup(e.target.checked)}
                  className="h-5 w-5 shrink-0 rounded border-gray-300 text-[#0D98BA] focus:ring-[#0D98BA]"
                />
              </label>
            </section>

            {/* Order Summary */}
            <section className="rounded-2xl bg-white p-4 sm:p-5 shadow-sm border border-gray-100 min-w-0 overflow-hidden">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4 text-gray-600">
                  <span className="shrink-0">Items ({totalQty})</span>
                  <span className="font-medium text-gray-900 truncate">
                    Ksh {formatKES(itemsTotal)}
                  </span>
                </div>
                {expressPickup && (
                  <div className="flex justify-between gap-4 text-gray-600">
                    <span>Express Pickup</span>
                    <span>Ksh {formatKES(EXPRESS_PICKUP_FEE)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center gap-4 pt-3 border-t border-gray-100">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-[#0D98BA] shrink-0">
                    Ksh {formatKES(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <WhatsAppCheckoutButton
                  label="Checkout on WhatsApp"
                  customerName={fullName}
                  customerPhone={phone}
                  customerEmail={email || undefined}
                  deliveryLocation={selectedPickup.name}
                  additionalNotes={
                    [
                      notes,
                      expressPickup ? "Express Pickup requested" : "",
                    ]
                      .filter(Boolean)
                      .join("\n") || undefined
                  }
                  className={`!rounded-xl !py-4 !bg-gradient-to-r !from-[#0D98BA] !to-[#25D366] !shadow-md ${
                    !canCheckout ? "opacity-50 pointer-events-none" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => router.push("/cart")}
                  className="w-full flex items-center justify-center px-6 py-3 rounded-xl border-2 border-[#E6F4F8] text-[#0D98BA] font-semibold hover:bg-[#E6F4F8]/50 transition-colors"
                >
                  Back
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                By continuing, you will open WhatsApp with a pre-filled order
                summary.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
