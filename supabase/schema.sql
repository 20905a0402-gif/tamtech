-- TAMTECH Supabase Database Schema
-- Run this in the Supabase SQL Editor

-- Enable RLS (Row Level Security) - already default in Supabase

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    price_kes INTEGER NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Tools', 'Materials', 'EV')),
    sub_category TEXT,
    description TEXT,
    specs JSONB DEFAULT '{}',
    image_url TEXT,
    images TEXT[] DEFAULT '{}',
    inventory_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    brand TEXT,
    sku TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_sub_category ON products(sub_category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_price ON products(price_kes);

-- Create GIN index for JSONB specs (for flexible attribute queries)
CREATE INDEX idx_products_specs ON products USING GIN(specs);

-- Enable Full-Text Search on product name and description
ALTER TABLE products ADD COLUMN search_vector tsvector 
    GENERATED ALWAYS AS (
        to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))
    ) STORED;

CREATE INDEX idx_products_search ON products USING GIN(search_vector);

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Aluminium', 'Kitchen', 'Shower', 'Railing')),
    description TEXT,
    short_description TEXT,
    features TEXT[] DEFAULT '{}',
    starting_price_kes INTEGER,
    image_url TEXT,
    gallery TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_is_active ON services(is_active);
CREATE INDEX idx_services_is_featured ON services(is_featured);
CREATE INDEX idx_services_sort_order ON services(sort_order);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Products: Allow public read access to active products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active products"
    ON products
    FOR SELECT
    USING (is_active = true);

-- Services: Allow public read access to active services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active services"
    ON services
    FOR SELECT
    USING (is_active = true);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at 
    BEFORE UPDATE ON services 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA - PRODUCTS
-- ============================================

-- EV Bikes
INSERT INTO products (name, slug, price_kes, category, sub_category, description, specs, image_url, inventory_count, is_active, is_featured, brand, sku) VALUES
('Spiro Ekon 450 M1V2', 'spiro-ekon-450-m1v2', 85000, 'EV', 'E-Bike', 'High-performance electric bike with GPS tracking and battery swapping capability. Perfect for urban commuting with zero emissions.', '{"motor": "450W Brushless", "battery": "48V 20Ah Swappable", "range": "60-80km", "max_speed": "45km/h", "gps": true, "payload": "150kg", "charging_time": "4 hours", "warranty": "2 years"}', 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800', 15, true, true, 'Spiro', 'EV-SPIRO-001'),
('E-Bike Battery Pack', 'e-bike-battery-pack', 25000, 'EV', 'Accessories', 'Replacement/swappable battery pack for Spiro E-Bike. Long-lasting lithium-ion cells.', '{"voltage": "48V", "capacity": "20Ah", "type": "Lithium-ion", "cycles": "800+"}', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 30, true, false, 'Spiro', 'EV-BAT-001'),
('Battery Swap Subscription', 'battery-swap-subscription', 3500, 'EV', 'Services', 'Monthly battery swapping subscription for unlimited battery exchanges at any TAMTECH station.', '{"validity": "30 days", "swaps": "Unlimited", "locations": "All TAMTECH stations"}', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800', 999, true, true, 'TAMTECH', 'EV-SUB-001');

-- Tools - Hand Tools
INSERT INTO products (name, slug, price_kes, category, sub_category, description, specs, image_url, inventory_count, is_active, brand, sku) VALUES
('Stanley Claw Hammer 16oz', 'stanley-claw-hammer-16oz', 1200, 'Tools', 'Hand', 'Professional grade claw hammer with fiberglass handle. Perfect for construction and DIY projects.', '{"weight": "16oz", "handle": "Fiberglass", "head_material": "Forged Steel", "length": "330mm"}', 'https://images.unsplash.com/photo-1581147036324-c17ac41dd161?w=800', 50, true, 'Stanley', 'TOOL-HAND-001'),
('Bosch Screwdriver Set 6pcs', 'bosch-screwdriver-set-6pcs', 1800, 'Tools', 'Hand', 'Precision screwdriver set with ergonomic handles and magnetic tips.', '{"pieces": 6, "material": "Chrome Vanadium", "magnetic": true, "case": "Plastic"}', 'https://images.unsplash.com/photo-1581147036324-c17ac41dd161?w=800', 35, true, 'Bosch', 'TOOL-HAND-002'),
('Adjustable Wrench 10"', 'adjustable-wrench-10', 950, 'Tools', 'Hand', 'Heavy-duty adjustable wrench with chrome finish. Universal fit for various bolt sizes.', '{"size": "10 inch", "material": "Chrome Vanadium", "jaw_capacity": "30mm"}', 'https://images.unsplash.com/photo-1581147036324-c17ac41dd161?w=800', 40, true, 'Generic', 'TOOL-HAND-003');

-- Tools - Power Tools
INSERT INTO products (name, slug, price_kes, category, sub_category, description, specs, image_url, inventory_count, is_active, brand, sku) VALUES
('Makita Cordless Drill 18V', 'makita-cordless-drill-18v', 18500, 'Tools', 'Power', 'Professional 18V cordless drill driver with lithium battery. Variable speed with hammer function.', '{"voltage": "18V", "battery": "3.0Ah Li-ion", "rpm": "0-1,900", "torque": "42Nm", "chuck": "13mm"}', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800', 20, true, 'Makita', 'TOOL-POW-001'),
('Bosch Angle Grinder 4.5"', 'bosch-angle-grinder-4-5', 12500, 'Tools', 'Power', '710W angle grinder for cutting and grinding. Compact design with overload protection.', '{"power": "710W", "disc_size": "115mm", "rpm": "11,000", "spindle": "M14"}', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800', 18, true, 'Bosch', 'TOOL-POW-002'),
('Circular Saw 7.25" 1200W', 'circular-saw-7-25-1200w', 14500, 'Tools', 'Power', 'Powerful circular saw for precise wood cutting. Adjustable depth and bevel settings.', '{"power": "1200W", "blade_size": "185mm", "cutting_depth": "65mm", "rpm": "5,500"}', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800', 12, true, 'Generic', 'TOOL-POW-003');

-- Building Materials - Aluminium
INSERT INTO products (name, slug, price_kes, category, sub_category, description, specs, image_url, inventory_count, is_active, brand, sku) VALUES
('Aluminium Sliding Window 1200x900mm', 'aluminium-sliding-window-1200x900', 8500, 'Materials', 'Aluminium', 'Powder-coated aluminium sliding window with mosquito mesh. Double glazed.', '{"frame": "Aluminium 1.2mm", "glass": "5mm tempered", "finish": "Powder coat", "mesh": "Fiberglass"}', 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800', 8, true, 'TAMTECH', 'MAT-ALU-001'),
('Aluminium Casement Window 600x900mm', 'aluminium-casement-window-600x900', 6500, 'Materials', 'Aluminium', 'Side-hung casement window with multi-point locking system.', '{"frame": "Aluminium 1.4mm", "glass": "5mm clear", "hinges": "SS 304", "lock": "Multi-point"}', 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800', 12, true, 'TAMTECH', 'MAT-ALU-002');

-- Building Materials - Tiles
INSERT INTO products (name, slug, price_kes, category, sub_category, description, specs, image_url, inventory_count, is_active, brand, sku) VALUES
('Ceramic Floor Tiles 600x600mm', 'ceramic-floor-tiles-600x600', 1200, 'Materials', 'Tiles', 'High-quality ceramic tiles for floor and wall applications. Glossy finish.', '{"size": "600x600mm", "material": "Ceramic", "finish": "Glossy", "box_quantity": 4, "sqm_per_box": 1.44}', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 500, true, 'RAK', 'MAT-TILE-001'),
('Porcelain Tiles 800x800mm', 'porcelain-tiles-800x800', 2200, 'Materials', 'Tiles', 'Premium porcelain tiles suitable for high-traffic areas. Matte finish.', '{"size": "800x800mm", "material": "Porcelain", "finish": "Matte", "thickness": "9mm", "box_quantity": 3}', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 300, true, 'RAK', 'MAT-TILE-002');

-- ============================================
-- SEED DATA - SERVICES
-- ============================================
INSERT INTO services (name, slug, category, description, short_description, features, starting_price_kes, image_url, is_active, is_featured, sort_order) VALUES
('Aluminium Windows & Doors', 'aluminium-windows-doors', 'Aluminium', 'Custom fabrication and professional installation of premium aluminium windows and doors. We offer sliding windows, casement windows, sliding doors, and bi-fold doors in various powder-coat colors to match your architectural style.', 'Custom fabrication and installation of premium aluminium windows and doors', '{"Custom sizes to fit your openings", "Powder-coat finish in multiple colors", "Double-glazed or single-glazed options", "Mosquito mesh integration", "Professional installation included", "10-year warranty on frames"}', 15000, 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800', true, true, 1),

('Modular Kitchens', 'modular-kitchens', 'Kitchen', 'Complete kitchen solutions including cabinets, countertops, and appliances. We design, fabricate, and install modern kitchens with high-quality materials including granite, quartz, and marine plywood.', 'Complete kitchen solutions with cabinets, countertops, and appliances', '{"3D design visualization before fabrication", "Marine plywood cabinets (waterproof)", "Granite/Quartz countertop options", "Soft-close hinges and drawers", "LED lighting integration", "5-year warranty on craftsmanship"}', 85000, 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', true, true, 2),

('Modern Wardrobes', 'modern-wardrobes', 'Kitchen', 'Built-in and walk-in wardrobe solutions with sliding or hinged doors. Features include adjustable shelves, hanging rods, drawers with organizers, and mirror integration.', 'Built-in and walk-in wardrobe solutions with customizable interiors', '{"Sliding or hinged door options", "Mirror door integration", "Adjustable shelf heights", "Tie/belt organizers", "Shoe rack compartments", "LED interior lighting"}', 45000, 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800', true, false, 3),

('Shower Cubicles & Enclosures', 'shower-cubicles-enclosures', 'Shower', 'Modern glass shower cubicles and enclosures with tempered safety glass. Available in framed, semi-framed, and frameless designs with various glass tint options.', 'Modern glass shower cubicles with tempered safety glass', '{"8mm tempered safety glass", "Clear, frosted, or tinted glass options", "Anti-slip tray options", "Chrome or matte black hardware", "Water-sealing rubber gaskets", "2-year warranty on installation"}', 35000, 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=800', true, true, 4),

('Stainless Steel Railings', 'stainless-steel-railings', 'Railing', 'Elegant SS 304 grade railings for balconies, staircases, and terraces. Available in glass-infill, rod-infill, and solid designs with mirror or satin finishes.', 'Elegant SS 304 railings for balconies and staircases', '{"SS 304 marine-grade stainless steel", "Glass or rod infill options", "Mirror or satin finish", "Welded or modular installation", "Weather-resistant coating", "5-year rust-free guarantee"}', 5500, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', true, false, 5),

('MS (Mild Steel) Railings', 'ms-railings', 'Railing', 'Cost-effective mild steel railings with powder-coat or paint finish. Ideal for budget-conscious projects while maintaining safety and aesthetics.', 'Cost-effective MS railings with powder-coat finish', '{"2mm thick MS construction", "Powder-coat or paint finish", "Multiple color options", "Vertical bar or fancy designs", "Anti-rust primer coating", "2-year warranty"}', 3500, 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', true, false, 6);

-- ============================================
-- SEARCH FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION search_products(search_query TEXT)
RETURNS SETOF products AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM products
    WHERE 
        search_vector @@ plainto_tsquery('english', search_query)
        OR name ILIKE '%' || search_query || '%'
        OR category ILIKE '%' || search_query || '%'
        OR sub_category ILIKE '%' || search_query || '%'
        OR specs::text ILIKE '%' || search_query || '%'
    ORDER BY 
        ts_rank(search_vector, plainto_tsquery('english', search_query)) DESC,
        name ASC;
END;
$$ LANGUAGE plpgsql STABLE;

-- Create RPC for fuzzy search (can be called from frontend)
COMMENT ON FUNCTION search_products IS 'Fuzzy search across product name, description, category, and specs';
