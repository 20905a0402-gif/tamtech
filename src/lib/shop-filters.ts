// Shared shop category & sub-category config — mirrors header navigation

export const SHOP_CATEGORIES = [
  { id: "all", name: "All Products", dbValue: null as string | null },
  { id: "EV", name: "EV Bikes", dbValue: "EV" },
  { id: "Materials", name: "Building Materials", dbValue: "Materials" },
  { id: "Tools", name: "Tools", dbValue: "Tools" },
] as const;

export type ShopCategoryId = (typeof SHOP_CATEGORIES)[number]["id"];

export const CATEGORY_URL_MAP: Record<string, ShopCategoryId> = {
  "EV Bikes": "EV",
  "EV Bike": "EV",
  EV: "EV",
  "Building Materials": "Materials",
  Materials: "Materials",
  Tools: "Tools",
};

export interface SubCategoryOption {
  label: string;
  matchTerms: string[];
}

export const SHOP_SUBCATEGORIES: Record<string, SubCategoryOption[]> = {
  EV: [
    { label: "Bikes", matchTerms: ["bike", "e-bike", "spiro", "ekon"] },
    { label: "Spares", matchTerms: ["spare", "parts", "accessory", "accessories"] },
    {
      label: "Swapping Stations",
      matchTerms: ["swapping", "swap", "station", "battery swap"],
    },
  ],
  Materials: [
    { label: "Aluminum", matchTerms: ["aluminum", "aluminium", "alumin"] },
    { label: "Glass", matchTerms: ["glass"] },
    { label: "Wood", matchTerms: ["wood", "timber"] },
    { label: "Stainless Steel", matchTerms: ["stainless", "ss steel", "ss "] },
    { label: "PVC/WPVC", matchTerms: ["pvc", "wpvc", "upvc"] },
  ],
  Tools: [
    { label: "Hand", matchTerms: ["hand"] },
    { label: "Power", matchTerms: ["power"] },
    { label: "Bench", matchTerms: ["bench"] },
    { label: "Cordless", matchTerms: ["cordless"] },
  ],
};

export function resolveCategoryId(param: string | null): ShopCategoryId {
  if (!param) return "all";
  return CATEGORY_URL_MAP[param] ?? "all";
}

export function matchesSubCategory(
  productSubCategory: string | undefined | null,
  subLabel: string,
  categoryId: string
): boolean {
  if (!productSubCategory) return false;
  const options = SHOP_SUBCATEGORIES[categoryId];
  if (!options) return false;
  const option = options.find((o) => o.label === subLabel);
  if (!option) return false;
  const normalized = productSubCategory.toLowerCase();
  return option.matchTerms.some((term) => normalized.includes(term.toLowerCase()));
}

export function buildShopUrl(category?: string, sub?: string): string {
  const params = new URLSearchParams();
  if (category && category !== "all") {
    const cat = SHOP_CATEGORIES.find((c) => c.id === category);
    if (cat) params.set("category", cat.name);
  }
  if (sub) params.set("sub", sub);
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}
