"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Star,
  Users,
  Package,
  Award,
  CheckCircle,
  CreditCard,
  Headphones,
} from "lucide-react";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";
import { COMPANY_INFO } from "@/lib/design-tokens";
import { HOME_CATEGORIES, HOME_SERVICES } from "@/lib/navigation-config";
import { mediaPath } from "@/lib/media-assets";
import { GOOGLE_REVIEW_URL } from "@/lib/constants";
import PageCTA, { PageCTAButton } from "@/components/ui/PageCTA";
import GoogleLogo from "@/components/ui/GoogleLogo";

interface ShowcaseCardProps {
  tag: string;
  title: string;
  description: string;
  href: string;
  quoteHref?: string;
  image: string;
  gradient: string;
  ctaLabel: string;
  index?: number;
  titleShadow?: boolean;
}

function ShowcaseCard({
  tag,
  title,
  description,
  href,
  quoteHref,
  image,
  gradient,
  ctaLabel,
  index = 0,
  titleShadow = true,
}: ShowcaseCardProps) {
  const bgImage = mediaPath(image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[300px] lg:min-h-[340px]`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-700"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
      <div className="relative flex h-full flex-col justify-end p-6 sm:p-8">
        <Link href={href} className="block flex-1 flex flex-col justify-end">
          <span className="mb-3 inline-block w-fit rounded-full bg-[#0D98BA] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
            {tag}
          </span>
          <h3
            className={`text-xl sm:text-2xl font-bold text-[#8AC926] mb-2 ${
              titleShadow
                ? "[text-shadow:0_1px_3px_white,0_2px_10px_rgba(255,255,255,0.95)]"
                : ""
            }`}
          >
            {title}
          </h3>
          <p className="text-white/90 text-sm sm:text-base mb-4 max-w-md leading-relaxed">
            {description}
          </p>
        </Link>
        <Link
          href={quoteHref ?? href}
          className="inline-flex items-center gap-1 w-fit rounded-lg bg-white/15 backdrop-blur-sm px-4 py-2 text-[#0D98BA] font-semibold hover:bg-white/25 hover:gap-2 transition-all border border-white/20"
        >
          {ctaLabel} <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselSlides = [
    { type: "video", src: "/videos/Tamtech_video.mp4" },
    { type: "image", src: "/images/emtop_tools.jpg", alt: "Emtop Tools", duration: 5000 },
    { type: "image", src: "/images/services(works).png", alt: "Our Services", duration: 5000 },
    { type: "image", src: "/images/showroom.jpg", alt: "TamTech Showroom", duration: 5000 },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  }, [carouselSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  // Handle video ended event
  const handleVideoEnded = () => {
    nextSlide();
  };

  // Restart video when coming back to video slide
  useEffect(() => {
    if (currentSlide === 0 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Auto-play might be blocked, user can click play
      });
    }
  }, [currentSlide]);

  // Auto-advance for carousel items
  useEffect(() => {
    if (!isPlaying) return;

    const current = carouselSlides[currentSlide];

    // If it's a video, we don't set a timer and wait for onEnded
    if (current.type === "video") return;

    // For images, use their duration
    const timer = setTimeout(nextSlide, current.duration || 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, isPlaying, nextSlide]);

  // Touch swipe handlers
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragEnd, setDragEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setDragEnd(null);
    setDragStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setDragEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!dragStart || !dragEnd) return;
    const distance = dragStart - dragEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    setDragStart(null);
    setDragEnd(null);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Media Carousel - Below Navbar, Full Height - Visible on all screens */}
      <section
        className="relative bg-gray-900 overflow-hidden h-[70vh] min-h-[400px] max-h-[680px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative w-full h-full">
          {/* Slides with swipe support */}
          {carouselSlides.map((slide, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                scale: currentSlide === index ? 1 : 1.05,
              }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className={`absolute inset-0 ${currentSlide === index ? "z-10" : "z-0"}`}
            >
              {slide.type === "video" ? (
                <video
                  ref={currentSlide === index ? videoRef : null}
                  src={slide.src}
                  autoPlay
                  muted
                  playsInline
                  onEnded={handleVideoEnded}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Overlay gradient - lighter at bottom for dots visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
            </motion.div>
          ))}

          {/* Navigation Arrows - Hidden on small screens, swipe instead */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors items-center justify-center"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors items-center justify-center"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-4 right-4 z-20 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white" />
            )}
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {carouselSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-[#8AC926] w-8"
                    : "bg-white/60 hover:bg-white/80 w-2"
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute bottom-8 right-4 sm:right-6 z-20 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="text-white font-medium text-sm">
              {currentSlide + 1} / {carouselSlides.length}
            </span>
          </div>

          {/* Swipe hint for mobile */}
          <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white/60 text-xs">
            Swipe to navigate
          </div>
        </div>
      </section>

      {/* Stats Section — compact (top strip) */}
      <section className="py-4 md:py-5 bg-gradient-to-r from-[#0D98BA] to-[#0B7A94]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Users, value: "1000+", label: "Happy Customers" },
              { icon: Package, value: "500+", label: "Products Available" },
              { icon: Award, value: "5+", label: "Years Experience" },
              { icon: Headphones, value: "Expert", label: "Support Available" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center text-white py-1"
              >
                <stat.icon className="h-5 w-5 mx-auto mb-1 text-[#8AC926]" />
                <p className="text-2xl md:text-3xl font-bold leading-tight">{stat.value}</p>
                <p className="text-white/85 text-xs md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges Bar — compact (bottom strip) */}
      <section className="py-3 md:py-4 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {[
              { icon: Truck, text: "Delivery on Time" },
              { icon: Headphones, text: "Expert Support Available" },
              { icon: CheckCircle, text: "Quality Guarantee" },
              { icon: CreditCard, text: "Secure M-Pesa Payment" },
            ].map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-center gap-2 py-2 px-2"
              >
                <badge.icon className="h-5 w-5 text-[#8AC926] flex-shrink-0" />
                <span className="text-sm font-medium text-gray-900">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Our Categories — 3 cards */}
      <section className="pt-6 pb-16 md:pt-8 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Explore Our Categories
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Power tools, EV bikes, and building materials — everything your
              project needs under one roof.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {HOME_CATEGORIES.map((cat, index) => (
              <ShowcaseCard
                key={cat.title}
                tag={cat.tag}
                title={cat.title}
                description={cat.description}
                href={cat.href}
                image={cat.image}
                gradient={cat.gradient}
                ctaLabel="Shop Now"
                index={index}
                titleShadow={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Our Professional Services — same card style as categories */}
      <section className="py-16 lg:py-20 bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Our Professional Services
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              End-to-end fabrication and installation — from design to delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {HOME_SERVICES.map((service, index) => (
              <ShowcaseCard
                key={service.title}
                tag={service.tag}
                title={service.title}
                description={service.description}
                href={service.href}
                quoteHref={service.quoteHref}
                image={service.image}
                gradient={service.gradient}
                ctaLabel="Request a Quotation"
                index={index}
                titleShadow={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-gray-600">Trusted by professionals and homeowners alike</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "John Kamau",
                role: "Construction Manager",
                content:
                  "TAMTECH has been our go-to supplier for power tools. Quality products and excellent customer service every time.",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop&crop=faces",
              },
              {
                name: "Sarah Ochieng",
                role: "Homeowner",
                content:
                  "Got my kitchen cabinets installed by their team. Professional work and completed on time. Highly recommended!",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=faces",
              },
              {
                name: "Michael Odhiambo",
                role: "Contractor",
                content:
                  "The EV bike purchase was seamless. Battery swapping stations make it so convenient. Great investment!",
                rating: 5,
                image:
                  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces",
              },
            ].map((testimonial, index) => (
              <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0D98BA]/20"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Review prompt */}
      <section className="py-12 lg:py-14 bg-gradient-to-r from-[#E6F4F8] via-white to-[#F0F9E4]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center md:grid md:grid-cols-[1fr_auto] md:gap-8 lg:gap-12 md:items-center md:text-left">
            <div className="w-full">
              <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Love TamTech? Leave a Google Review
              </h2>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto md:mx-0 leading-relaxed">
                Your feedback helps other customers discover our tools,
                materials, and services across Nairobi and East Africa.
              </p>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0D98BA] text-white font-semibold rounded-xl hover:bg-[#0B7A94] transition-colors shadow-md hover:shadow-lg"
              >
                <Star className="h-5 w-5 fill-white" />
                Review Us on Google
              </a>
            </div>
            <div className="flex justify-center items-center mt-8 md:mt-0">
              <div className="flex items-center justify-center rounded-3xl bg-white shadow-lg ring-1 ring-gray-100 p-6 sm:p-8">
                <GoogleLogo className="h-20 w-20 sm:h-28 sm:w-28 lg:h-32 lg:w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTA
        title="Ready to Start Your Project?"
        subtitle="Get instant quotes via WhatsApp or visit our store in Nairobi"
      >
        <PageCTAButton href={COMPANY_INFO.whatsappLink} external>
          <WhatsAppLogo size={20} className="text-white" /> Chat on WhatsApp
        </PageCTAButton>
        <PageCTAButton href="/contact" variant="secondary">
          Visit Our Store
        </PageCTAButton>
      </PageCTA>
    </main>
  );
}
