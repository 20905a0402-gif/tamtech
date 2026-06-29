import { COMPANY_INFO } from "@/lib/design-tokens";
import type { Product, Service } from "@/store/useCartStore";

interface WhatsAppMessageOptions {
  item: Product | Service;
  type: "product" | "service";
  currentUrl?: string;
  formDetails?: string;
}

/**
 * Format a WhatsApp deep link for product or service inquiries
 * @param options - Message configuration options
 * @returns WhatsApp wa.me deep link URL
 */
export function whatsappLink(options: WhatsAppMessageOptions): string {
  const { item, type, currentUrl, formDetails } = options;
  
  let message = "";
  
  if (type === "product") {
    const product = item as Product;
    message = formatProductMessage(product, currentUrl);
  } else {
    const service = item as Service;
    message = formatServiceMessage(service, formDetails);
  }
  
  // Encode message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Return wa.me deep link
  return `https://wa.me/${COMPANY_INFO.phones.whatsapp.replace(/\s/g, "")}?text=${encodedMessage}`;
}

/**
 * Format a product inquiry message
 */
function formatProductMessage(product: Product, currentUrl?: string): string {
  const url = currentUrl || (typeof window !== "undefined" ? window.location.href : "");
  
  let message = `Hi TAMTECH, I am interested in ${product.name} - KES ${product.price_kes.toLocaleString()}`;
  
  if (url) {
    message += `. Link: ${url}`;
  }
  
  // Add metadata for CRM tracking
  message += `\n\n[Ref: ${product.sku}]`;
  
  return message;
}

/**
 * Format a service quote request message
 */
function formatServiceMessage(service: Service, formDetails?: string): string {
  let message = `Hi TAMTECH, I need a quote for ${service.name}`;
  
  if (service.starting_price_kes) {
    message += ` (Starting from KES ${service.starting_price_kes.toLocaleString()})`;
  }
  
  if (formDetails) {
    message += `. ${formDetails}`;
  }
  
  return message;
}

/**
 * Format a cart checkout message with multiple items
 */
export function formatCartCheckoutMessage(
  items: Array<{ name: string; quantity: number; price: number }>,
  totalPrice: number
): string {
  const itemList = items
    .map((item, index) => `${index + 1}. ${item.name} x${item.quantity} - KES ${(item.price * item.quantity).toLocaleString()}`)
    .join("\n");
  
  return `Hi TAMTECH, I would like to order the following items:\n\n${itemList}\n\n*Total: KES ${totalPrice.toLocaleString()}*\n\nPlease confirm availability and delivery options.`;
}

/**
 * Create a generic inquiry link
 */
export function createGenericInquiryLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${COMPANY_INFO.phones.whatsapp.replace(/\s/g, "")}?text=${encodedMessage}`;
}

/**
 * Pre-fill WhatsApp message for custom project quote
 */
export function createCustomQuoteLink(projectType: string, details: string): string {
  const message = `Hi TAMTECH, I have a custom ${projectType} project and need a quote. Details: ${details}`;
  return createGenericInquiryLink(message);
}
