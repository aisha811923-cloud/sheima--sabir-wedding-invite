# Implementation Plan

### Phase 1: Project Setup & Design System Initialization
- [x] Initialize repository with React/Next.js (App Router), TypeScript, and Tailwind CSS.
- [x] Configure `design.md` color tokens in `tailwind.config.js`:
  - `bg-pearl`: `#FAF6F0`
  - `burgundy-primary`: `#4A0E17`
  - `burgundy-secondary`: `#7A1F2D`
  - `gold-primary`: `#D4AF37`
  - `gold-border`: `#E5C158`
  - `text-charcoal`: `#1F1617`
  - `slate-burgundy`: `#5C4A48`
- [x] Load Google Fonts: `Amiri` (Arabic Calligraphy), `Cormorant Garamond` (Serif Display), and `Plus Jakarta Sans` (Body Text).
- [x] Install core dependencies: `lucide-react`, `framer-motion`, `canvas-confetti`, `@supabase/supabase-js`.

---

### Phase 2: Database Schema & Supabase Setup
- [x] Initialize Supabase project and link environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`).
- [x] Execute database migrations / TypeScript schemas:
  - Table `wedding_rsvps` (guest_name, phone_number, guest_count, attending_haldi, attending_barat).
  - Table `guest_duas` (sender_name, dua_message, is_approved).
- [x] Enable Row Level Security (RLS) and apply public insert/select security policies.
- [x] Create singleton client helper `src/lib/supabaseClient.ts`.

---

### Phase 3: Interactive Unboxing Gate & Audio Control
- [x] Place compressed unboxing video (`entry-video.mp4`) and instrumental audio in `public/`.
- [x] Implement `src/components/EntryGateModal.tsx`:
  - Fullscreen fixed overlay (`z-50`) with "Tap to Open Invitation" gold seal button.
  - User click triggers simultaneous playback of `<video>` and background ambient audio.
  - Listen for video timestamp (~5.5s) to trigger CSS fade-out (`opacity: 0`).
  - Unmount modal cleanly from DOM upon animation completion.
- [x] Implement `src/components/AudioPlayer.tsx`:
  - Floating top-right audio pill with dynamic play/pause mute toggle and equalizer bars animation.

---

### Phase 4: Hero Announcement, Scratch Card & Countdown
- [x] Implement `src/components/HeroSection.tsx`:
  - Render Arabic Bismillah calligraphy (`بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ`) and English translation.
  - Display couple typography: **Sheima Baig & Sabir Baig**.
- [x] Implement `src/components/ScratchCard.tsx`:
  - Initialize HTML5 `<canvas>` scaled with `window.devicePixelRatio` for sharp retina rendering.
  - Fill with gold foil gradient overlay and scratch prompt text.
  - Implement touch/drag erase mechanics using `ctx.globalCompositeOperation = 'destination-out'`.
  - Track cleared percentage using `ctx.getImageData()`; fire `canvas-confetti` and reveal **December 2026** when cleared >50%.
- [x] Implement `src/components/CountdownTimer.tsx`:
  - Compute dynamic difference between `Date.now()` and December 2026 target date.
  - Display formatted grid: Days, Hours, Minutes, Seconds.

---

### Phase 5: Family Lineage & Ceremony Cards (Haldi & Barat)
- [x] Implement `src/components/FamilyBlessings.tsx`:
  - Heavenly blessings card honoring Late Wahid Baig (Dada Ji).
  - Bride's Parents: Shaheen Baig & Shabnam Baig.
  - Groom's Parents: Shahid Baig & Shahida Baig.
  - Family closing line: "With best compliments from Baig Family & Relatives".
- [x] Implement `src/lib/calendarHelper.ts`:
  - Google Calendar web URL builder (`https://calendar.google.com/calendar/render?...`).
  - Dynamic `.ics` file generator using `text/calendar` Data URI.
- [x] Implement `src/components/EventCard.tsx`:
  - **Haldi Ceremony Card:** Venue at "At Our Residence (Bride's House)" + Calendar Sync + Maps Link.
  - **Barat Ceremony Card:** Venue at "Maanbhag Palace" + Calendar Sync + Turn-by-Turn GPS Directions (`https://www.google.com/maps/dir/?api=1&destination=Maanbhag+Palace`).
  - Verify Walima card is completely omitted.

---

### Phase 6: Supabase RSVP & Digital Duas Wall
- [x] Implement `src/components/RsvpForm.tsx`:
  - Build validated form: Guest Name, Phone Number, Guest Count, Attending Ceremonies (Haldi, Barat).
  - Handle Supabase insertion with loading spinner, error validation, and confirmation toast.
  - Persist submission state in `localStorage` to prevent duplicate spam.
- [x] Implement `src/components/DuasWall.tsx`:
  - Form input for guests to leave a prayer/message for Sheima & Sabir.
  - Query approved entries from `guest_duas` table and render in a responsive masonry grid.
  - Set up Supabase Realtime subscription (`supabase.channel()`) to live-update incoming duas.

---

### Phase 7: Polish, QA & Deployment
- [x] Add `src/components/ParticleCanvas.tsx` for ambient floating gold dust background particles.
- [x] Conduct cross-browser mobile testing:
  - iOS Safari (Audio unlock verification & canvas touch gestures).
  - Android Chrome (Video hardware acceleration & Google Maps deep linking).
- [x] Verify production build (`npm run build`) compiles with 0 errors.