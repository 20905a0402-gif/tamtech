/** Encode local image paths for use in CSS url() or img src */

export function mediaPath(path: string): string {
  return path.replace(/&/g, "%26").replace(/\(/g, "%28").replace(/\)/g, "%29");
}

export const PRODUCT_IMAGES = {
  tools: "/images/products/tools.png",
  evBike: "/images/products/evbike.jpg",
  buildingMaterials: "/images/products/building_metrials.jpg",
  emtopTools: "/images/emtop_tools.jpg",
} as const;

export const SERVICE_IMAGES = {
  aluminium: "/images/services/aluminium_doors&_windows.png",
  kitchen: "/images/services/kitchen_wordrobes.png",
  shower: "/images/services/shower_cubicles.png",
  railing: "/images/services/ss_railing.png",
  solar: "/images/services/solor.png",
  woodPvc: "/images/services/wood&pvc_doors.png",
  works: "/images/services(works).png",
  showroom: "/images/showroom.jpg",
} as const;

export const GALLERY_ITEMS = [
  { id: "g-tools", title: "Emtop Power Tools", category: "products" as const, image: PRODUCT_IMAGES.tools, tag: "Products" },
  { id: "g-ev", title: "Spiro EV Bikes", category: "products" as const, image: PRODUCT_IMAGES.evBike, tag: "Products" },
  { id: "g-materials", title: "Building Materials", category: "products" as const, image: PRODUCT_IMAGES.buildingMaterials, tag: "Products" },
  { id: "g-emtop", title: "Emtop Tool Range", category: "products" as const, image: PRODUCT_IMAGES.emtopTools, tag: "Products" },
  { id: "g-alu", title: "Aluminium Doors & Windows", category: "services" as const, image: SERVICE_IMAGES.aluminium, tag: "Services" },
  { id: "g-kitchen", title: "Kitchens & Wardrobes", category: "services" as const, image: SERVICE_IMAGES.kitchen, tag: "Services" },
  { id: "g-shower", title: "Shower Cubicles", category: "services" as const, image: SERVICE_IMAGES.shower, tag: "Services" },
  { id: "g-railing", title: "SS Railings & Balustrades", category: "services" as const, image: SERVICE_IMAGES.railing, tag: "Services" },
  { id: "g-solar", title: "Jinko Solar Installations", category: "services" as const, image: SERVICE_IMAGES.solar, tag: "Services" },
  { id: "g-doors", title: "Wood & PVC Doors", category: "services" as const, image: SERVICE_IMAGES.woodPvc, tag: "Services" },
  { id: "g-works", title: "Recent Project Work", category: "services" as const, image: SERVICE_IMAGES.works, tag: "Latest Work" },
  { id: "g-showroom", title: "TamTech Showroom", category: "products" as const, image: SERVICE_IMAGES.showroom, tag: "Showroom" },
];
