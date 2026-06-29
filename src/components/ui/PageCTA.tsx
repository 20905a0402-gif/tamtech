import Link from "next/link";
import { ReactNode } from "react";

interface PageCTAProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export default function PageCTA({ title, subtitle, children }: PageCTAProps) {
  return (
    <section className="relative pt-10 pb-4 lg:pt-16 lg:pb-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#eef2ff] to-[#e0e7ff]" />
      <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />
      <div className="absolute -bottom-16 left-0 h-64 w-64 rounded-full bg-sky-200/50 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-rose-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        {children && (
          <div className="flex flex-wrap justify-center gap-4">{children}</div>
        )}
      </div>
    </section>
  );
}

export function PageCTAButton({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const className =
    variant === "primary"
      ? "inline-flex items-center gap-2 px-8 py-4 bg-[#0D98BA] text-white font-semibold rounded-xl hover:bg-[#0B7A94] transition-all shadow-md hover:shadow-lg"
      : "inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-md border border-gray-200";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
