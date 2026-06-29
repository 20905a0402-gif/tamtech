import { buildShopUrl } from "./shop-filters";
import { PRODUCT_IMAGES, SERVICE_IMAGES } from "./media-assets";

export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export const SERVICE_NAV_ITEMS: NavDropdownItem[] = [
  { label: "Aluminum Doors and Windows", href: "/services#aluminium" },
  { label: "Kitchens and Wardrobes", href: "/services#kitchen" },
  { label: "Shower Cubicles and Enclosures", href: "/services#shower" },
  { label: "SS Railings & Balustrades", href: "/services#railing" },
  { label: "Solar", href: "/services#solar" },
  { label: "Wood and PVC Doors", href: "/services#wood-pvc-doors" },
];

export const MAIN_NAVIGATION: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Profile", href: "/about" },
  {
    label: "EV Bike",
    href: buildShopUrl("EV"),
    dropdown: [
      { label: "Bikes", href: buildShopUrl("EV", "Bikes") },
      { label: "Spares", href: buildShopUrl("EV", "Spares") },
      {
        label: "Swapping Stations",
        href: buildShopUrl("EV", "Swapping Stations"),
      },
    ],
  },
  {
    label: "Building Materials",
    href: buildShopUrl("Materials"),
    dropdown: [
      { label: "Aluminum", href: buildShopUrl("Materials", "Aluminum") },
      { label: "Glass", href: buildShopUrl("Materials", "Glass") },
      { label: "Wood", href: buildShopUrl("Materials", "Wood") },
      {
        label: "Stainless Steel",
        href: buildShopUrl("Materials", "Stainless Steel"),
      },
      { label: "PVC/WPVC", href: buildShopUrl("Materials", "PVC/WPVC") },
    ],
  },
  {
    label: "Tools",
    href: buildShopUrl("Tools"),
    dropdown: [
      { label: "Hand", href: buildShopUrl("Tools", "Hand") },
      { label: "Power", href: buildShopUrl("Tools", "Power") },
      { label: "Bench", href: buildShopUrl("Tools", "Bench") },
      { label: "Cordless", href: buildShopUrl("Tools", "Cordless") },
    ],
  },
  {
    label: "Services",
    href: "/services",
    dropdown: SERVICE_NAV_ITEMS,
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export const HOME_CATEGORIES = [
  {
    tag: "Best Sellers",
    title: "Power Tools",
    description:
      "Professional drills, grinders, saws and more from Emtop — trusted quality for every job site.",
    href: buildShopUrl("Tools", "Power"),
    image: PRODUCT_IMAGES.tools,
    gradient: "from-gray-900 via-gray-800 to-gray-900",
  },
  {
    tag: "Eco Mobility",
    title: "EV Bikes",
    description:
      "Spiro electric bikes with GPS tracking, spares, and battery swapping stations across Kenya.",
    href: buildShopUrl("EV"),
    image: PRODUCT_IMAGES.evBike,
    gradient: "from-[#0D98BA] to-[#0B7A94]",
  },
  {
    tag: "Construction",
    title: "Building Materials",
    description:
      "Aluminum, glass, wood, stainless steel, and PVC/WPVC for every build.",
    href: buildShopUrl("Materials"),
    image: PRODUCT_IMAGES.buildingMaterials,
    gradient: "from-stone-800 to-stone-950",
  },
] as const;

export const HOME_SERVICES = [
  {
    tag: "Fabrication",
    title: "Aluminum Doors and Windows",
    description:
      "Custom aluminium frames with powder-coat finish and professional installation.",
    href: "/services#aluminium",
    quoteHref: "/services#quote-form",
    image: SERVICE_IMAGES.aluminium,
    gradient: "from-slate-800 to-slate-950",
  },
  {
    tag: "Interiors",
    title: "Kitchens and Wardrobes",
    description:
      "Modular kitchen cabinets and wardrobes designed, built, and fitted to spec.",
    href: "/services#kitchen",
    quoteHref: "/services#quote-form",
    image: SERVICE_IMAGES.kitchen,
    gradient: "from-amber-900 to-amber-950",
  },
  {
    tag: "Bathrooms",
    title: "Shower Cubicles and Enclosures",
    description:
      "Tempered glass shower enclosures in framed, semi-framed, and frameless designs.",
    href: "/services#shower",
    quoteHref: "/services#quote-form",
    image: SERVICE_IMAGES.shower,
    gradient: "from-cyan-900 to-teal-950",
  },
  {
    tag: "Railings",
    title: "SS Railings & Balustrades",
    description:
      "Marine-grade stainless steel railings for balconies, stairs, and terraces.",
    href: "/services#railing",
    quoteHref: "/services#quote-form",
    image: SERVICE_IMAGES.railing,
    gradient: "from-zinc-800 to-zinc-950",
  },
  {
    tag: "Renewable",
    title: "Solar",
    description:
      "Jinko Solar panel supply and installation for homes and commercial properties.",
    href: "/services#solar",
    quoteHref: "/services#quote-form",
    image: SERVICE_IMAGES.solar,
    gradient: "from-orange-900 to-amber-950",
  },
  {
    tag: "Doors",
    title: "Wood and PVC Doors",
    description:
      "Durable wood and PVC/WPVC doors crafted for security, style, and longevity.",
    href: "/services#wood-pvc-doors",
    quoteHref: "/services#quote-form",
    image: SERVICE_IMAGES.woodPvc,
    gradient: "from-stone-700 to-stone-900",
  },
] as const;
