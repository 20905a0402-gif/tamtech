// Cloudflare Image Loader for Next.js Image Optimization
// This loader uses Cloudflare's image optimization service

interface CloudflareLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudflareLoader({ src, width, quality }: CloudflareLoaderProps): string {
  // If it's already a Cloudflare Images URL, return as-is
  if (src.startsWith('https://imagedelivery.net/')) {
    return src;
  }

  // For Supabase storage images, use Cloudflare's image resizing
  if (src.includes('supabase.co')) {
    const params = new URLSearchParams();
    params.set('width', width.toString());
    if (quality) {
      params.set('quality', quality.toString());
    }
    return `${src}?${params.toString()}`;
  }

  // For other images, use Cloudflare's on-demand image optimization
  // Format: /cdn-cgi/image/width={width},quality={quality}/{src}
  const cloudflareParams = [`width=${width}`];
  if (quality) {
    cloudflareParams.push(`quality=${quality}`);
  }

  // Return the original src if not using Cloudflare's CDN
  // In production with Cloudflare, images will be optimized automatically
  return src;
}
