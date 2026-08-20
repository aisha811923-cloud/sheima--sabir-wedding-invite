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
import { cardEntranceVariants } from './HeroSection';
import { ArchConnector } from './ArchConnector';

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
}

export const EventCard: React.FC = () => {
  const events: EventData[] = [
    {
      id: 'haldi',
      badge: 'WEDNESDAY • 23 DECEMBER 2026 • 05:30 PM ONWARDS',
      badgeBg: 'bg-[#F5E08E]/40 border-[#D4AF37]/60 text-[#4A0E17]',
      badgeText: 'text-[#4A0E17]',
      title: 'Haldi Ceremony',
      subtitle: 'Traditional Turmeric Blessings & Floral Joy',
      dateStr: 'Wednesday, 23 December 2026',
      timeStr: '05:30 PM Onwards',
      venueName: 'At Our Residence',
      venueNote: "(Bride's House)",
      description:
        'A joyful evening filled with the warmth of golden turmeric blessings, fragrant floral garlands, and traditional celebratory music with beloved family and friends.',
      calendarEvent: HALDI_EVENT,
      icsFileName: 'sheima-sabir-haldi.ics',
      mapUrl: 'https://maps.google.com/?q=At+Our+Residence',
      mapLabel: 'View on Maps',
      isNavigation: false,
    },
    {
      id: 'barat',
      badge: 'SATURDAY • 26 DECEMBER 2026 • 09:30 PM ONWARDS',
      badgeBg: 'bg-[#4A0E17]/15 border-[#D4AF37]/60 text-[#4A0E17]',
      badgeText: 'text-[#4A0E17]',
      title: 'Barat Ceremony',
      subtitle: 'Nikah Solemnization & Grand Banquet',
      dateStr: 'Saturday, 26 December 2026',
      timeStr: '09:30 PM Onwards',
      venueName: 'Maanbhag Palace',
      venueNote: '(Main Royal Banquet Hall)',
      description:
        "Welcoming the Groom's royal procession, solemnizing the sacred Nikah vows, followed by a lavish imperial banquet dinner and heartfelt felicitations.",
      calendarEvent: BARAT_EVENT,
      icsFileName: 'sheima-sabir-barat.ics',
      mapUrl: 'https://maps.app.goo.gl/981PxrytfNhWm1Rv8',
      mapLabel: 'Turn-by-Turn GPS Directions',
      isNavigation: true,
    },
  ];

  return (
    <div className="w-full relative z-10">
      {events.map((evt, idx) => (
        <React.Fragment key={evt.id}>
          {idx > 0 && <ArchConnector />}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={cardEntranceVariants}
            className="w-full"
          >
            {/* Island Arch Card with comfortable p-5 sm:p-7 padding */}
            <div className="relative p-5 sm:p-7 rounded-t-[50px] sm:rounded-t-[60px] rounded-b-3xl bg-white/95 backdrop-blur-sm border-[1.5px] border-[#D4AF37]/50 shadow-[0_18px_45px_rgba(74,14,23,0.08)] overflow-hidden">
              {/* Corner Star Filigree */}
              <div className="absolute top-4 left-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
                ✦ ✧ ✦
              </div>
              <div className="absolute top-4 right-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
                ✦ ✧ ✦
              </div>

              {/* Event Badge */}
              <div className="pt-2 text-center mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.16em] sm:tracking-[0.2em] font-bold border shadow-sm ${evt.badgeBg}`}>
                  <Sparkles className="w-3 h-3 text-[#C89D2B] shrink-0" />
                  <span>{evt.badge}</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-4 space-y-1">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] leading-tight">
                  {evt.title}
                </h3>
                <p className="text-xs sm:text-sm font-serif italic text-[#6D1A27] font-medium">
                  {evt.subtitle}
                </p>
              </div>

              {/* Event Details Box */}
              <div className="space-y-3 py-4 border-y border-[#D4AF37]/30 my-4 text-xs sm:text-sm bg-[#FFF9F2] px-4 rounded-2xl">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#4A0E17] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#241416] block">{evt.dateStr}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#4A0E17] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#241416] block">{evt.timeStr}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#4A0E17] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#4A0E17] block">{evt.venueName}</span>
                    <span className="text-[#6D1A27] text-xs block font-medium">{evt.venueNote}</span>
                  </div>
                </div>
              </div>

              {/* Description with relaxed line-height */}
              <p className="text-xs sm:text-sm font-normal text-[#241416] leading-relaxed mb-6 italic text-center">
                "{evt.description}"
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <motion.a
                    href={generateGoogleCalendarUrl(evt.calendarEvent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px rgba(74, 14, 23, 0.18)' }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-reflect inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl border border-[#D4AF37] bg-white text-[#4A0E17] hover:bg-[#4A0E17]/5 text-[11px] uppercase tracking-wider font-sans font-bold transition-all shadow-sm text-center"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-[#C89D2B]" />
                    <span>+ Google Cal</span>
                  </motion.a>

                  <motion.button
                    onClick={() => downloadIcsFile(evt.calendarEvent, evt.icsFileName)}
                    whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px rgba(74, 14, 23, 0.18)' }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-reflect inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl border border-[#D4AF37] bg-white text-[#4A0E17] hover:bg-[#4A0E17]/5 text-[11px] uppercase tracking-wider font-sans font-bold transition-all shadow-sm text-center cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C89D2B]" />
                    <span>Download .ics</span>
                  </motion.button>
                </div>

                {/* Map Action Button */}
                <motion.a
                  href={evt.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px rgba(74, 14, 23, 0.18)' }}
                  whileTap={{ scale: 0.97 }}
                  className={`btn-reflect w-full inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full text-xs uppercase tracking-widest font-sans font-bold transition-all duration-300 shadow-md text-center ${
                    evt.isNavigation
                      ? 'bg-gradient-to-r from-[#4A0E17] via-[#7A1F2D] to-[#4A0E17] text-pearl border border-[#D4AF37] shadow-gold-glow'
                      : 'border border-[#D4AF37] bg-white text-[#4A0E17] hover:bg-[#4A0E17]/5'
                  }`}
                >
                  {evt.isNavigation ? (
                    <Navigation className="w-3.5 h-3.5 text-[#F5E08E]" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-[#C89D2B]" />
                  )}
                  <span>{evt.mapLabel}</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
};
