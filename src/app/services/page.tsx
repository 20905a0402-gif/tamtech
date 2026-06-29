"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Home, 
  Utensils, 
  Droplets, 
  Fence, 
  Check, 
  Phone, 
  Mail, 
  User,
  MessageSquare,
  ChevronRight,
  Star,
  Clock,
  Shield,
  Award,
  Wrench,
  ArrowRight,
  Sun,
  DoorOpen,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/design-tokens";
import { createCustomQuoteLink } from "@/lib/whatsapp-inquiry";
import PageHero from "@/components/ui/PageHero";
import PageCTA, { PageCTAButton } from "@/components/ui/PageCTA";
import { SERVICE_IMAGES, mediaPath } from "@/lib/media-assets";

const SERVICES = [
  {
    id: "aluminium",
    title: "Aluminium Windows & Doors",
    description: "Custom fabrication and professional installation of premium aluminium windows and doors. We offer sliding windows, casement windows, sliding doors, and bi-fold doors.",
    icon: Home,
    features: [
      "Powder-coat finish in multiple colors",
      "Double-glazed or single-glazed options",
      "Mosquito mesh integration",
      "Professional installation included",
      "10-year warranty on frames",
    ],
    price: "From KES 15,000",
    image: SERVICE_IMAGES.aluminium,
  },
  {
    id: "kitchen",
    title: "Kitchens & Wardrobes",
    description: "Complete kitchen solutions including cabinets, countertops, and appliances. We design, fabricate, and install modern kitchens with high-quality materials.",
    icon: Utensils,
    features: [
      "3D design visualization before fabrication",
      "Marine plywood cabinets (waterproof)",
      "Granite/Quartz countertop options",
      "Soft-close hinges and drawers",
      "5-year warranty on craftsmanship",
    ],
    price: "From KES 85,000",
    image: SERVICE_IMAGES.kitchen,
  },
  {
    id: "shower",
    title: "Shower Cubicles & Enclosures",
    description: "Modern glass shower cubicles and enclosures with tempered safety glass. Available in framed, semi-framed, and frameless designs.",
    icon: Droplets,
    features: [
      "8mm tempered safety glass",
      "Clear, frosted, or tinted glass options",
      "Anti-slip tray options",
      "Chrome or matte black hardware",
      "2-year warranty on installation",
    ],
    price: "From KES 35,000",
    image: SERVICE_IMAGES.shower,
  },
  {
    id: "railing",
    title: "SS & MS Railings",
    description: "Elegant stainless steel and mild steel railings for balconies, staircases, and terraces. Available in various designs and finishes.",
    icon: Fence,
    features: [
      "SS 304 marine-grade stainless steel",
      "Glass or rod infill options",
      "Mirror or satin finish",
      "Weather-resistant coating",
      "5-year rust-free guarantee",
    ],
    price: "From KES 5,500/m",
    image: SERVICE_IMAGES.railing,
  },
  {
    id: "solar",
    title: "Solar",
    description:
      "Jinko Solar panel supply and professional installation for residential and commercial properties across Kenya.",
    icon: Sun,
    features: [
      "Jinko Solar tier-1 panels and inverters",
      "On-grid and off-grid system options",
      "Professional site survey and design",
      "Certified installation team",
      "After-sales maintenance support",
    ],
    price: "Custom Quote",
    image: SERVICE_IMAGES.solar,
  },
  {
    id: "wood-pvc-doors",
    title: "Wood and PVC Doors",
    description:
      "High-quality wood and PVC/WPVC doors manufactured and installed for homes, offices, and commercial spaces.",
    icon: DoorOpen,
    features: [
      "Solid wood and engineered options",
      "PVC/WPVC moisture-resistant doors",
      "Custom sizes and finishes",
      "Security and fire-rated options",
      "Professional fitting included",
    ],
    price: "From KES 12,000",
    image: SERVICE_IMAGES.woodPvc,
  },
];

const WORK_PROCESS = [
  { step: 1, title: "Consultation", description: "We discuss your requirements, take measurements, and understand your vision.", icon: MessageSquare },
  { step: 2, title: "Design & Quote", description: "Our team creates 3D designs and provides a detailed, transparent quotation.", icon: Wrench },
  { step: 3, title: "Fabrication", description: "We fabricate your products using premium materials and skilled craftsmanship.", icon: Home },
  { step: 4, title: "Installation", description: "Professional installation at your site with attention to every detail.", icon: Check },
];

const FAQS = [
  { question: "How long does a typical installation take?", answer: "Most installations are completed within 1-3 days depending on the project size. Kitchens may take 5-7 days for complete installation." },
  { question: "Do you provide warranty on your services?", answer: "Yes, all our services come with warranties. Windows & doors have 10-year warranty, kitchens 5 years, and shower cubicles 2 years." },
  { question: "Can I see samples before ordering?", answer: "Absolutely! Visit our showroom in Industrial Area to see material samples and finished product displays." },
  { question: "Do you offer payment plans?", answer: "We require 50% deposit to start fabrication, and balance upon completion. We accept M-Pesa, bank transfer, and cash." },
];

const TESTIMONIALS = [
  { name: "Jane Wanjiku", service: "Kitchen Installation", quote: "My new kitchen exceeded expectations! Professional team and quality materials.", rating: 5 },
  { name: "Peter Mwangi", service: "Aluminium Windows", quote: "Fast installation, clean work, and the windows look amazing. Highly recommend!", rating: 5 },
  { name: "Sarah Akinyi", service: "Shower Cubicle", quote: "The glass quality is excellent. Installation was done in just one day!", rating: 5 },
];

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const details = `Name: ${formData.name}, Phone: ${formData.phone}, Service: ${formData.service}, Message: ${formData.message}`;
    const whatsappUrl = createCustomQuoteLink(formData.service || "Custom Project", details);
    
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      setFormData({ name: "", phone: "", email: "", service: "", message: "" });
    }, 500);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero
        badge="Expert Fabrication & Installation"
        title="Fabrication & Installation Experts"
        subtitle="From concept to completion — precision-built solutions for windows, kitchens, solar, and more across Kenya."
      >
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#quote-form" className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-[#8AC926] text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-[#6FA01E] transition-all shadow-lg">
            Get Free Quote <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
          <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-2.5 sm:px-8 sm:py-3 bg-white/10 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm">
            Browse Products
          </Link>
        </div>
      </PageHero>

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, value: "10 Year", label: "Warranty" },
              { icon: Clock, value: "24hr", label: "Response Time" },
              { icon: Award, value: "100%", label: "Quality" },
              { icon: Check, value: "500+", label: "Projects Done" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <item.icon className="h-8 w-8 mx-auto mb-2 text-[#0D98BA]" />
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                <p className="text-sm text-gray-600">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 lg:py-24 bg-[#FAFAFA]">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Service Portfolio</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Built, supplied, and installed by TamTech — explore our complete range of capabilities
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="h-48 sm:h-56 lg:h-72 xl:h-80 relative overflow-hidden">
                  <img 
                    src={mediaPath(service.image)} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    <span className="text-[#0D98BA] font-semibold bg-[#0D98BA]/10 px-3 py-1 rounded-full text-sm">{service.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-[#8AC926] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#quote-form"
                    onClick={() => setFormData(prev => ({ ...prev, service: service.title }))}
                    className="inline-flex items-center gap-2 text-[#0D98BA] font-medium hover:gap-3 transition-all"
                  >
                    Request Quote <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-white">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">How We Work</h2>
            <p className="mt-4 text-lg text-gray-600">Our streamlined process ensures quality results</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {WORK_PROCESS.map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-[#FAFAFA] rounded-xl p-6 text-center">
                  <div className="w-14 h-14 bg-[#0D98BA] rounded-full flex items-center justify-center mx-auto mb-4">
                    <process.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#8AC926] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{process.title}</h3>
                  <p className="text-gray-600 text-sm">{process.description}</p>
                </div>
                {index < WORK_PROCESS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 text-[#0D98BA]">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-gradient-to-br from-[#0D98BA] to-[#0B7A94]">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Why Choose Our Services?</h2>
              <div className="space-y-4">
                {[
                  "Expert craftsmen with years of experience",
                  "Premium quality materials only",
                  "On-time project completion guarantee",
                  "Transparent pricing with no hidden costs",
                  "Full installation and cleanup included",
                  "After-sales support and maintenance",
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#8AC926] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-white/90">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "98%", label: "Satisfied Customers" },
                { value: "500+", label: "Projects Completed" },
                { value: "15+", label: "Expert Technicians" },
                { value: "5+", label: "Years Experience" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20"
                >
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">What Clients Say</h2>
            <p className="mt-4 text-lg text-gray-600">Real feedback from our satisfied customers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-[#0D98BA]">{testimonial.service}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">Common questions about our services</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#FAFAFA] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[#0D98BA]" />
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${openFaq === index ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 ml-8">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Request a Free Quote</h2>
            <p className="mt-4 text-gray-600">
              Fill in your details and we&apos;ll get back to you within 24 hours via WhatsApp
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home className="h-4 w-4 inline mr-2" />
                    Service Interested In
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Custom Project">Custom Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  Project Details
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none"
                  placeholder="Tell us about your project requirements, dimensions, preferred materials, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#8AC926] text-white font-semibold rounded-lg hover:bg-[#6FA01E] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    <Phone className="h-5 w-5" />
                    Send via WhatsApp
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                By submitting, you agree to be contacted via WhatsApp at {COMPANY_INFO.phones.whatsapp}
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <PageCTA
        title="Ready to Transform Your Space?"
        subtitle="Whether it's a new kitchen, aluminium windows, or Jinko Solar installation — we bring expertise and quality to every project."
      >
        <PageCTAButton href={COMPANY_INFO.whatsappLink} external>
          Chat on WhatsApp
        </PageCTAButton>
        <PageCTAButton href="/contact" variant="secondary">
          Visit Our Showroom
        </PageCTAButton>
      </PageCTA>
    </main>
  );
}
