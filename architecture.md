# Technical Architecture (`architecture.md`)

## 1. Tech Stack Overview
- **Frontend Framework:** Next.js 14+ (App Router) or Vite + React 18+ (TypeScript)
- **Styling:** Tailwind CSS v3.4+
- **Animation & Motion:** Framer Motion, HTML5 Canvas, Canvas Confetti
- **Icons:** Lucide React (`lucide-react`)
- **Backend & Database:** Supabase (PostgreSQL with Row Level Security & Realtime)
- **Deployment Target:** Vercel

---

## 2. Directory Structure

```
src/
├── app/ (or src/components/)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── EntryGateModal.tsx      # Unboxing envelope video & audio unlock
│   ├── AudioPlayer.tsx         # Floating sound toggle button
│   ├── HeroSection.tsx         # Bismillah calligraphy, couple title & countdown[cite: 1, 2]
│   ├── ScratchCard.tsx         # High-DPI HTML5 canvas scratch interaction
│   ├── FamilyBlessings.tsx     # Formal lineage & parents' honors[cite: 1, 2]
│   ├── EventCard.tsx           # Haldi & Barat ceremony cards[cite: 1, 2]
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

## 3. Database Schema & Security (Supabase SQL)

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

## 4. Key Module Mechanics

### 4.1. Audio & Gate Synchronizer (`EntryGateModal.tsx`)
- Covers viewport with `z-50` fixed modal.
- User tap event simultaneously triggers `.play()` on `<video>` and `<audio>`.
- At 5.5s, applies CSS opacity transition and unmounts to display hero content.

### 4.2. Scratch Date Canvas Engine (`ScratchCard.tsx`)
- Calculates device pixel scaling (`window.devicePixelRatio`) to render sharp lines on mobile retina screens.
- Utilizes `ctx.globalCompositeOperation = 'destination-out'` with circular caps.
- Auto-completes reveal and launches confetti burst once cleared pixels exceed 50%.

### 4.3. Navigation & Calendar Utilities (`calendarHelper.ts`)
- Builds Google Calendar deep-links and compliant standard RFC 5545 `.ics` iCalendar text streams.
- Direct GPS routing link for Barat: `https://www.google.com/maps/dir/?api=1&destination=Maanbhag+Palace`[cite: 1, 2].