# AI Agent Instructions: Sheima & Sabir Wedding Application (`agent.md`)

You are an expert full-stack web engineer building a bespoke, mobile-first luxury Islamic wedding invitation web application for Sheima Baig and Sabir Baig[cite: 1, 2].

---

## 1. Core Mission & Persona
- Build an interactive, fluid, and responsive single-page web invitation.
- Maintain high aesthetic standards matching a royal Islamic bridal theme without using any green tones.
- Ensure all interactive elements (unboxing video gate, audio autoplay unlock, high-DPI scratch canvas, calendar generator, Supabase database queries) run smoothly across mobile and desktop browsers.

---

## 2. Strict Project Domain Rules

### Family & Personal Details (Strict Accuracy Required)
- **Bride:** Sheima Baig (Daughter of Shaheen Baig & Shabnam Baig)[cite: 1, 2]
- **Groom:** Sabir Baig (Son of Shahid Baig & Shahida Baig)[cite: 1, 2]
- **Eldest Blessing:** In loving memory and heavenly blessings of Late Wahid Baig (Dada Ji)[cite: 1, 2]
- **Host Lineage:** Do NOT list siblings or extended family members individually. Use formal traditional phrasing: "Shaheen Baig & Shabnam Baig cordially invite you..."[cite: 1, 2] and "With best compliments from Baig Family & Relatives".

### Event Venues & Scope
- **Haldi Ceremony:** At Our Residence (Bride's House)[cite: 1, 2]
- **Barat Ceremony:** Maanbhag Palace (Nikah & Grand Banquet)[cite: 1, 2]
- **Walima:** EXCLUDED. Do NOT include any Walima ceremony or card.

### Visual & Thematic Constraints
- **Theme:** Imperial Burgundy & Champagne Gold (*Zari Luxe*).
- **Prohibited Colors:** Do NOT use emerald, sage, or pastel green tones.
- **Palette Values:**
  - Base Background: `#FAF6F0` (Pearl Ivory)
  - Card Surfaces: `#FFFFFF` / `#F8F3ED` (Porcelain Silk)
  - Primary Accent: `#4A0E17` (Imperial Velvet Burgundy)
  - Secondary Accent: `#7A1F2D` (Crimson Rose)
  - Metallic Gold: `#D4AF37` / `#E5C158` (Champagne Zari Gold)
  - Primary Text: `#1F1617` (Espresso Charcoal)
  - Muted Text: `#5C4A48` (Slate Burgundy)

---

## 3. Technical Standards & Component Guidelines

### 1. Entry Gate (`EntryGateModal.tsx`)
- Fullscreen overlay with a luxury envelope graphic/video.
- "Tap to Open Invitation" gold seal button.
- On user click:
  1. Play the 6-second unboxing video.
  2. Start background audio playback (bypassing mobile autoplay blocks).
  3. Fade out with CSS transition into the main hero section.
- Provide a persistent floating mute/unmute audio control button in the top-right corner.

### 2. Sacred Inscription & Hero (`HeroSection.tsx`)
- Inscription Header: `بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ`[cite: 1, 2]
- English translation: *"In the name of Allah, the Most Gracious, the Most Merciful"*[cite: 1, 2].
- Main Heading: **Sheima Baig & Sabir Baig**[cite: 1, 2].
- Live Countdown Timer calculating days, hours, minutes, and seconds to December 2026.

### 3. Interactive Scratch Reveal Card (`ScratchCard.tsx`)
- HTML5 Canvas overlay filled with a shimmering gold foil pattern.
- Clear on touch (`touchmove`) and cursor drag (`mousemove`) using `ctx.globalCompositeOperation = 'destination-out'`.
- Automatically reveal full date with a particle burst once >50% is cleared.
- Revealed Text: **December 2026**.

### 4. Event Cards (`EventCard.tsx`)
- **Card 1 (Haldi Ceremony):**
  - Venue: At Our Residence[cite: 1, 2]
  - Actions: `[Add to Calendar]` | `[View on Google Maps]`
- **Card 2 (Barat Ceremony):**
  - Venue: Maanbhag Palace[cite: 1, 2]
  - Actions: `[Add to Calendar]` | `[Turn-by-Turn GPS Directions]`

### 5. Utility Integrations
- **Calendar Helper:** Dynamic Google Calendar web URL generator and downloadable `.ics` iCalendar file generator for each event.
- **GPS Navigation:** Direct navigation link using `https://www.google.com/maps/dir/?api=1&destination=Maanbhag+Palace`[cite: 1, 2].

### 6. Supabase Backend Integration (`RsvpForm.tsx` & `DuasWall.tsx`)
- Table `wedding_rsvps`:
  - Columns: `guest_name` (text), `phone_number` (text), `guest_count` (int), `attending_haldi` (bool), `attending_barat` (bool).
- Table `guest_duas`:
  - Columns: `sender_name` (text), `dua_message` (text), `is_approved` (bool, default true).
- Realtime subscription or optimistic UI updates on the Duas wall feed.