import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getAllProducts } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

// Generate metadata for each product page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | TAM TECH TOOLS",
      description: "The requested product could not be found. Browse our catalog of quality tools and building materials.",
    };
  }

  const title = `${product.name} in Nairobi | TAM TECH TOOLS`;
  const description = product.description || `Buy ${product.name} at TAM TECH TOOLS in Nairobi. Quality ${product.category} at competitive prices. ${product.sub_category || ""}`;

  return {
    title,
    description,
    keywords: [product.name, product.category, product.sub_category || "", "Nairobi", "Kenya", "tools", "building materials", "TAM TECH"].filter(Boolean),
    openGraph: {
      title,
      description,
      images: product.image_url ? [{ url: product.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image_url ? [product.image_url] : [],
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
  };
}

// Generate static params for all products
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = await getAllProducts();
  const sameCategory = allProducts.filter(
    (p) => p.slug !== slug && p.category === product.category
  );
  const relatedProducts = sameCategory.slice(0, 4);
  if (relatedProducts.length < 4) {
    const used = new Set(relatedProducts.map((p) => p.id));
    const others = allProducts
      .filter((p) => p.slug !== slug && !used.has(p.id))
      .slice(0, 4 - relatedProducts.length);
    relatedProducts.push(...others);
  }

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
