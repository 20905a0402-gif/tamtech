"use client";

import { useState, useCallback, useEffect } from "react";
import { getBrowserClient } from "@/lib/supabase";
import type { Product } from "@/store/useCartStore";

interface SearchResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

/**
 * Fuzzy search hook for products
 * Uses Supabase full-text search and ILIKE matching
 */
export function useProductSearch() {
  const [results, setResults] = useState<SearchResult>({
    products: [],
    isLoading: false,
    error: null,
  });

  /**
   * Search products using Supabase RPC or direct query
   */
  const searchProducts = useCallback(async (query: string): Promise<Product[]> => {
    if (!query.trim()) {
      setResults({ products: [], isLoading: false, error: null });
      return [];
    }

    setResults((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const supabase = getBrowserClient();
      
      // Try using the search function if it exists
      const { data: rpcData, error: rpcError } = await supabase
        .rpc("search_products", { search_query: query } as unknown as undefined);

      if (!rpcError && rpcData) {
        setResults({
          products: rpcData as Product[],
          isLoading: false,
          error: null,
        });
        return rpcData as Product[];
      }

      // Fallback: Direct query with ILIKE
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%,sub_category.ilike.%${query}%`)
        .eq("is_active", true)
        .order("name", { ascending: true })
        .limit(20);

      if (error) {
        throw error;
      }

      setResults({
        products: (data || []) as Product[],
        isLoading: false,
        error: null,
      });

      return (data || []) as Product[];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Search failed";
      setResults({
        products: [],
        isLoading: false,
        error: errorMessage,
      });
      return [];
    }
  }, []);

  return {
    ...results,
    searchProducts,
  };
}

/**
 * Debounced search hook for real-time typing
 */
export function useDebouncedSearch(delay: number = 300) {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, isLoading, error, searchProducts } = useProductSearch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchProducts(searchTerm);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay, searchProducts]);

  return {
    searchTerm,
    setSearchTerm,
    products,
    isLoading,
    error,
  };
}

/**
 * Client-side fuzzy search for cached/local data
 * Uses simple fuzzy matching algorithm
 */
export function fuzzySearch<T extends Record<string, unknown>>(
  items: T[],
  query: string,
  keys: (keyof T)[]
): T[] {
  if (!query.trim()) return items;

  const normalizedQuery = query.toLowerCase().trim();
  const queryWords = normalizedQuery.split(/\s+/);

  return items.filter((item) => {
    const searchableText = keys
      .map((key) => {
        const value = item[key];
        return typeof value === "string" ? value.toLowerCase() : "";
      })
      .join(" ");

    // Check if all query words match somewhere in the text
    return queryWords.every((word) => searchableText.includes(word));
  });
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  try {
    const supabase = getBrowserClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("name", { ascending: true })
      .limit(limit);

    if (error) throw error;
    return (data || []) as Product[];
  } catch {
    return [];
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  category: string,
  limit: number = 20
): Promise<Product[]> {
  try {
    const supabase = getBrowserClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("name", { ascending: true })
      .limit(limit);

    if (error) throw error;
    return (data || []) as Product[];
  } catch {
    return [];
  }
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = getBrowserClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error) throw error;
    return data as Product;
  } catch {
    return null;
  }
}
