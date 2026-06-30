"use client";

import { Suspense, useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Heart, X, ArrowUpDown } from "lucide-react";
import { useCartStore, Product } from "@/store/useCartStore";
import { useShopNavStore } from "@/store/useShopNavStore";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";
import { whatsappLink } from "@/lib/whatsapp-inquiry";
import { getAllProducts } from "@/lib/data";
import { formatKES } from "@/lib/format";
import PageHero from "@/components/ui/PageHero";
import { useSearchParams, useRouter } from "next/navigation";
import {
  SHOP_CATEGORIES,
  SHOP_SUBCATEGORIES,
  resolveCategoryId,
  matchesSubCategory,
  buildShopUrl,
  isComingSoonCategory,
  type ShopCategoryId,
} from "@/lib/shop-filters";
import ShopComingSoon from "@/components/shop/ShopComingSoon";

const CATEGORIES = SHOP_CATEGORIES.map((c) => ({
  id: c.id,
  name: c.name,
}));

type SortOption = "default" | "price-low" | "price-high" | "name";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const subParam = searchParams.get("sub");
  const searchParam = searchParams.get("search");

  const [selectedCategory, setSelectedCategory] = useState<ShopCategoryId>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number | null }>({ min: 0, max: null });
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);

  const { addItem, addToWishlist, removeFromWishlist, isInWishlist } = useCartStore();
  const registerHandlers = useShopNavStore((s) => s.registerHandlers);
  const unregisterHandlers = useShopNavStore((s) => s.unregisterHandlers);

  const openFilters = useCallback(() => setIsFilterSheetOpen(true), []);
  const openSort = useCallback(() => setIsSortSheetOpen(true), []);
  const showComingSoon = isComingSoonCategory(selectedCategory);
  const activeCategoryName =
    CATEGORIES.find((c) => c.id === selectedCategory)?.name ?? "Shop";

  useEffect(() => {
    if (showComingSoon) return;
    registerHandlers(openFilters, openSort);
    return () => unregisterHandlers();
  }, [registerHandlers, unregisterHandlers, openFilters, openSort, showComingSoon]);

  // Sync filters from URL (header navigation & deep links)
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(resolveCategoryId(categoryParam));
    } else {
      setSelectedCategory("all");
    }
    setSelectedSubCategory(subParam || null);
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [categoryParam, subParam, searchParam]);

  // Fetch products from Supabase
  useEffect(() => {
    if (showComingSoon) {
      setIsLoading(false);
      return;
    }

    async function fetchProducts() {
      try {
        setIsLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [showComingSoon]);

  // Calculate max price for range filter
  const maxProductPrice = useMemo(() => {
    return products.length > 0 ? Math.max(...products.map(p => p.price_kes)) : 1000000;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSubCategoryFilter =
        !selectedSubCategory ||
        matchesSubCategory(
          product.sub_category,
          selectedSubCategory,
          selectedCategory
        ) ||
        product.sub_category?.toLowerCase() ===
          selectedSubCategory.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price_kes >= priceRange.min && 
                          (priceRange.max === null || product.price_kes <= priceRange.max);
      return (
        matchesCategory &&
        matchesSubCategoryFilter &&
        matchesSearch &&
        matchesPrice
      );
    });

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price_kes - b.price_kes);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price_kes - a.price_kes);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep default order
        break;
    }

    return filtered;
  }, [products, selectedCategory, selectedSubCategory, searchQuery, priceRange, sortBy]);

  const handleCategoryChange = (categoryId: ShopCategoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    router.push(buildShopUrl(categoryId === "all" ? undefined : categoryId), {
      scroll: false,
    });
  };

  const handleSubCategoryChange = (sub: string | null) => {
    setSelectedSubCategory(sub);
    router.push(
      buildShopUrl(
        selectedCategory === "all" ? undefined : selectedCategory,
        sub ?? undefined
      ),
      { scroll: false }
    );
  };

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleWhatsAppClick = (product: Product) => {
    const url = whatsappLink({
      item: product,
      type: "product",
      currentUrl: typeof window !== "undefined" ? window.location.href : "",
    });
    window.open(url, "_blank");
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSubCategory(null);
    setPriceRange({ min: 0, max: null });
    setSearchQuery("");
    router.push("/shop", { scroll: false });
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedSubCategory || priceRange.min > 0 || priceRange.max !== null || searchQuery;

  const filterPanel = (
    <>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 text-sm">Filters</h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="mb-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D98BA] mb-2.5">
          Category
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((category) => (
            <label
              key={category.id}
              className={`flex items-center gap-2.5 cursor-pointer group rounded-md px-2 py-2 transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#E6F4F8]"
                  : "hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="w-4 h-4 text-[#0D98BA] border-gray-300 focus:ring-[#0D98BA]"
              />
              <span
                className={`text-sm leading-snug ${selectedCategory === category.id ? "text-[#0D98BA] font-medium" : "text-gray-700"}`}
              >
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {selectedCategory !== "all" && SHOP_SUBCATEGORIES[selectedCategory] && (
        <div className="mb-4 pt-3 border-t border-gray-100">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
            Sub-category
          </h4>
          <div className="space-y-0.5">
            <label className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5 hover:bg-[#F0F9E4]/50">
              <input
                type="radio"
                name="subcategory"
                checked={!selectedSubCategory}
                onChange={() => handleSubCategoryChange(null)}
                className="w-3.5 h-3.5 text-[#8AC926] border-gray-300 focus:ring-[#8AC926]"
              />
              <span
                className={`text-xs ${!selectedSubCategory ? "text-[#8AC926] font-semibold" : "text-gray-700"}`}
              >
                All
              </span>
            </label>
            {SHOP_SUBCATEGORIES[selectedCategory].map((sub) => (
              <label
                key={sub.label}
                className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1.5 hover:bg-[#F0F9E4]/50"
              >
                <input
                  type="radio"
                  name="subcategory-mobile"
                  checked={selectedSubCategory === sub.label}
                  onChange={() => handleSubCategoryChange(sub.label)}
                  className="w-3.5 h-3.5 text-[#8AC926] border-gray-300 focus:ring-[#8AC926]"
                />
                <span
                  className={`text-xs ${selectedSubCategory === sub.label ? "text-[#8AC926] font-semibold" : "text-gray-700"}`}
                >
                  {sub.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-gray-100">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
          Price (KES)
        </h4>
        <div className="space-y-2">
          <div className="flex gap-1.5 items-center">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min || ""}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  min: Number(e.target.value) || 0,
                }))
              }
              className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-xs focus:border-[#0D98BA] focus:outline-none"
            />
            <span className="text-gray-400 text-xs">–</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max || ""}
              onChange={(e) =>
                setPriceRange((prev) => ({
                  ...prev,
                  max: e.target.value ? Number(e.target.value) : null,
                }))
              }
              className="w-full px-2 py-1.5 border border-gray-200 rounded-md text-xs focus:border-[#0D98BA] focus:outline-none"
            />
          </div>
          <input
            type="range"
            min="0"
            max={maxProductPrice}
            step="1000"
            value={priceRange.max || maxProductPrice}
            onChange={(e) =>
              setPriceRange((prev) => ({
                ...prev,
                max: Number(e.target.value),
              }))
            }
            className="w-full accent-[#0D98BA] h-1"
          />
          <div className="flex justify-between text-[10px] text-gray-500">
            <span>0</span>
            <span>{formatKES(maxProductPrice)}</span>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero
        variant="compact"
        title={
          selectedCategory === "all"
            ? "Shop All Products"
            : activeCategoryName
        }
        subtitle={
          showComingSoon
            ? "New arrivals landing very soon"
            : "Quality tools, materials, and EV solutions"
        }
      />

      {showComingSoon ? (
        <ShopComingSoon categoryName={activeCategoryName} />
      ) : (
      <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16 py-6 lg:py-8 overflow-x-hidden">
        {/* Toolbar — search only on mobile; sort on desktop */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm focus:border-[#0D98BA] focus:outline-none focus:ring-1 focus:ring-[#0D98BA]/20"
            />
          </div>

          <div className="hidden lg:flex gap-2 shrink-0">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-auto appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2.5 pr-9 text-sm focus:border-[#0D98BA] focus:outline-none cursor-pointer"
              >
                <option value="default">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <ArrowUpDown className="absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">Active Filters:</span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#0D98BA]/10 text-[#0D98BA] rounded-full text-sm">
                {CATEGORIES.find(c => c.id === selectedCategory)?.name}
                <button onClick={() => handleCategoryChange("all")} className="hover:text-[#0B7A94]">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedSubCategory && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#8AC926]/10 text-[#8AC926] rounded-full text-sm">
                {selectedSubCategory}
                <button onClick={() => handleSubCategoryChange(null)} className="hover:text-[#6FA01E]">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {(priceRange.min > 0 || priceRange.max !== null) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Price: KES {formatKES(priceRange.min)} - {priceRange.max ? formatKES(priceRange.max) : "Max"}
                <button onClick={() => setPriceRange({ min: 0, max: null })} className="hover:text-gray-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery("")} className="hover:text-gray-900">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button 
              onClick={clearFilters}
              className="text-sm text-red-500 hover:text-red-700 underline"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-10">
          {/* Sidebar Filters — desktop only */}
          <aside className="hidden lg:block w-full lg:w-56 xl:w-60 2xl:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 xl:p-5 sticky top-[108px] max-h-[calc(100vh-120px)] overflow-y-auto">
              {filterPanel}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs sm:text-sm text-gray-600">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-5 xl:gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm p-3 animate-pulse"
                  >
                    <div className="aspect-square bg-gray-200 rounded-md mb-3" />
                    <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
                    <div className="h-8 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-[#0D98BA] text-white rounded-lg hover:bg-[#0B7A94]"
                >
                  Retry
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No products found matching your criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-[#0D98BA] text-white rounded-lg hover:bg-[#0B7A94]"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-5 xl:gap-6">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
                  >
                    <Link
                      href={`/product/${product.slug}`}
                      className="block relative aspect-square bg-gray-50"
                    >
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                          <ShoppingCart className="h-10 w-10" />
                        </div>
                      )}
                      <button
                        onClick={(e) => handleWishlistToggle(e, product)}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow z-10"
                      >
                        <Heart
                          className={`h-3.5 w-3.5 transition-colors ${
                            isInWishlist(product.id)
                              ? "fill-red-500 text-red-500"
                              : "text-gray-400 hover:text-red-400"
                          }`}
                        />
                      </button>
                    </Link>

                    <div className="p-3">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-medium text-gray-900 group-hover:text-[#0D98BA] transition-colors line-clamp-2 text-sm leading-snug min-h-[2.5rem]">
                          {product.name}
                        </h3>
                      </Link>
                      {product.sub_category && (
                        <p className="text-[11px] text-gray-500 mt-0.5 truncate">
                          {product.sub_category}
                        </p>
                      )}
                      <p className="text-sm sm:text-base font-bold text-[#0D98BA] mt-1.5">
                        KES {formatKES(product.price_kes)}
                      </p>

                      <div className="flex gap-1.5 mt-2.5">
                        <button
                          onClick={() =>
                            addItem({
                              id: product.id,
                              sku: product.sku,
                              name: product.name,
                              price: product.price_kes,
                              quantity: 1,
                              image: product.image_url,
                            })
                          }
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-2 bg-[#8AC926] text-white text-xs font-medium rounded-md hover:bg-[#6FA01E] transition-colors"
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Add
                        </button>
                        <button
                          onClick={() => handleWhatsAppClick(product)}
                          className="flex items-center justify-center px-2.5 py-2 bg-[#8AC926] text-white rounded-md hover:bg-[#6FA01E] transition-colors"
                          title="Inquire on WhatsApp"
                        >
                          <WhatsAppLogo size={14} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Mobile filter & sort sheets */}
      {!showComingSoon && (
      <>
      <AnimatePresence>
        {isFilterSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1550] bg-black/40 lg:hidden"
              onClick={() => setIsFilterSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-[1551] bg-white rounded-t-2xl lg:hidden shadow-2xl max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 shrink-0">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  type="button"
                  onClick={() => setIsFilterSheetOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="overflow-y-auto px-5 py-4 flex-1">{filterPanel}</div>
              <div className="px-5 pb-8 pt-3 border-t border-gray-100 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsFilterSheetOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#0D98BA] text-white font-semibold text-sm hover:bg-[#0B7A94] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile sort sheet */}
      <AnimatePresence>
        {isSortSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[1550] bg-black/40 lg:hidden"
              onClick={() => setIsSortSheetOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-[1551] bg-white rounded-t-2xl p-5 pb-8 lg:hidden shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Sort By</h3>
                <button
                  type="button"
                  onClick={() => setIsSortSheetOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-1">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSortBy(opt.value);
                      setIsSortSheetOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      sortBy === opt.value
                        ? "bg-[#E6F4F8] text-[#0D98BA]"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </>
      )}
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FAFAFA] py-8">
          <motion.div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-pulse">
            <div className="h-10 w-48 bg-gray-200 rounded mb-4" />
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-xl p-4 h-80" />
              ))}
            </motion.div>
          </motion.div>
        </main>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
