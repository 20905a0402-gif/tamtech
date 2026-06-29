# Connecting to Supabase API - Implementation Guide

## Step 1: Verify Supabase Schema is Deployed

Before connecting, ensure your SQL schema has been executed in Supabase:

1. Go to https://supabase.com/dashboard
2. Select your project: `syktgnhsjspjbuihnvbs`
3. Open **SQL Editor** → Click **"New Query"**
4. Paste the contents of `supabase/schema.sql`
5. Click **Run**
6. Verify tables exist: Go to **Table Editor** → Should see `products` and `services`

## Step 2: Supabase Client Configuration (Already Done)

Your Supabase client is already configured in:
- `src/lib/supabase.ts` - Client utilities
- `src/lib/design-tokens.ts` - Contains your Supabase URL and anon key

## Step 3: Data Fetching Utilities

I've created `src/lib/data.ts` with these functions:

```typescript
// Fetch all products
const products = await getAllProducts();

// Fetch products by category
const tools = await getProductsByCategory("Tools");

// Fetch single product
const product = await getProductBySlug("makita-cordless-drill-18v");

// Search products
const results = await searchProducts("drill");

// Fetch featured products
const featured = await getFeaturedProducts(6);
```

## Step 4: Updated Shop Page

The `/shop` page now:
- Fetches real products from Supabase on load
- Shows loading skeleton while fetching
- Handles errors gracefully
- Still supports category/sub-category filtering (client-side on fetched data)

## Step 5: Updated Product Detail Page

The `/product/[slug]` page now:
- Fetches the specific product from Supabase
- Shows "Product not found" if slug doesn't exist
- Displays real specs, price, inventory from database

## Important Notes

1. **Row Level Security (RLS)**: Your schema has RLS policies allowing public read access to active products
2. **No API Key Needed**: The anon key in `design-tokens.ts` is safe for client-side use (it's a public key)
3. **Images**: You'll need to upload product images to Supabase Storage or use external URLs in the `image_url` column
4. **Caching**: The data fetching includes basic caching. For production, consider React Query or SWR

## Testing the Connection

1. Start dev server: `npm run dev`
2. Visit http://localhost:3000/shop
3. Check browser console for any errors
4. Verify products from your Supabase database are displayed

## Troubleshooting

**No products showing?**
- Check browser console for errors
- Verify Supabase URL and anon key in `design-tokens.ts`
- Ensure RLS policies are enabled in Supabase
- Check that products have `is_active = true`

**CORS errors?**
- Supabase handles CORS automatically for allowed origins
- Your site domain must be added to Supabase allowed origins in Settings → API

**Empty results?**
- Run `SELECT * FROM products;` in Supabase SQL Editor to verify data exists
- Check that `is_active` is `true` for your products
