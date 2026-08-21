import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Navigation, Sparkles, CalendarPlus, Download } from 'lucide-react';
import {
  CalendarEventDetails,
  HALDI_EVENT,
  BARAT_EVENT,
  WALIMA_EVENT,
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
  dressCode: string;
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
      badge: '01 | WEDNESDAY | December 23, 2026 • 05:30 PM Onwards',
      badgeBg: 'bg-[#F5E08E]/40 border-[#D4AF37]/60 text-[#4A0E17]',
      badgeText: 'text-[#4A0E17]',
      title: 'Haldi Ceremony',
      subtitle: 'Traditional Turmeric Blessings & Festive Glow',
      dressCode: 'Haldi Yellows, Ochre & Floral Pastels',
      dateStr: 'Wednesday, 23 December 2026',
      timeStr: '05:30 PM Onwards',
      venueName: 'At Our Residence',
      venueNote: "(Bride's House, Jaipur, Rajasthan)",
      description:
        'A joyful evening filled with the warmth of golden turmeric blessings, fragrant floral garlands, and traditional celebratory music with beloved family and friends.',
      calendarEvent: HALDI_EVENT,
      icsFileName: 'sheima-sabir-haldi.ics',
      mapUrl: 'https://maps.google.com/?q=At+Our+Residence+Jaipur',
      mapLabel: 'View on Maps',
      isNavigation: false,
    },
    {
      id: 'barat',
      badge: '02 | SATURDAY | December 26, 2026 • 09:30 PM Onwards',
      badgeBg: 'bg-[#4A0E17]/15 border-[#D4AF37]/60 text-[#4A0E17]',
      badgeText: 'text-[#4A0E17]',
      title: 'The Barat & Nikah',
      subtitle: 'Grand Nikah Ceremony & Royal Feast',
      dressCode: 'Traditional Royal & Formal Festive Wear',
      dateStr: 'Saturday, 26 December 2026',
      timeStr: '09:30 PM Onwards',
      venueName: 'Rose Garden',
      venueNote: '(Jaipur, Rajasthan)',
      description:
        "Welcoming the Groom's royal procession, solemnizing the sacred Nikah vows, followed by a lavish imperial banquet dinner and heartfelt felicitations.",
      calendarEvent: BARAT_EVENT,
      icsFileName: 'sheima-sabir-barat.ics',
      mapUrl: 'https://maps.app.goo.gl/7Y6TfdRtHpaHWaNM6?g_st=ac',
      mapLabel: 'Turn-by-Turn GPS Directions',
      isNavigation: true,
    },
    {
      id: 'walima',
      badge: '03 | MONDAY | December 28, 2026 • 08:00 PM Onwards',
      badgeBg: 'bg-[#C89D2B]/20 border-[#D4AF37]/60 text-[#4A0E17]',
      badgeText: 'text-[#4A0E17]',
      title: 'Walima Reception',
      subtitle: "Grand Evening Reception & Celebratory Dinner hosted by Groom's Family",
      dressCode: 'Grand Evening Formals & Classic Silks',
      dateStr: 'Monday, 28 December 2026',
      timeStr: '08:00 PM Onwards',
      venueName: "At Groom's Residence",
      venueNote: '(Jaipur, Rajasthan)',
      description:
        "A grand celebratory banquet reception hosted by the Groom's family to celebrate the auspicious union and welcome the newlyweds with love, prayers, and blessings.",
      calendarEvent: WALIMA_EVENT,
      icsFileName: 'sheima-sabir-walima.ics',
      mapUrl: 'https://maps.google.com/?q=At+Grooms+Residence+Jaipur',
      mapLabel: 'View on Maps',
      isNavigation: false,
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
            <div className="relative p-5 sm:p-7 rounded-t-[50px] sm:rounded-t-[60px] rounded-b-3xl bg-white/95 backdrop-blur-sm border-[1.5px] border-[#D4AF37]/50 shadow-xl overflow-hidden">
              {/* Corner Star Filigree */}
              <div className="absolute top-4 left-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
                ✦ ✧ ✦
              </div>
              <div className="absolute top-4 right-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
                ✦ ✧ ✦
              </div>

              {/* Event Badge */}
              <div className="pt-2 text-center mb-3">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.14em] sm:tracking-[0.18em] font-bold border shadow-sm ${evt.badgeBg}`}>
                  <Sparkles className="w-3 h-3 text-[#C89D2B] shrink-0" />
                  <span>{evt.badge}</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="text-center mb-3 space-y-1">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E17] leading-tight">
                  {evt.title}
                </h3>
                <p className="text-xs sm:text-sm font-serif italic text-[#6D1A27] font-medium leading-relaxed">
                  {evt.subtitle}
                </p>
              </div>

              {/* Dress Code Pill */}
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F2] border border-[#D4AF37]/45 text-[10px] sm:text-[11px] font-sans font-medium text-[#4A0E17] shadow-sm">
                  <span className="text-xs">👗</span>
                  <span className="font-bold">Dress Code:</span>
                  <span className="text-[#6D1A27]">{evt.dressCode}</span>
                </div>
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
                    <span>+ Add to Google Cal</span>
                  </motion.a>

                  <motion.button
                    onClick={() => downloadIcsFile(evt.calendarEvent, evt.icsFileName)}
                    whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px rgba(74, 14, 23, 0.18)' }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-reflect inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl border border-[#D4AF37] bg-white text-[#4A0E17] hover:bg-[#4A0E17]/5 text-[11px] uppercase tracking-wider font-sans font-bold transition-all shadow-sm text-center cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C89D2B]" />
                    <span>🍏 Apple / .ics</span>
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
