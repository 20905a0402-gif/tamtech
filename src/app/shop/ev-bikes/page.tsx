"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Battery,
  MapPin,
  Shield,
  Clock,
  Smartphone,
  Check,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useCartStore, Product } from "@/store/useCartStore";
import { COMPANY_INFO } from "@/lib/design-tokens";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";
import { whatsappLink } from "@/lib/whatsapp-inquiry";

const SPIRO_PRODUCT: Product = {
  id: "ev-001",
  name: "Spiro Ekon 450 M1V2",
  slug: "spiro-ekon-450-m1v2",
  price_kes: 85000,
  category: "EV",
  sub_category: "E-Bike",
  description: "High-performance electric bike with GPS tracking, battery swapping capability, and 60-80km range per charge. Perfect for urban commuting with zero emissions.",
  inventory_count: 15,
  sku: "EV-SPIRO-001",
  brand: "Spiro",
  is_active: true,
  specs: {
    motor: "450W Brushless",
    battery: "48V 20Ah Swappable",
    range: "60-80km",
    max_speed: "45km/h",
    charging_time: "4 hours",
    payload: "150kg",
    warranty: "2 Years",
  },
};

const FEATURES = [
  { icon: Battery, title: "Battery Swapping", desc: "24-hour battery swapping stations" },
  { icon: MapPin, title: "GPS Tracking", desc: "Real-time location monitoring" },
  { icon: Shield, title: "Insurance", desc: "Comprehensive coverage included" },
  { icon: Clock, title: "Quick Charge", desc: "4 hours full charge time" },
  { icon: Smartphone, title: "Smart App", desc: "Track your bike from your phone" },
  { icon: Zap, title: "Zero Emissions", desc: "Eco-friendly transportation" },
];

const BATTERY_PLANS = [
  { name: "Pay Per Swap", price: "KES 350", desc: "Per battery swap" },
  { name: "Weekly", price: "KES 1,500", desc: "Unlimited swaps for 7 days" },
  { name: "Monthly", price: "KES 3,500", desc: "Unlimited swaps for 30 days" },
];

export default function EVBikesPage() {
  const { addItem } = useCartStore();

  const handleWhatsAppClick = () => {
    const url = whatsappLink({
      item: SPIRO_PRODUCT,
      type: "product",
      currentUrl: typeof window !== "undefined" ? window.location.href : "",
    });
    window.open(url, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0D98BA] via-[#0A7A94] to-[#065666]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white"
            >
              <span className="inline-block px-4 py-1 bg-[#8AC926] text-white text-sm font-medium rounded-full mb-6">
                New Arrival - Spiro Partnership
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Spiro Ekon 450 M1V2
              </h1>
              <p className="mt-6 text-lg text-white/90 max-w-xl">
                Experience the future of urban mobility with our electric bike featuring 
                GPS tracking, battery swapping, and zero emissions.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => addItem({
                    id: SPIRO_PRODUCT.id,
                    sku: SPIRO_PRODUCT.sku,
                    name: SPIRO_PRODUCT.name,
                    price: SPIRO_PRODUCT.price_kes,
                    quantity: 1,
                  })}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#8AC926] text-white font-semibold rounded-lg hover:bg-[#6FA11E] transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                >
                  <WhatsAppLogo size={20} className="text-white" />
                  Inquire on WhatsApp
                </button>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div>
                  <p className="text-3xl font-bold">60-80km</p>
                  <p className="text-sm text-white/70">Range</p>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div>
                  <p className="text-3xl font-bold">45km/h</p>
                  <p className="text-sm text-white/70">Max Speed</p>
                </div>
                <div className="h-12 w-px bg-white/20" />
                <div>
                  <p className="text-3xl font-bold">4hrs</p>
                  <p className="text-sm text-white/70">Charge Time</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square bg-white/10 rounded-3xl border-2 border-dashed border-white/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <Zap className="h-24 w-24 mx-auto mb-4 opacity-60" />
                  <p className="text-lg">Spiro Ekon 450 M1V2</p>
                  <p className="text-sm opacity-70">EV Bike Showcase</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Spiro Ekon?</h2>
            <p className="mt-4 text-gray-600">Advanced features for modern commuting</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#0D98BA]/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-[#0D98BA]" />
                </div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Battery Swapping Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-3 py-1 bg-[#8AC926]/10 text-[#6FA11E] text-sm font-medium rounded-full mb-4">
                24-Hour Service
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Battery Swapping Network
              </h2>
              <p className="text-gray-600 mb-6">
                Never wait for charging. Simply swap your depleted battery for a fully charged one 
                at any of our stations across Nairobi. Takes less than 2 minutes!
              </p>
              <ul className="space-y-3">
                {[
                  "Swap in under 2 minutes",
                  "Multiple locations across Nairobi",
                  "Always fully charged batteries",
                  "Affordable subscription plans",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-600">
                    <Check className="h-5 w-5 text-[#8AC926]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#8AC926]/10 to-[#0D98BA]/10 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Swapping Plans</h3>
              <div className="space-y-4">
                {BATTERY_PLANS.map((plan) => (
                  <div
                    key={plan.name}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{plan.name}</p>
                      <p className="text-sm text-gray-500">{plan.desc}</p>
                    </div>
                    <span className="text-[#0D98BA] font-bold">{plan.price}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Technical Specifications</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-3xl mx-auto">
            <table className="w-full">
              <tbody>
                {Object.entries(SPIRO_PRODUCT.specs || {}).map(([key, value], index) => (
                  <tr key={key} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/_/g, " ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-right">{String(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#0D98BA] to-[#0B7A94]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Go Electric?</h2>
          <p className="text-white/90 mb-8">
            Join the sustainable transportation revolution. Contact us for a test ride or to place your order.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#8AC926] text-white font-semibold rounded-lg hover:bg-[#6FA11E] transition-colors"
            >
              <WhatsAppLogo size={20} className="text-white" />
              Chat on WhatsApp
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              Browse All Products
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
