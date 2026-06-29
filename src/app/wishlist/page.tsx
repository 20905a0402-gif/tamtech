"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart, isInWishlist } = useCartStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] py-16">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16 text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Your Wishlist is Empty</h1>
          <p className="mt-2 text-gray-600">Save items you love for later.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#0D98BA] text-white font-semibold rounded-lg hover:bg-[#0B7A94] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16">
      <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="mt-1 text-gray-600">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[#0D98BA] font-medium hover:gap-3 transition-all"
          >
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100">
                {item.image_url ? (
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <ShoppingCart className="h-12 w-12 opacity-20" />
                  </div>
                )}
                
                {/* Remove button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">SKU: {item.sku}</p>
                <p className="text-lg font-bold text-[#0D98BA] mb-4">
                  KES {item.price_kes.toLocaleString()}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => moveToCart(item.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#8AC926] text-white font-medium rounded-lg hover:bg-[#6FA01E] transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <Link
                    href={`/product/${item.id}`}
                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add All to Cart */}
        {wishlist.length > 1 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                wishlist.forEach((item) => moveToCart(item.id));
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D98BA] text-white font-semibold rounded-lg hover:bg-[#0B7A94] transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              Add All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
