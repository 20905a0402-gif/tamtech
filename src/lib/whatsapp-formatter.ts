import { CartItem, CartService } from "@/store/useCartStore";
import { COMPANY_INFO } from "./design-tokens";

interface WhatsAppPayloadParams {
  items: CartItem[];
  services: CartService[];
  cartId: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  deliveryLocation?: string;
  additionalNotes?: string;
}

interface FormattedPayload {
  text: string;
  url: string;
  isTruncated: boolean;
}

const MAX_URL_LENGTH = 2000;

export function generateWhatsAppPayload(params: WhatsAppPayloadParams): FormattedPayload {
  const {
    items,
    services,
    cartId,
    customerName,
    customerPhone,
    customerEmail,
    deliveryLocation,
    additionalNotes,
  } = params;

  const timestamp = new Date().toISOString();

  // Build human-readable message with WhatsApp markdown
  let message = `*${COMPANY_INFO.name} - NEW INQUIRY*\n\n`;
  message += `Order Ref: ${cartId}\n`;
  message += `Date: ${new Date().toLocaleDateString('en-KE')}\n\n`;
  
  message += `Hello, I would like to request a quote and availability for the following:\n\n`;

  // Products section
  if (items.length > 0) {
    message += `*🛒 PRODUCTS:*\n\n`;
    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.name}`;
      if (item.attributes && Object.keys(item.attributes).length > 0) {
        const attrs = Object.entries(item.attributes)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        message += ` (${attrs})`;
      }
      message += ` (SKU: ${item.sku})\n`;
    });
    message += `\n`;
  }

  // Services section
  if (services.length > 0) {
    message += `*🛠 SERVICES REQUESTED:*\n\n`;
    services.forEach((service) => {
      message += `• ${service.name}`;
      if (service.description) {
        message += ` - ${service.description}`;
      }
      message += `\n`;
    });
    message += `\n`;
  }

  // Customer details
  if (customerName || customerPhone || customerEmail || deliveryLocation) {
    message += `*👤 CUSTOMER DETAILS:*\n\n`;
    if (customerName) message += `Name: ${customerName}\n`;
    if (customerPhone) message += `Phone: ${customerPhone}\n`;
    if (customerEmail) message += `Email: ${customerEmail}\n`;
    if (deliveryLocation) message += `Delivery Location: ${deliveryLocation}\n`;
    message += `\n`;
  }

  // Additional notes
  if (additionalNotes) {
    message += `*📝 ADDITIONAL NOTES:*\n${additionalNotes}\n\n`;
  }

  message += `Please advise on total pricing and delivery options to ${deliveryLocation || "Nairobi"}.\n\n`;
  message += `Thank you!`;

  // Build metadata JSON for CRM integration (minified)
  const metadata = {
    cartId,
    timestamp,
    items: items.map((i) => ({
      sku: i.sku,
      qty: i.quantity,
      price: i.price,
    })),
    services: services.map((s) => s.id),
    customer: {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
    },
  };

  // Append metadata as hidden code block
  message += `\n\`\`\`${JSON.stringify(metadata)}\`\`\``;

  // Encode for URL
  const encodedText = encodeURIComponent(message);
  const baseUrl = `https://wa.me/${COMPANY_INFO.phones.whatsapp.replace(/\D/g, "")}?text=`;
  let fullUrl = baseUrl + encodedText;

  // Check if URL exceeds limit
  let isTruncated = false;
  if (fullUrl.length > MAX_URL_LENGTH) {
    // Truncate items list and add note
    const truncatedMessage = message.substring(0, 1500) + 
      "\n\n...and additional items. Please review my account for complete details.";
    const truncatedEncoded = encodeURIComponent(truncatedMessage);
    fullUrl = baseUrl + truncatedEncoded;
    isTruncated = true;
  }

  return {
    text: message,
    url: fullUrl,
    isTruncated,
  };
}

// Generate simple product inquiry link
export function generateProductInquiry(
  productName: string,
  sku: string,
  price?: number
): string {
  const message = `*${COMPANY_INFO.name} - Product Inquiry*\n\n` +
    `Hello, I am interested in the following product:\n\n` +
    `*${productName}*\n` +
    `SKU: ${sku}${price ? `\nPrice: KES ${price.toLocaleString()}` : ""}\n\n` +
    `Please provide more information and confirm availability.`;

  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${COMPANY_INFO.phones.whatsapp.replace(/\D/g, "")}?text=${encodedText}`;
}

// Generate service quote request
export function generateServiceQuoteRequest(
  serviceName: string,
  details?: string
): string {
  let message = `*${COMPANY_INFO.name} - Service Quote Request*\n\n` +
    `Hello, I would like to request a quote for the following service:\n\n` +
    `*${serviceName}*\n\n`;

  if (details) {
    message += `*Project Details:*\n${details}\n\n`;
  }

  message += `Please contact me to discuss requirements and pricing.`;

  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${COMPANY_INFO.phones.whatsapp.replace(/\D/g, "")}?text=${encodedText}`;
}
