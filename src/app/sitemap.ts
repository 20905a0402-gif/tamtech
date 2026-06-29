import type { MetadataRoute } from "next";
import { getAllProducts, getAllServices } from "@/lib/data";
import { NAVIGATION } from "@/lib/design-tokens";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tamtechtools.com";

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/shop`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/shop/ev-bikes`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/shop/building-materials`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/shop/tools`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  // Dynamic product pages
  const products = await getAllProducts();
  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
    images: product.image_url ? [product.image_url] : undefined,
  }));

  // Dynamic service pages (if they exist as individual pages)
  const services = await getAllServices();
  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
    images: service.image_url ? [service.image_url] : undefined,
  }));

  // Category pages from navigation
  const categoryPages = NAVIGATION.shop.categories.flatMap((cat) => [
    { url: `${baseUrl}${cat.href}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    ...cat.subItems.map((sub) => ({
      url: `${baseUrl}${sub.href}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ]);

  return [...staticPages, ...productPages, ...servicePages, ...categoryPages];
}
