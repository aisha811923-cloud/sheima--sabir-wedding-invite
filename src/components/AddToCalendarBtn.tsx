import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, Download, ExternalLink, ChevronDown } from 'lucide-react';
import { generateGoogleCalendarUrl, downloadIcsFile, CalendarEventDetails } from '../lib/calendarHelper';

interface AddToCalendarBtnProps {
  event: CalendarEventDetails;
  icsFileName: string;
}

export const AddToCalendarBtn: React.FC<AddToCalendarBtnProps> = ({ event, icsFileName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGoogleCalendar = () => {
    const url = generateGoogleCalendarUrl(event);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleDownloadIcs = () => {
    downloadIcsFile(event, icsFileName);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full sm:w-auto" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn-reflect w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-gold bg-white/95 text-burgundy hover:bg-burgundy/5 text-xs uppercase tracking-widest font-sans font-bold transition-all duration-200 shadow-sm"
      >
        <CalendarPlus className="w-4 h-4 text-gold-dark" />
        <span>Add to Calendar</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slateBurgundy transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-56 rounded-2xl bg-white border border-gold/50 shadow-2xl z-30 py-2"
        >
          <button
            onClick={handleGoogleCalendar}
            className="w-full text-left px-4 py-2.5 text-xs text-charcoal hover:bg-burgundy/5 flex items-center gap-2.5 transition-colors font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold-dark" />
            <span>Google Calendar (Web)</span>
          </button>
          <button
            onClick={handleDownloadIcs}
            className="w-full text-left px-4 py-2.5 text-xs text-charcoal hover:bg-burgundy/5 flex items-center gap-2.5 transition-colors border-t border-gold/15 font-medium"
          >
            <Download className="w-3.5 h-3.5 text-gold-dark" />
            <span>Apple / Outlook (.ics)</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};
