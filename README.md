# TAM TECH TOOLS LIMITED - Next.js 15 Website

A production-ready e-commerce website for TAM TECH TOOLS LIMITED, built with Next.js 15, Tailwind CSS v4, and optimized for Cloudflare Workers deployment.

## Features

- **Next.js 15** with App Router paradigm
- **Tailwind CSS v4** for modern styling
- **Framer Motion** for smooth animations
- **Zustand** for state management with persistence
- **Supabase** integration for database
- **WhatsApp-driven checkout** for East African market
- **Mobile-first bottom navigation** for Kenyan market
- **Cloudflare Workers** deployment via OpenNext
- **100% static generation** compatible

## Tech Stack

- **Framework**: Next.js 15.3.0
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **State**: Zustand with persist middleware
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Cloudflare Workers (OpenNext)
- **Icons**: Lucide React
- **Toast**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd tamtech-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
tamtech-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileBottomNav.tsx
│   │   └── ui/                # UI components
│   │       └── WhatsAppCheckoutButton.tsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useCartHydration.ts
│   ├── lib/                   # Utility functions
│   │   ├── design-tokens.ts   # Brand colors, company info
│   │   ├── motion-constants.ts # Animation settings
│   │   ├── supabase.ts        # Supabase client
│   │   └── whatsapp-formatter.ts # WhatsApp link generator
│   └── store/                 # Zustand stores
│       └── useCartStore.ts
├── public/                    # Static assets
├── open-next.config.ts        # OpenNext configuration
├── wrangler.jsonc            # Cloudflare Workers config
├── next.config.ts            # Next.js configuration
└── package.json
```

## Design System

### Brand Colors

- **Primary (Teal)**: `#0D98BA` - Headers, Icons, Trust-building
- **Action (Lime)**: `#8AC926` - WhatsApp buttons, In Stock tags, Cart actions
- **Surface White**: `#FFFFFF`
- **Surface Grey**: `#FAFAFA`

### Typography

- **Font Family**: Inter (system-ui fallback)
- **Base Size**: 16px

### Motion

- **Reveal Animation**: 0.5s ease-out
- **Stagger Delay**: 0.1s between items

## Environment Variables

Create a `.env.local` file:

```env
# Supabase (already configured in lib/design-tokens.ts)
NEXT_PUBLIC_SUPABASE_URL=https://syktgnhsjspjbuihnvbs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xsgtHk3FmMqUG_uhVMX7Sw_0ANuf0b6
```

## Deployment

### Cloudflare Workers (Production)

1. **Install Wrangler CLI** (if not already):
   ```bash
   npm install -g wrangler
   ```

2. **Build for Cloudflare**:
   ```bash
   npm run build:opennext
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

   Or manually:
   ```bash
   wrangler deploy
   ```

### Preview Deployment

```bash
npm run preview
```

This starts a local Cloudflare Workers environment for testing.

## GitHub Actions Auto-Deployment

To set up automatic deployment via GitHub Actions:

1. Add `CF_API_TOKEN` and `CF_ACCOUNT_ID` secrets to your GitHub repository
2. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build:opennext
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          command: deploy
```

## WhatsApp Integration

The checkout flow uses WhatsApp deep links:

- **Phone**: +254 733 959 383
- **Format**: `https://wa.me/254733959383?text=...`

The formatter creates human-readable messages with:
- Product details with SKUs
- Service requests
- Customer information
- Minified JSON metadata for CRM integration

## Important Notes

### Cloudflare Workers Compatibility

Per the architecture requirements:
- Uses `nodejs_compat` flag (configured in `wrangler.jsonc`)
- **No `export const runtime = 'edge'`** directives (removed from all files)
- Uses Webpack for production builds (not Turbopack)
- Connection pooling via Cloudflare Hyperdrive recommended for production

### Database Connection

The Supabase database is hosted in `eu-central-1` (Frankfurt). For production, configure Cloudflare Hyperdrive for connection pooling to reduce latency.

## Navigation Structure

### Desktop
- Home
- Profile/About Us
- Shop (with dropdown)
  - EV Bikes
  - Building Materials
  - Tools
- Services
- Contact Us

### Mobile Bottom Nav
- Home
- Shop
- Cart (with badge)
- Services
- Floating WhatsApp Button

## Pages to Build

The following placeholder routes are configured:

- `/` - Home (✅ Complete)
- `/about` - About Us (📄 Placeholder)
- `/shop` - Shop categories (📄 Placeholder)
- `/shop/ev-bikes` - EV Bikes (📄 Placeholder)
- `/shop/building-materials` - Building Materials (📄 Placeholder)
- `/shop/tools` - Tools (📄 Placeholder)
- `/services` - Services (📄 Placeholder)
- `/contact` - Contact Us (📄 Placeholder)
- `/cart` - Shopping Cart (📄 Placeholder)
- `/search` - Search Results (📄 Placeholder)

## License

Copyright © 2026 TAM TECH TOOLS LIMITED. All rights reserved.

## Support

For technical support or questions:
- WhatsApp: +254 733 959 383
- Email: tamtechtools@gmail.com
