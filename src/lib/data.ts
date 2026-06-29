"use server";

import { getBrowserClient } from "./supabase";
import type { Product, Service } from "@/store/useCartStore";

/**
 * Fetch all active products from Supabase
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const supabase = getBrowserClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching products:", error);
      return [];
    }

    return (data || []) as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

/**
 * Fetch products by category
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const supabase = getBrowserClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching products by category:", error);
      return [];
    }

    return (data || []) as Product[];
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return [];
  }
}

/**
 * Fetch a single product by slug
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

    if (error) {
      console.error("Error fetching product:", error);
      return null;
    }

    return data as Product;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

/**
 * Search products by name/description
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const supabase = getBrowserClient();
    
    // Try full-text search first
    const { data: rpcData, error: rpcError } = await supabase
      .rpc("search_products", { search_query: query } as unknown as undefined);

    if (!rpcError && rpcData) {
      return rpcData as Product[];
    }

    // Fallback to ILIKE search
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .eq("is_active", true)
      .order("name", { ascending: true })
      .limit(20);

    if (error) {
      console.error("Error searching products:", error);
      return [];
    }

    return (data || []) as Product[];
  } catch (error) {
    console.error("Failed to search products:", error);
    return [];
  }
}

/**
 * Fetch featured products
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

    if (error) {
      console.error("Error fetching featured products:", error);
      return [];
    }

    return (data || []) as Product[];
  } catch (error) {
    console.error("Failed to fetch featured products:", error);
    return [];
  }
}

/**
 * Fetch all services
 */
export async function getAllServices(): Promise<Service[]> {
  try {
    const supabase = getBrowserClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching services:", error);
      return [];
    }

    return (data || []) as Service[];
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

/**
 * Fetch service by slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const supabase = getBrowserClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error("Error fetching service:", error);
      return null;
    }

    return data as Service;
  } catch (error) {
    console.error("Failed to fetch service:", error);
    return null;
  }
}
