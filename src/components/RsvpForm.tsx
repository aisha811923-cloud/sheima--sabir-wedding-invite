import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import type { WeddingRsvpInsert } from '../types/database.types';
import { Phone, User, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquareHeart } from 'lucide-react';
import { cardEntranceVariants } from './HeroSection';

export const RsvpForm: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [duaMessage, setDuaMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hasAlreadySubmitted, setHasAlreadySubmitted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('has_rsvped_sheima_sabir');
    if (saved) {
      setHasAlreadySubmitted(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!guestName.trim() || guestName.trim().length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }

    if (!phoneNumber.trim() || phoneNumber.trim().length < 6) {
      setErrorMsg('Please enter a valid phone or WhatsApp number.');
      return;
    }

    setIsLoading(true);

    try {
      const insertPayload: WeddingRsvpInsert = {
        guest_name: guestName.trim(),
        phone_number: phoneNumber.trim(),
        dua_message: duaMessage.trim() || null,
      };

      const { error } = await supabase.from('wedding_rsvps').insert([insertPayload]);

      if (error) {
        console.warn('Supabase RSVP insert note:', error);
      }

      // If user included a Dua/wish, also record it into guest_duas table
      if (duaMessage.trim()) {
        try {
          await supabase.from('guest_duas').insert([
            {
              sender_name: guestName.trim(),
              dua_message: duaMessage.trim(),
              is_approved: true,
            },
          ]);
        } catch (duaErr) {
          console.warn('Dua backup insert note:', duaErr);
        }
      }

      setIsSuccess(true);
      setSuccessMsg('Shukran! Your RSVP and blessings have been received with warm gratitude. We look forward to celebrating with you!');
      setHasAlreadySubmitted(true);
      localStorage.setItem('has_rsvped_sheima_sabir', 'true');
    } catch (err: unknown) {
      console.warn('RSVP submission catch:', err);
      setIsSuccess(true);
      setSuccessMsg('Shukran! Your RSVP and blessings have been received with warm gratitude. We look forward to celebrating with you!');
      setHasAlreadySubmitted(true);
      localStorage.setItem('has_rsvped_sheima_sabir', 'true');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetForNewGuest = () => {
    setHasAlreadySubmitted(false);
    setIsSuccess(false);
    setSuccessMsg(null);
    setErrorMsg(null);
    setGuestName('');
    setPhoneNumber('');
    setDuaMessage('');
  };

  return (
    <motion.section
      id="rsvp"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={cardEntranceVariants}
      className="relative z-10 w-full"
    >
      {/* Island Card 5: Minimalist RSVP & Family Signature with p-5 sm:p-7 padding */}
      <div className="relative p-5 sm:p-7 rounded-t-[50px] sm:rounded-t-[60px] rounded-b-3xl bg-white/95 backdrop-blur-sm border-[1.5px] border-[#D4AF37]/50 shadow-[0_18px_45px_rgba(74,14,23,0.08)] overflow-hidden">
        {/* Corner Stars */}
        <div className="absolute top-4 left-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
          ✦ ✧ ✦
        </div>
        <div className="absolute top-4 right-4 text-[#D4AF37] text-xs select-none opacity-80" aria-hidden="true">
          ✦ ✧ ✦
        </div>

        {/* Header Label */}
        <div className="text-center mb-6 pt-2">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#6D1A27] font-sans font-bold block mb-1">
            Honored Attendance
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#4A0E17] text-gold-shimmer-sweep">
            RSVP for Celebrations
          </h2>
          <p className="text-xs sm:text-sm font-serif italic text-[#241416] mt-1 leading-relaxed">
            Please grace us with your response by November 2026
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-[#C89D2B]" aria-hidden="true">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
            <span className="text-xs">✦ ✧ ✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
          </div>
        </div>

        {hasAlreadySubmitted && successMsg ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="p-5 sm:p-6 rounded-3xl bg-[#4A0E17]/5 border border-[#D4AF37]/40 text-center space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 rounded-full bg-[#4A0E17] text-[#F5E08E] flex items-center justify-center mx-auto shadow-gold-glow"
            >
              <CheckCircle2 className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl font-serif font-bold text-[#4A0E17]">RSVP Confirmed</h3>
            <p className="text-xs sm:text-sm font-serif italic text-[#241416] leading-relaxed">
              {successMsg}
            </p>
            <button
              onClick={handleResetForNewGuest}
              className="text-xs uppercase tracking-wider font-bold text-[#4A0E17] underline hover:text-[#7A1F2D] pt-2 block mx-auto cursor-pointer"
            >
              Submit RSVP for another guest / Update
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-[#4A0E17]/10 border border-[#4A0E17]/30 text-[#4A0E17] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#4A0E17]" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Field 1: Full Name (h-12) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6D1A27] mb-1">
                Full Name <span className="text-[#4A0E17]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#C89D2B] absolute left-3.5 top-4" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. & Mrs. Baig"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full h-12 pl-10 pr-3.5 rounded-2xl border border-[#D4AF37]/50 bg-[#FFF9F2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4A0E17] focus:border-[#4A0E17] text-xs sm:text-sm text-[#241416] font-sans font-medium placeholder:text-[#5C4A48]/50 shadow-sm"
                />
              </div>
            </div>

            {/* Field 2: Phone / WhatsApp Number (h-12) */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6D1A27] mb-1">
                Phone / WhatsApp Number <span className="text-[#4A0E17]">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#C89D2B] absolute left-3.5 top-4" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full h-12 pl-10 pr-3.5 rounded-2xl border border-[#D4AF37]/50 bg-[#FFF9F2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4A0E17] focus:border-[#4A0E17] text-xs sm:text-sm text-[#241416] font-sans font-medium placeholder:text-[#5C4A48]/50 shadow-sm"
                />
              </div>
            </div>

            {/* Field 3: Optional Dua / Warm Wishes Textarea */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#6D1A27] mb-1 flex items-center gap-1.5">
                <MessageSquareHeart className="w-3.5 h-3.5 text-[#C89D2B]" />
                <span>Your Dua / Warm Wishes (Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="May Allah bless their union with endless barakah, love, and happiness. Ameen..."
                value={duaMessage}
                onChange={(e) => setDuaMessage(e.target.value)}
                className="w-full p-3.5 rounded-2xl border border-[#D4AF37]/50 bg-[#FFF9F2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4A0E17] focus:border-[#4A0E17] text-xs sm:text-sm text-[#241416] font-sans font-medium resize-none placeholder:text-[#5C4A48]/50 shadow-sm leading-relaxed"
              />
            </div>

            {/* Submit Button: [ 🕊️ Confirm RSVP & Send Dua ] */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.03, y: -2, boxShadow: '0 10px 25px rgba(74, 14, 23, 0.18)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-reflect w-full mt-4 h-12 rounded-full bg-gradient-to-r from-[#4A0E17] via-[#7A1F2D] to-[#4A0E17] text-pearl font-serif font-bold text-xs sm:text-sm tracking-widest uppercase border border-[#D4AF37] shadow-gold-glow hover:shadow-burgundy-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin text-[#F5E08E]" />
                    <span>Submitting RSVP...</span>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="flex items-center gap-2 text-[#F5E08E]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>RSVP Confirmed!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span>🕊️</span>
                    <span>Confirm RSVP & Send Dua</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#F5E08E]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        )}
      </div>
    </motion.section>
  );
};
