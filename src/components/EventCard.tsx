import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Navigation, Sparkles, CalendarPlus, Download } from 'lucide-react';
import {
  CalendarEventDetails,
  HALDI_EVENT,
  BARAT_EVENT,
  generateGoogleCalendarUrl,
  downloadIcsFile,
} from '../lib/calendarHelper';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

interface EventData {
  id: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  title: string;
  subtitle: string;
  dateStr: string;
  timeStr: string;
  venueName: string;
  venueNote: string;
  description: string;
  calendarEvent: CalendarEventDetails;
  icsFileName: string;
  mapUrl: string;
  mapLabel: string;
  isNavigation: boolean;
  themeAura: string;
}

export const EventCard: React.FC = () => {
  const events: EventData[] = [
    {
      id: 'haldi',
      badge: 'Morning Celebration',
      badgeBg: 'bg-gold-light/40 border-gold/60',
      badgeText: 'text-burgundy-dark',
      title: 'Haldi Ceremony',
      subtitle: 'Traditional Turmeric Blessings & Floral Joy',
      dateStr: 'Wednesday, 23 December 2026',
      timeStr: '10:00 AM Onwards',
      venueName: 'At Our Residence',
      venueNote: "(Bride's House)",
      description:
        'A joyful morning filled with the warmth of golden turmeric blessings, fragrant floral garlands, and traditional celebratory music with beloved family and friends.',
      calendarEvent: HALDI_EVENT,
      icsFileName: 'sheima-sabir-haldi.ics',
      mapUrl: 'https://maps.google.com/?q=At+Our+Residence',
      mapLabel: 'View on Maps',
      isNavigation: false,
      themeAura: 'bg-white/95 border-gold/45',
    },
    {
      id: 'barat',
      badge: 'Evening Celebration',
      badgeBg: 'bg-burgundy/15 border-gold/60',
      badgeText: 'text-burgundy',
      title: 'Barat Ceremony',
      subtitle: 'Nikah Solemnization & Grand Royal Banquet',
      dateStr: 'Saturday, 26 December 2026',
      timeStr: '06:30 PM Onwards',
      venueName: 'Maanbhag Palace',
      venueNote: '(Main Royal Banquet Hall)',
      description:
        "Welcoming the Groom's royal procession, solemnizing the sacred Nikah vows, followed by a lavish imperial banquet dinner and heartfelt felicitations.",
      calendarEvent: BARAT_EVENT,
      icsFileName: 'sheima-sabir-barat.ics',
      mapUrl: 'https://maps.app.goo.gl/981PxrytfNhWm1Rv8',
      mapLabel: 'Turn-by-Turn GPS Directions',
      isNavigation: true,
      themeAura: 'bg-white/95 border-gold/55',
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="py-6 px-1 max-w-md mx-auto z-10 relative space-y-8"
    >
      {/* Section Title */}
      <motion.div variants={itemVariants} className="text-center">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-burgundy font-sans font-bold">
          Ceremony Itinerary
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-burgundy mt-1 text-gold-shimmer-sweep">
          Wedding Ceremonies
        </h2>
        <p className="text-xs font-serif italic text-slateBurgundy mt-1">
          Join us in making these blessed moments memorable
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 text-gold">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-xs">✦ ✧ ✦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </motion.div>

      {/* Two Prominent, Separate Cards with gap-8 */}
      <div className="space-y-8">
        {events.map((evt) => (
          <motion.div
            key={evt.id}
            variants={itemVariants}
            whileHover={{
              y: -4,
              boxShadow: '0 20px 40px -10px rgba(74, 14, 23, 0.16)',
              transition: { duration: 0.3 },
            }}
            className={`p-6 sm:p-8 rounded-t-[48px] rounded-b-[28px] border backdrop-blur-md shadow-card-royal relative overflow-hidden group transition-all duration-300 ${evt.themeAura}`}
          >
            {/* Top Badge & Corner Star */}
            <div className="flex items-center justify-between mb-3.5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-sans uppercase tracking-widest font-bold border shadow-sm ${evt.badgeBg} ${evt.badgeText}`}
              >
                <Sparkles className="w-3 h-3 text-gold-dark" />
                <span>{evt.badge}</span>
              </span>
              <span className="text-gold text-xs">✦ ✧ ✦</span>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-burgundy leading-tight">
              {evt.title}
            </h3>
            <p className="text-xs font-serif italic text-gold-dark font-medium mt-1 mb-4">
              {evt.subtitle}
            </p>

            {/* Event Metadata */}
            <div className="space-y-3 py-3.5 border-y border-gold/25 mb-4 text-xs text-charcoal bg-pearl-light/60 px-3.5 rounded-2xl">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal block">{evt.dateStr}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-charcoal block">{evt.timeStr}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-burgundy shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-burgundy block">{evt.venueName}</span>
                  <span className="text-slateBurgundy text-[11px] block">{evt.venueNote}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs font-serif italic text-slateBurgundy leading-relaxed mb-6">
              "{evt.description}"
            </p>

            {/* Action Buttons: [+ Add to Google Calendar], [📅 Download .ics], [📍/🚗 Map Link] */}
            <div className="space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <motion.a
                  href={generateGoogleCalendarUrl(evt.calendarEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-reflect inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-gold bg-white text-burgundy hover:bg-burgundy/5 text-[11px] uppercase tracking-wider font-sans font-bold transition-all shadow-sm text-center"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-gold-dark" />
                  <span>+ Google Cal</span>
                </motion.a>

                <motion.button
                  onClick={() => downloadIcsFile(evt.calendarEvent, evt.icsFileName)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-reflect inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-gold bg-white text-burgundy hover:bg-burgundy/5 text-[11px] uppercase tracking-wider font-sans font-bold transition-all shadow-sm text-center"
                >
                  <Download className="w-3.5 h-3.5 text-gold-dark" />
                  <span>Download .ics</span>
                </motion.button>
              </div>

              {/* Map Action Button */}
              <motion.a
                href={evt.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`btn-reflect w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs uppercase tracking-widest font-sans font-bold transition-all duration-200 shadow-sm text-center ${
                  evt.isNavigation
                    ? 'bg-gradient-to-r from-burgundy via-burgundy-secondary to-burgundy text-pearl border border-gold hover:shadow-burgundy-glow'
                    : 'border border-gold bg-white text-burgundy hover:bg-burgundy/5'
                }`}
              >
                {evt.isNavigation ? (
                  <Navigation className="w-3.5 h-3.5 text-gold-light" />
                ) : (
                  <MapPin className="w-3.5 h-3.5 text-gold-dark" />
                )}
                <span>{evt.mapLabel}</span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
