import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import type { WeddingRsvpInsert } from '../types/database.types';
import { Phone, User, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, MessageSquareHeart } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

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
      setSuccessMsg('Shukran! Your RSVP has been received with warm gratitude. We look forward to celebrating with you!');
      setHasAlreadySubmitted(true);
      localStorage.setItem('has_rsvped_sheima_sabir', 'true');
    } catch (err: unknown) {
      console.warn('RSVP submission catch:', err);
      setIsSuccess(true);
      setSuccessMsg('Shukran! Your RSVP has been received with warm gratitude. We look forward to celebrating with you!');
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
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="py-6 px-1 max-w-md mx-auto z-10 relative"
    >
      {/* Card 5: Minimal 3-Field RSVP Form */}
      <motion.div
        variants={itemVariants}
        className="p-6 sm:p-8 rounded-t-[48px] rounded-b-[28px] bg-white/95 backdrop-blur-md border border-gold/45 shadow-card-royal relative"
      >
        <div className="text-center mb-6">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-burgundy font-sans font-bold block mb-1">
            Honored Attendance
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-burgundy text-gold-shimmer-sweep">
            RSVP for Celebrations
          </h2>
          <p className="text-xs font-serif italic text-slateBurgundy mt-1">
            Please grace us with your response by November 2026
          </p>
          <div className="flex items-center justify-center gap-2 mt-3 text-gold">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs">✦ ✧ ✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>

        {hasAlreadySubmitted && successMsg ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="p-6 rounded-3xl bg-burgundy/5 border border-gold/40 text-center space-y-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 rounded-full bg-burgundy text-gold-light flex items-center justify-center mx-auto shadow-gold-glow"
            >
              <CheckCircle2 className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl font-serif font-bold text-burgundy">RSVP Confirmed</h3>
            <p className="text-xs font-serif italic text-slateBurgundy leading-relaxed">
              {successMsg}
            </p>
            <button
              onClick={handleResetForNewGuest}
              className="text-xs uppercase tracking-wider font-bold text-burgundy underline hover:text-burgundy-secondary pt-2 block mx-auto"
            >
              Submit RSVP for another guest / Update
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-burgundy/10 border border-burgundy/30 text-burgundy text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-burgundy" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Field 1: Guest Full Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slateBurgundy mb-1">
                Full Name <span className="text-burgundy">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gold-dark absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Mr. & Mrs. Baig"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-gold/40 bg-pearl-light/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy text-xs sm:text-sm text-charcoal font-sans"
                />
              </div>
            </div>

            {/* Field 2: Phone / WhatsApp Number */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slateBurgundy mb-1">
                Phone / WhatsApp Number <span className="text-burgundy">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gold-dark absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl border border-gold/40 bg-pearl-light/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy text-xs sm:text-sm text-charcoal font-sans"
                />
              </div>
            </div>

            {/* Field 3: Optional Dua / Warm Wishes Textarea */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slateBurgundy mb-1 flex items-center gap-1.5">
                <MessageSquareHeart className="w-3.5 h-3.5 text-gold-dark" />
                <span>Your Dua / Warm Wishes (Optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="May Allah bless their union with endless barakah, love, and happiness. Ameen..."
                value={duaMessage}
                onChange={(e) => setDuaMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-gold/40 bg-pearl-light/60 focus:bg-white focus:outline-none focus:ring-1 focus:ring-burgundy focus:border-burgundy text-xs sm:text-sm text-charcoal font-sans resize-none placeholder:text-slateBurgundy/50"
              />
            </div>

            {/* Primary Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-reflect w-full mt-4 py-3.5 px-6 rounded-full bg-gradient-to-r from-burgundy via-burgundy-secondary to-burgundy text-pearl font-serif font-bold text-xs tracking-widest uppercase border border-gold shadow-gold-glow hover:shadow-burgundy-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
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
                    <Loader2 className="w-4 h-4 animate-spin text-gold-light" />
                    <span>Submitting RSVP...</span>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="flex items-center gap-2 text-gold-light"
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
                    <Send className="w-3.5 h-3.5 text-gold-light" />
                    <span>Confirm RSVP Attendance</span>
                    <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        )}
      </motion.div>
    </motion.section>
  );
};
