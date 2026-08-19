# Technical Requirements Document (TRD)

## 1. System Architecture & Tech Stack

### 1.1. Core Technologies
- Framework: Next.js 14+ (App Router) or Vite + React 18+ (TypeScript)
- Styling: Tailwind CSS v3.4+
- Animations: Framer Motion, Canvas Confetti
- Icons: Lucide React (lucide-react)
- Backend / Database: Supabase (PostgreSQL, Row Level Security, Realtime)
- Hosting: Vercel

---

## 2. Directory Structure

```
src/
├── app/ (or src/)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── EntryGateModal.tsx      # Unboxing envelope video & audio unlock
│   ├── AudioPlayer.tsx         # Floating sound toggle button
│   ├── HeroSection.tsx         # Bismillah calligraphy, couple title & countdown
│   ├── ScratchCard.tsx         # High-DPI HTML5 canvas scratch interaction
│   ├── FamilyBlessings.tsx     # Lineage & parents' honors
│   ├── EventCard.tsx           # Haldi & Barat ceremony cards
│   ├── AddToCalendarBtn.tsx    # Google Calendar URL + .ics file exporter
│   ├── RsvpForm.tsx            # Form handling & Supabase insertion
│   ├── DuasWall.tsx            # Realtime feed of guest prayers
│   └── ParticleCanvas.tsx      # Gold dust background particle canvas
├── lib/
│   ├── supabaseClient.ts       # Typed Supabase client singleton
│   └── calendarHelper.ts       # .ics generator & Google Calendar builder
├── types/
│   └── database.types.ts       # Generated Supabase TypeScript definitions
└── public/
    ├── assets/
    │   ├── entry-gate.mp4      # 9:16 unboxing video
    │   └── audio.mp3           # Ambient background audio
    └── fonts/
```

---

## 3. Database Schema & Security (Supabase PostgreSQL)

```sql
-- 1. Create RSVP Responses Table
create table public.wedding_rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  guest_name text not null check (char_length(guest_name) >= 2),
  phone_number text not null,
  guest_count integer default 1 check (guest_count >= 1 and guest_count <= 20),
  attending_haldi boolean default false,
  attending_barat boolean default true
);

-- 2. Create Guest Duas / Wishes Table
create table public.guest_duas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  sender_name text not null check (char_length(sender_name) >= 2),
  dua_message text not null check (char_length(dua_message) >= 3),
  is_approved boolean default true
);

-- 3. Row Level Security (RLS) Configuration
alter table public.wedding_rsvps enable row level security;
alter table public.guest_duas enable row level security;

-- Public can submit RSVPs
create policy "Enable insert for public RSVPs"
  on public.wedding_rsvps
  for insert
  with check (true);

-- Public can submit Duas
create policy "Enable insert for public Duas"
  on public.guest_duas
  for insert
  with check (true);

-- Public can read approved Duas
create policy "Enable select for approved Duas"
  on public.guest_duas
  for select
  using (is_approved = true);
```

---

## 4. Key Technical Implementations

### 4.1. Audio Playback & Unboxing Gate (EntryGateModal.tsx)
- Mobile browsers block audio autoplay unless triggered by a user gesture.
- The gate overlay sits at `z-index: 50` covering the viewport.
- Tapping "Tap to Open Invitation" executes:
  1. Calls `.play()` on both `<video>` and `<audio>` elements.
  2. Sets video playback speed to `1.0x`.
  3. Triggers `opacity: 0` CSS fade transition after 5.5 seconds.
  4. Removes the gate overlay from layout flow (`display: none`).

### 4.2. High-DPI Scratch Canvas (ScratchCard.tsx)
- Accounts for `window.devicePixelRatio` to prevent blurry scratch strokes on retina displays.
- Scratch Brush:
  - `ctx.globalCompositeOperation = 'destination-out'`
  - `ctx.lineWidth = 40`
  - `ctx.lineCap = 'round'`
- Cleared calculation: Reads pixel data via `ctx.getImageData()`. When cleared area exceeds 50%, fires confetti burst and dissolves remaining canvas overlay.

### 4.3. Calendar Utility Helper (calendarHelper.ts)
- Google Calendar Builder: Generates direct web template URL with encoded title, description, location, and dates.
- `.ics` File Exporter: Builds standard iCalendar payload formatted as `text/calendar` Data URI for 1-tap download on iOS and Outlook.

### 4.4. GPS Deep-Link Navigation
- Barat Venue link: `https://www.google.com/maps/dir/?api=1&destination=Maanbhag+Palace`[cite: 1, 2]
- Launches native Google Maps turn-by-turn driving directions from the guest's current GPS location.

---

## 5. Performance Targets
- Mobile Lighthouse Score: >= 90
- Video Asset: Compressed H.264/MP4 capped under 3 MB
- Audio Asset: MP3 128 kbps capped under 1.5 MB
- Fonts: Next.js font optimization with `font-display: swap` for Amiri, Cormorant Garamond, and Plus Jakarta Sans