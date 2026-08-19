# Product Requirements Document (PRD)

## 1. Project Overview
- **Project Title:** Sheima & Sabir Royal Wedding Web Invitation
- **Target Event Date:** December 2026
- **Aesthetic Direction:** Imperial Burgundy, Warm Pearl Ivory, and Champagne Zari Gold (No green tones)
- **Primary Goal:** Deliver a mobile-first, high-touch luxury Islamic web invitation featuring an interactive unboxing entry gate, scratch-to-reveal date canvas, multi-ceremony calendar and navigation utilities, and a Supabase-backed RSVP and digital Duas guestbook.

---

## 2. Target Audience & Core Personas
- **Invited Guests & Relatives:** Primary access on mobile devices (iOS Safari / Android Chrome) requiring zero-friction event navigation, 1-tap Google Calendar integration, turn-by-turn venue GPS routing, and easy RSVP submission.
- **Host Family:** Access to live RSVP counts and heartfelt Duas/wishes submitted in real time.

---

## 3. Scope & Ceremony Boundaries
- **Included Ceremonies:**
  1. Haldi Ceremony (At Our Residence / Bride's House)
  2. Barat Ceremony — Nikah & Grand Banquet (Maanbhag Palace)
- **Excluded Events:** There is NO Walima ceremony included in this invitation.

---

## 4. User Journey & Feature Specifications

### 4.1. Unboxing Gate Modal (Opening Sequence)
- Full-screen modal overlay with a textured royal maroon envelope graphic/video.
- Prominent interactive gold seal button: *"Tap to Open Invitation"*.
- **Interaction Behavior:**
  - Satisfies browser media autoplay permissions.
  - Plays the 6-second unboxing video transition into a golden particle lens flare.
  - Autoplays looping instrumental background audio.
  - Smoothly fades out the overlay to reveal the main hero section.
- **Audio Control:** Fixed floating mute/unmute button positioned at top-right across all screens.

### 4.2. Sacred Inscription & Hero Announcement
- **Arabic Calligraphy Header:** `بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ`
- **Calligraphy Translation:** *"In the name of Allah, the Most Gracious, the Most Merciful"*[cite: 1, 2]
- **Headline:** Sheima Baig & Sabir Baig[cite: 1, 2]
- **Interactive Scratch-to-Reveal Date Widget:**
  - Interactive gold canvas overlay hiding the target date: **December 2026**.
  - Erased dynamically via touch (`touchmove`) or mouse cursor drag (`mousemove`).
  - Automatically triggers a celebratory sparkle burst and reveals the full date once >50% of the surface is scratched.
- **Live Countdown Timer:** Real-time clock updating every second: `[Days] : [Hours] : [Minutes] : [Seconds]`.

### 4.3. Family Honors & Lineage Hierarchy
- Structured two-column royal Islamic invitation hierarchy:
  - **Heavenly Blessings:** In loving memory and heavenly blessings of Late Wahid Baig (Dada Ji)[cite: 1, 2].
  - **Bride's Parents:** Shaheen Baig & Shabnam Baig[cite: 1, 2].
  - **Groom's Parents:** Shahid Baig & Shahida Baig[cite: 1, 2].
  - **Honorific Footer:** Cordially invited with best compliments from the Baig Family and Relatives.
  - *(Note: Siblings and extended family are not listed individually).*

### 4.4. Ceremony Itinerary Cards

#### Card 1: Haldi Ceremony
- **Date & Time:** Morning Celebration (December 2026)
- **Venue:** At Our Residence (Bride's House)[cite: 1, 2]
- **Description:** A joyful morning celebration of turmeric blessings, love, and traditional floral decor.
- **Utilities:**
  - `[+ Add to Google Calendar]` (Pre-filled event time and location)
  - `[📅 Download .ics]` (For Apple / Outlook Calendar)
  - `[📍 View on Google Maps]`

#### Card 2: Barat Ceremony (Nikah & Grand Banquet)
- **Date & Time:** Auspicious Evening Celebration (December 2026)
- **Venue:** Maanbhag Palace[cite: 1, 2]
- **Description:** Welcoming the Groom's procession and solemnizing the sacred Nikah vows, followed by dinner.
- **Utilities:**
  - `[+ Add to Google Calendar]`
  - `[📅 Download .ics]`
  - `[🚗 Get Turn-by-Turn Directions]` (Direct Google Maps navigation deep-link)

### 4.5. Interactive RSVP System
- Connected directly to Supabase table `wedding_rsvps`.
- **Form Fields:**
  - Full Name (Text, Required)
  - Phone / WhatsApp Number (Text, Required)
  - Total Number of Guests (Integer Counter, Default: 1)
  - Ceremonies Attending (Checkboxes):
    - `[✓] Haldi Ceremony`
    - `[✓] Barat Ceremony`
- **State Handling:** Submitting spinner, instant success toast, and local storage flag to prevent duplicate submissions.

### 4.6. Digital Duas & Warm Wishes Wall
- Connected directly to Supabase table `guest_duas`.
- Allows guests to submit personal prayers and congratulatory messages for Sheima & Sabir[cite: 1, 2].
- Responsive masonry grid displaying submitted prayers in real time.

---

## 5. Non-Functional Requirements
- **Performance:** Optimized bundle size with WebP/SVG assets and compressed MP4 media (< 3 MB).
- **Mobile First:** Responsive layout tuned for 390px–430px viewports before scaling up to tablet and desktop screens.
- **Cross-Browser Compatibility:** Full touch and audio support across Safari (iOS 15+), Chrome (Android/Desktop), and Edge.