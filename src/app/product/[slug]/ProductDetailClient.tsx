"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useCartStore, Product } from "@/store/useCartStore";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";
import { whatsappLink } from "@/lib/whatsapp-inquiry";

// Related products are passed from the server (real catalog data)

interface ProductDetailClientProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetailClient({
  product,
  relatedProducts = [],
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, addToWishlist, isInWishlist } = useCartStore();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price_kes,
      quantity,
      image: product.image_url,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleWhatsAppClick = () => {
    const url = whatsappLink({
      item: product,
      type: "product",
      currentUrl: typeof window !== "undefined" ? window.location.href : "",
    });
    window.open(url, "_blank");
  };

  const images = [1, 2, 3, 4]; // Placeholder for gallery images

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-24 lg:pb-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[#0D98BA]">Home</Link>
            <ChevronLeft className="h-4 w-4 rotate-180" />
            <Link href="/shop" className="hover:text-[#0D98BA]">Shop</Link>
            <ChevronLeft className="h-4 w-4 rotate-180" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <ShoppingCart className="h-24 w-24 opacity-20" />
              </div>
              <button
                onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedImage === i ? "bg-[#0D98BA]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square bg-gray-100 rounded-lg border-2 transition-colors ${
                    selectedImage === i ? "border-[#0D98BA]" : "border-transparent hover:border-gray-200"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShoppingCart className="h-6 w-6 opacity-20" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="px-2 py-1 bg-[#0D98BA]/10 text-[#0D98BA] rounded">{product.category}</span>
                <span>{product.sub_category}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-[#0D98BA]">
                KES {product.price_kes.toLocaleString()}
              </span>
              {product.inventory_count > 0 ? (
                <span className="text-sm text-[#8AC926] font-medium">In Stock ({product.inventory_count} available)</span>
              ) : (
                <span className="text-sm text-red-500 font-medium">Out of Stock</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.inventory_count, quantity + 1))}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons — desktop only */}
            <div className="hidden lg:flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#8AC926] text-white font-semibold rounded-lg hover:bg-[#6FA01E] transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-[#8AC926] text-white font-semibold rounded-lg hover:bg-[#6FA01E] transition-colors"
              >
                <WhatsAppLogo size={20} className="text-white" />
                Inquire
              </button>
            </div>

            {/* Wishlist on mobile — inline above fixed bar */}
            <div className="lg:hidden">
              <button
                onClick={() => addToWishlist(product)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0D98BA]"
              >
                <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                {isInWishlist(product.id) ? "Saved to wishlist" : "Add to wishlist"}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-100">
              {[
                { icon: Truck, label: "Fast Delivery" },
                { icon: Shield, label: "Genuine Product" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center text-center gap-2">
                  <badge.icon className="h-6 w-6 text-[#0D98BA]" />
                  <span className="text-xs text-gray-600">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Specs Table */}
            {product.specs && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key} className="border-b border-gray-100 last:border-0">
                        <td className="py-3 text-sm text-gray-500 capitalize">{key.replace(/_/g, " ")}</td>
                        <td className="py-3 text-sm font-medium text-gray-900 text-right">{String(value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/product/${related.slug}`}
                  className="flex-shrink-0 w-64 group"
                >
                  <div className="bg-gray-100 rounded-xl aspect-square mb-3 overflow-hidden flex items-center justify-center">
                    {related.image_url ? (
                      <img
                        src={related.image_url}
                        alt={related.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <ShoppingCart className="h-12 w-12 text-gray-300" />
                    )}
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-[#0D98BA] transition-colors line-clamp-1">
                    {related.name}
                  </h3>
                  <p className="text-[#0D98BA] font-semibold">
                    KES {related.price_kes.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed mobile action bar — Flipkart style */}
      <div className="fixed bottom-0 left-0 right-0 z-[1500] lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3 safe-area-pb">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-[#0D98BA] text-[#0D98BA] font-semibold text-sm active:bg-[#E6F4F8] transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#0D98BA] to-[#8AC926] text-white font-semibold text-sm shadow-md active:opacity-90 transition-opacity"
          >
            Buy Now
          </button>
        </div>
      </div>
    </main>
  );
}
