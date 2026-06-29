"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { formatKES } from "@/lib/format";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const total = getTotalPrice();
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-12 lg:py-16">
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6 text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Your Cart is Empty</h1>
          <p className="mt-2 text-gray-600">Add some products to get started.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#0D98BA] text-white font-semibold rounded-xl hover:bg-[#0B7A94] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 lg:py-12 pb-32 lg:pb-12">
      <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
          Shopping Cart
        </h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 sm:gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100"
            >
              <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl bg-gray-50 overflow-hidden border border-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{item.sku}</p>
                <p className="text-sm sm:text-base font-bold text-gray-900 mt-1">
                  Ksh {formatKES(item.price)}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#E6F4F8] text-[#0D98BA] hover:bg-[#d0eaf2] transition-colors font-medium"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="h-8 min-w-[2rem] flex items-center justify-center rounded-lg bg-[#E6F4F8] text-sm font-semibold text-gray-900 px-1">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#E6F4F8] text-[#0D98BA] hover:bg-[#d0eaf2] transition-colors font-medium"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-gray-100">
          <div className="text-right">
            <p className="text-sm text-gray-500">Estimated Total</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              Ksh {formatKES(total)}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {totalItems} item{totalItems !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-end">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#E6F4F8] text-[#0D98BA] font-semibold hover:bg-[#d0eaf2] transition-colors text-sm sm:text-base"
            >
              Continue shopping
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#0D98BA] to-[#25D366] text-white font-semibold hover:opacity-95 transition-opacity shadow-md text-sm sm:text-base"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
