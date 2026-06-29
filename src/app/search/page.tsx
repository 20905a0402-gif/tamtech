"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
      <p className="mt-2 text-gray-600">
        {query ? `Searching for "${query}"` : "Enter a search term"}
      </p>
      
      <div className="mt-8 rounded-lg bg-white p-8 shadow-sm text-center">
        <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">
          Search functionality will be implemented with Supabase full-text search.
        </p>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="text-center">
            <div className="animate-pulse h-8 w-48 bg-gray-200 rounded mb-4 mx-auto" />
            <div className="animate-pulse h-4 w-64 bg-gray-200 rounded mx-auto" />
          </div>
        }>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
