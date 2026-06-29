"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Star,
  Send,
  CheckCircle,
  Shield,
  Truck,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/design-tokens";
import WhatsAppLogo from "@/components/ui/WhatsAppLogo";
import PageHero from "@/components/ui/PageHero";
import PageCTA, { PageCTAButton } from "@/components/ui/PageCTA";
import { useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CONTACT_METHODS = [
  {
    icon: Phone,
    title: "Toll-Free",
    primary: COMPANY_INFO.phones.tollFree,
    secondary: "Call us anytime",
    label: "Call now",
    action: "tel:" + COMPANY_INFO.phones.tollFree,
  },
  {
    icon: Phone,
    title: "WhatsApp",
    primary: COMPANY_INFO.phones.whatsapp,
    secondary: "Chat with us",
    label: "WhatsApp us",
    action: COMPANY_INFO.whatsappLink,
  },
  {
    icon: Phone,
    title: "Phone",
    primary: COMPANY_INFO.phones.secondary,
    secondary: "Direct Line",
    label: "Call now",
    action: "tel:" + COMPANY_INFO.phones.secondary.replace(/\s/g, ""),
  },
  {
    icon: Mail,
    title: "Email",
    primary: COMPANY_INFO.email,
    secondary: "24hr response time",
    label: "Send us an email",
    action: "mailto:" + COMPANY_INFO.email,
  },
  {
    icon: MapPin,
    title: "Visit Us",
    primary: COMPANY_INFO.address.street,
    secondary: COMPANY_INFO.address.location,
    label: "Get directions",
    action: COMPANY_INFO.mapUrl,
  },
  {
    icon: Clock,
    title: "Business Hours",
    primary: "Mon – Fri: 8:00 AM – 5:00 PM",
    secondary: "Saturday: 8:00 AM – 1:00 PM · Sunday Closed",
    label: "WhatsApp anytime",
    action: COMPANY_INFO.whatsappLink,
  },
];

const WHY_CONTACT_US = [
  {
    icon: Headphones,
    title: "Expert Advice",
    description: "Get personalized product recommendations from our knowledgeable team.",
  },
  {
    icon: Truck,
    title: "Delivery Inquiries",
    description: "Learn about shipping options and track your orders.",
  },
  {
    icon: Shield,
    title: "Warranty Support",
    description: "Product issues? We'll help you with warranty claims and repairs.",
  },
  {
    icon: CheckCircle,
    title: "Bulk Orders",
    description: "Special pricing and terms for contractors and bulk purchases.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <PageHero
        badge="We're Here to Help"
        title="Contact Us"
        subtitle="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
      />

      {/* Contact Methods Grid */}
      <section className="py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#E6F4F8]/40 via-white to-[#FAFAFA]" />
        <div className="relative mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CONTACT_METHODS.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg hover:border-[#0D98BA]/30 transition-shadow duration-200 group border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0D98BA] to-[#0B7A94] rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <method.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0D98BA] transition-colors">
                  {method.title}
                </h3>
                <p className="text-gray-900 font-medium mt-1 group-hover:text-[#0B7A94] transition-colors">
                  {method.primary}
                </p>
                <p className="text-gray-500 text-sm">{method.secondary}</p>
                <a
                  href={method.action}
                  target={method.action.startsWith("http") ? "_blank" : undefined}
                  rel={method.action.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1 text-[#0D98BA] font-medium mt-4 hover:text-[#8AC926] hover:gap-2 transition-all"
                >
                  {method.label} <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Form + Map */}
      <section className="py-14 relative overflow-hidden bg-gradient-to-br from-indigo-50/50 via-white to-violet-50/40">
        <div className="absolute top-20 right-0 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-0 w-64 h-64 bg-violet-200/25 rounded-full blur-3xl" />
        <div className="relative mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-[#8AC926]/10 border border-[#8AC926]/20 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-[#8AC926] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for reaching out. Our team will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#0D98BA] font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20"
                        placeholder="+254 7XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20"
                      >
                        <option value="">Select a subject</option>
                        <option value="product-inquiry">Product Inquiry</option>
                        <option value="service-quote">Service Quote</option>
                        <option value="order-status">Order Status</option>
                        <option value="delivery">Delivery Question</option>
                        <option value="warranty">Warranty Claim</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:border-[#0D98BA] focus:outline-none focus:ring-2 focus:ring-[#0D98BA]/20"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#0D98BA] text-white font-semibold rounded-lg hover:bg-[#0B7A94] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-500">
                    Prefer WhatsApp?{" "}
                    <a
                      href={COMPANY_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0D98BA] font-medium hover:underline"
                    >
                      Chat with us directly
                    </a>
                  </p>
                </form>
              )}
            </motion.div>

            {/* Map & Location Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Visit Our Store</h2>
                <p className="text-gray-600">
                  Come see our products in person and speak with our team.
                </p>
              </div>

              {/* Embedded Google Maps */}
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7888042362288!2d36.82750677473798!3d-1.3016282986860082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f11006dc0386b%3A0x1b01e819d6015b49!2sTamTech%20Tools%20Limited!5e0!3m2!1sen!2sin!4v1775556634930!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TAM TECH TOOLS Location"
                  className="absolute inset-0"
                />
              </div>

              <div className="bg-[#FAFAFA] rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Store Address</h3>
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium text-gray-900">{COMPANY_INFO.name}</p>
                  <p>{COMPANY_INFO.address.street}</p>
                  <p>{COMPANY_INFO.address.landmark}</p>
                  <p>{COMPANY_INFO.address.location}</p>
                  <p className="pt-2">P.O. Box {COMPANY_INFO.poBox}</p>
                  <p>PIN: {COMPANY_INFO.pinNo}</p>
                </div>
              </div>

              {/* Quick WhatsApp CTA */}
              <a
                href={COMPANY_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-gradient-to-r from-[#8AC926] to-[#6FA01E] rounded-xl p-6 text-white hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <WhatsAppLogo size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Chat on WhatsApp</p>
                  <p className="text-white/80 text-sm">Fastest response time - usually within minutes</p>
                </div>
                <ArrowRight className="h-5 w-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section className="py-14 lg:py-20 bg-gradient-to-r from-[#0D98BA]/5 via-white to-[#8AC926]/5">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">How Can We Help?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our team is ready to assist you with a wide range of services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CONTACT_US.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all text-center border border-gray-100 hover:border-[#0D98BA]/20"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#8AC926] to-[#6FA01E] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-14 bg-white">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-10 lg:px-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 mb-8">
            Find quick answers to common questions. Can&apos;t find what you&apos;re looking for? Contact us directly.
          </p>

          <div className="grid md:grid-cols-2 gap-4 text-left">
            {[
              { q: "Do you offer delivery?", a: "Yes, we offer same-day delivery in Nairobi and nationwide shipping." },
              { q: "What are your payment options?", a: "We accept M-Pesa, bank transfer, and cash payments." },
              { q: "Do you provide installation?", a: "Yes, professional installation is available for all our services." },
              { q: "What is your return policy?", a: "Unused items can be returned within 7 days with original receipt." },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#FAFAFA] rounded-lg p-4"
              >
                <p className="font-semibold text-gray-900 mb-1">{faq.q}</p>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#0D98BA] font-semibold hover:gap-3 transition-all"
            >
              View All FAQs <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <PageCTA
        title="Ready to Get Started?"
        subtitle="Whether you're looking for Emtop tools, Spiro EV bikes, or professional fabrication — we're here to help every step of the way."
      >
        <PageCTAButton href="/shop">Browse Products</PageCTAButton>
        <PageCTAButton href={COMPANY_INFO.whatsappLink} external variant="secondary">
          <span className="inline-flex items-center gap-2">
            <WhatsAppLogo size={18} className="text-gray-800" /> Chat on WhatsApp
          </span>
        </PageCTAButton>
      </PageCTA>
    </main>
  );
}

