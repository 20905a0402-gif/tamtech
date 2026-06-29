import { createClient } from "@supabase/supabase-js";
import { SUPABASE_CONFIG } from "./design-tokens";

// Types for the database schema
export type Database = {
  public: {
    Tables: {
      product_categories: {
        Row: {
          id: string;
          parent_id: string | null;
          slug: string;
          name: string;
          description: string | null;
          created_at: string;
        };
        Insert: Omit<Tables["product_categories"]["Row"], "id" | "created_at">;
        Update: Partial<Tables["product_categories"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          category_id: string;
          sku: string;
          brand: string;
          title: string;
          base_price: number;
          inventory_count: number;
          is_active: boolean;
          specs: Record<string, string | number | boolean>;
          updated_at: string;
          created_at: string;
        };
        Insert: Omit<Tables["products"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Tables["products"]["Insert"]>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

type Tables = Database["public"]["Tables"];

// Create Supabase client for browser usage
export const createBrowserClient = () => {
  return createClient<Database>(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }
  );
};

// Create Supabase client for server usage (with service role if needed)
export const createServerClient = () => {
  return createClient<Database>(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey,
    {
      auth: {
        persistSession: false,
      },
    }
  );
};

// Singleton instance for client-side usage
let browserClientInstance: ReturnType<typeof createBrowserClient> | null = null;

export const getBrowserClient = () => {
  if (!browserClientInstance) {
    browserClientInstance = createBrowserClient();
  }
  return browserClientInstance;
};

// Type exports
export type Product = Tables["products"]["Row"];
export type ProductCategory = Tables["product_categories"]["Row"];
