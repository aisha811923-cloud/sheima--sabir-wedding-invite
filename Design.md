# Design System & UI Specifications (`design.md`)

## 1. Color Palette: Imperial Burgundy & Zari Gold (*Zari Luxe*)

*Strict Constraint: Do NOT use emerald or pastel green tones.*

### Primary Theme Tokens
- **Base Canvas Background (Pearl Ivory):** `#FAF6F0`
  - Used for the primary body background, providing a warm, luxurious paper texture contrast.
- **Card Surface Background (Porcelain Silk):** `#FFFFFF` / `#F8F3ED`
  - Used for ceremony cards, forms, and content containers.
- **Primary Accent (Imperial Velvet Burgundy):** `#4A0E17`
  - Used for prominent headers, couple names, primary action buttons, and focal borders.
- **Secondary Accent (Crimson Rose):** `#7A1F2D`
  - Used for hover states, active badges, and subtle gradient highlights.
- **Metallic Gold Foil (Zari Champagne Gold):** `#D4AF37`
  - Used for decorative Islamic arches, border lines, icons, and scratch canvas overlay.
- **Muted Border Gold:** `#E5C158` / `#C5A059`
  - Used for 1px card framing, divider stars, and button outlines.
- **Primary Body Typography (Espresso Charcoal):** `#1F1617`
  - Used for body copy, venue descriptions, and names to ensure high readability.
- **Secondary Muted Typography (Slate Burgundy):** `#5C4A48`
  - Used for subheadings, captions, and date labels.

---

## 2. Typography System

### Arabic Inscription Font
- **Primary:** `Amiri`, `Scheherazade New`, serif
- **Usage:** Header Bismillah (`بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ`) and Quranic verses[cite: 1, 2].

### Display & Heading Font
- **Primary:** `Cormorant Garamond`, `Playfair Display`, Georgia, serif
- **Usage:** Couple Names ("Sheima Baig & Sabir Baig"), Ceremony Titles ("Haldi Ceremony", "Barat Ceremony"), Section Headers[cite: 1, 2].

### Body & UI Font
- **Primary:** `Plus Jakarta Sans`, `Inter`, -apple-system, sans-serif
- **Usage:** Event timings, venue details, calendar/maps buttons, form labels, countdown numerals.

---

## 3. UI Components & Visual Motifs

### Islamic Arch (Mihrab) Cards
- Top border curve: `rounded-t-[40px] md:rounded-t-[60px]`.
- Border styling: `1px solid rgba(212, 175, 55, 0.35)`.
- Background styling: Glassmorphic white surface `bg-white/90 backdrop-blur-sm`.

### Ornamental Dividers & Accents
- Geometric 8-point gold stars (`✦ ✧ ✦`) flanking titles.
- Hanging gold tassel (*latkan*) or floral corner flourishes placed symmetrically at container edges.

### Buttons & Interactive CTAs
- **Primary Action (RSVP / Open Gate):**
  - Background: Gradient from `#4A0E17` to `#7A1F2D` with metallic gold border `border border-[#D4AF37]`.
  - Text: `#FAF6F0` with uppercase tracking (`tracking-widest`).
- **Secondary Action (Add to Calendar / Google Maps):**
  - Background: Transparent with `#D4AF37` gold outline and `#4A0E17` typography.
  - Hover state: `bg-[#4A0E17]/5 border-[#4A0E17]`.

### Scratch Canvas Styling
- Surface: Linear gradient mimicking brushed metallic gold (`linear-gradient(135deg, #D4AF37 0%, #F5E08E 50%, #AA7C11 100%)`).
- Prompt text: Centered italicized serif *"✨ Scratch with finger to reveal wedding date"*.

### Ambient Background Particles
- Canvas layer running persistent lightweight floating gold dust specs with subtle drift and pulse animations.