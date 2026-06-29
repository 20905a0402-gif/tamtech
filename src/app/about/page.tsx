"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Award,
  Users,
  Building2,
  Wrench,
  Truck,
  Shield,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  Heart,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/design-tokens";
import PageHero from "@/components/ui/PageHero";
import PageCTA, { PageCTAButton } from "@/components/ui/PageCTA";

const CORE_VALUES = [
  {
    icon: Target,
    title: "Customer Focus",
    description:
      "We put our customers at the center of everything we do, ensuring their needs are met with precision and care.",
    accent: "from-[#0D98BA] to-[#8AC926]",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description:
      "We never compromise on quality. Every product and service meets the highest industry standards.",
    accent: "from-[#8AC926] to-[#0B7A94]",
  },
  {
    icon: Shield,
    title: "Integrity",
    description:
      "Honest pricing, transparent dealings, and ethical business practices define our operations.",
    accent: "from-[#0D98BA] to-[#8AC926]",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description:
      "We continuously evolve, bringing the latest tools, materials, and EV solutions to the Kenyan market.",
    accent: "from-[#8AC926] to-[#0B7A94]",
  },
];

const TRUST_INDICATORS = [
  { value: "1000+", label: "Happy Customers", icon: Users },
  { value: "500+", label: "Products", icon: Building2 },
  { value: "5+", label: "Years Experience", icon: Award },
  { value: "50+", label: "Projects Monthly", icon: TrendingUp },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero
        badge="Kenya's Trusted Hardware Partner"
        title="About TAM TECH TOOLS"
        subtitle="Your one-stop solution for premium tools, building materials, EV solutions, and professional fabrication services across Kenya."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-[#8AC926] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#6FA01E] transition-all shadow-lg hover:shadow-xl"
          >
            Explore Products <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-white/10 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20"
          >
            Our Services
          </Link>
        </div>
      </PageHero>

      {/* Trust Indicators — compact */}
      <section className="py-5 bg-white border-b border-gray-100">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {TRUST_INDICATORS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center py-2 rounded-xl bg-gradient-to-br from-[#E6F4F8]/50 to-white border border-[#0D98BA]/10"
              >
                <stat.icon className="h-5 w-5 mx-auto mb-1 text-[#0D98BA]" />
                <p className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-xs md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#8AC926]/15 px-3 py-1 text-sm font-medium text-[#6FA01E] mb-4">
                <Sparkles className="h-4 w-4" />
                Who We Are
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
                Power in Your Hands
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">TAM TECH TOOLS LIMITED</strong>{" "}
                  is a leading supplier of premium tools, building materials, and
                  EV solutions in Kenya — trusted by homeowners, contractors, and
                  businesses across East Africa.
                </p>
                <p>
                  From power tools to electric vehicles, aluminium fabrication to
                  complete kitchen installations — we deliver end-to-end solutions
                  backed by professional service and after-sales support.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gradient-to-br from-[#0D98BA]/15 to-[#E6F4F8] p-4 border border-[#0D98BA]/20 shadow-sm">
                  <p className="text-2xl font-bold text-[#0D98BA]">1000+</p>
                  <p className="text-sm text-gray-600">Products Available</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-[#8AC926]/15 to-[#F0F9E4] p-4 border border-[#8AC926]/20 shadow-sm">
                  <p className="text-2xl font-bold text-[#8AC926]">Expert</p>
                  <p className="text-sm text-gray-600">Support Available</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full max-w-md lg:max-w-lg mx-auto"
            >
              <div className="aspect-[5/4] rounded-2xl bg-gradient-to-br from-[#0D98BA] via-[#0B8AA8] to-[#8AC926] p-1 shadow-2xl">
                <div className="h-full w-full rounded-[14px] bg-white/10 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Building2 className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 drop-shadow-lg" />
                    <p className="text-xl sm:text-2xl font-bold">TAM TECH TOOLS</p>
                    <p className="text-white/90 mt-2 text-sm sm:text-base">
                      Premium Quality Tools & Materials
                    </p>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -right-2 sm:-right-4 bg-white rounded-xl shadow-xl p-3.5 border border-[#0D98BA]/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#8AC926] rounded-full flex items-center justify-center shrink-0">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Trusted by</p>
                    <p className="text-[#0D98BA] font-bold">1000+ Customers</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-14 bg-white">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-[#0D98BA] to-[#0B7A94] rounded-2xl p-8 text-white shadow-xl border border-white/10"
            >
              <Target className="h-12 w-12 mb-4 text-[#8AC926]" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/90 leading-relaxed">
                To provide innovative, high-quality tools, building materials, and
                EV solutions that empower our customers to build better — with
                excellence in every product and service across Kenya.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-[#8AC926] to-[#6FA01E] rounded-2xl p-8 text-white shadow-xl border border-white/10"
            >
              <Eye className="h-12 w-12 mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                To be Kenya&apos;s most trusted supplier of tools, materials, and
                sustainable mobility — making quality construction and green
                technology accessible to every Kenyan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values — vibrant cards */}
      <section className="py-14 lg:py-20 bg-[#FAFAFA]">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Core Values
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CORE_VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all border border-gray-100 overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.accent}`}
                />
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${value.accent} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <value.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-14 lg:py-20 relative overflow-hidden bg-gradient-to-br from-amber-50/90 via-orange-50/60 to-rose-50/70">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-200/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />
        <div className="relative mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              What We Offer
            </h2>
            <p className="mt-3 text-lg text-gray-600">
              Comprehensive solutions for every need
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Wrench, title: "Premium Tools", description: "Emtop power tools, hand tools, and accessories for professionals and DIY.", accent: "bg-[#0D98BA]" },
              { icon: Building2, title: "Building Materials", description: "Aluminium, glass, wood, stainless steel, and PVC/WPVC fittings.", accent: "bg-[#0B7A94]" },
              { icon: Truck, title: "EV Solutions", description: "Spiro electric bikes with GPS tracking and battery swapping.", accent: "bg-[#8AC926]" },
              { icon: Shield, title: "Installation Services", description: "Professional fabrication for windows, kitchens, and railings.", accent: "bg-indigo-500" },
              { icon: Award, title: "Expert Support", description: "Dedicated customer service via WhatsApp and phone.", accent: "bg-violet-500" },
              { icon: Truck, title: "Timely Delivery", description: "Fast delivery across Nairobi and nationwide shipping.", accent: "bg-sky-500" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 ${item.accent} rounded-xl flex items-center justify-center mb-4 shadow-md`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <PageCTA
        title="Ready to Work With Us?"
        subtitle={`${COMPANY_INFO.address.location} · Toll-Free: ${COMPANY_INFO.phones.tollFree} · ${COMPANY_INFO.email}`}
      >
        <PageCTAButton href="/contact">Contact Us</PageCTAButton>
        <PageCTAButton href="/shop" variant="secondary">
          Browse Products
        </PageCTAButton>
      </PageCTA>
    </main>
  );
}
