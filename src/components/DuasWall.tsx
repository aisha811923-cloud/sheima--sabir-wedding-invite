import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import type { GuestDua, GuestDuaInsert } from '../types/database.types';
import { Heart, Send, Sparkles, Loader2, MessageSquareHeart } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const STARTER_DUAS: GuestDua[] = [
  {
    id: 'starter-1',
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    sender_name: 'Uncle Tariq & Family',
    dua_message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fee khair. May Allah shower countless blessings upon Sheima and Sabir on this sacred journey!',
    is_approved: true,
  },
  {
    id: 'starter-2',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    sender_name: 'Farzana Baig',
    dua_message: 'Heartiest congratulations to our dearest Sheima and Sabir! May your life together be blessed with endless happiness, love, peace, and prosperity.',
    is_approved: true,
  },
  {
    id: 'starter-3',
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    sender_name: 'Dr. Imran & Sana Baig',
    dua_message: 'May Allah SWT grant both of you immense tranquility, affection, and righteous companionship. Can\'t wait to celebrate the grand Barat in December!',
    is_approved: true,
  },
];

export const DuasWall: React.FC = () => {
  const [duas, setDuas] = useState<GuestDua[]>(STARTER_DUAS);
  const [senderName, setSenderName] = useState('');
  const [duaMessage, setDuaMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState(false);
  const [reactedDuas, setReactedDuas] = useState<Record<string, boolean>>({});

  const fetchDuas = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('guest_duas')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(25);

      if (error) {
        console.warn('Could not fetch duas from Supabase, using starter duas:', error);
        return;
      }

      if (data && data.length > 0) {
        setDuas(data);
      }
    } catch (err) {
      console.warn('Fetch duas error:', err);
    }
  }, []);

  useEffect(() => {
    fetchDuas();

    const channel = supabase
      .channel('guest_duas_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'guest_duas',
          filter: 'is_approved=eq.true',
        },
        (payload) => {
          const newDua = payload.new as GuestDua;
          setDuas((prev) => [newDua, ...prev.filter((d) => d.id !== newDua.id)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchDuas]);

  const handlePostDua = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!senderName.trim() || senderName.trim().length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }

    if (!duaMessage.trim() || duaMessage.trim().length < 3) {
      setErrorMsg('Please enter your Dua or message (at least 3 characters).');
      return;
    }

    setIsSubmitting(true);

    const newLocalDua: GuestDua = {
      id: `local-${Date.now()}`,
      created_at: new Date().toISOString(),
      sender_name: senderName.trim(),
      dua_message: duaMessage.trim(),
      is_approved: true,
    };

    const insertPayload: GuestDuaInsert = {
      sender_name: senderName.trim(),
      dua_message: duaMessage.trim(),
      is_approved: true,
    };

    try {
      const { error } = await supabase.from('guest_duas').insert([insertPayload]);

      if (error) {
        console.warn('Supabase insert warning:', error);
      }

      setDuas((prev) => [newLocalDua, ...prev]);
      setSenderName('');
      setDuaMessage('');
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 5000);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setErrorMsg(error.message || 'Unable to post Dua at this moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleHeartReaction = (duaId: string) => {
    setReactedDuas((prev) => ({
      ...prev,
      [duaId]: !prev[duaId],
    }));
  };

  const formatDuaTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <motion.section
      id="duas"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
      className="py-12 px-2 sm:px-4 max-w-xl mx-auto z-10 relative space-y-10"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center">
        <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-burgundy font-sans font-bold flex items-center justify-center gap-1.5">
          <MessageSquareHeart className="w-4 h-4 text-gold-dark" />
          Digital Guestbook
          <MessageSquareHeart className="w-4 h-4 text-gold-dark" />
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-burgundy mt-1 text-gold-shimmer-sweep">
          Duas & Warm Wishes
        </h2>
        <p className="text-xs sm:text-sm font-serif italic text-slateBurgundy mt-1 max-w-sm mx-auto">
          Send your prayers, blessings, and heartfelt congratulations for Sheima & Sabir
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 text-gold">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold" />
          <span className="text-xs">✦ ✧ ✦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </motion.div>

      {/* 1. Dedicated Guestbook Submission Card */}
      <motion.div
        variants={itemVariants}
        className="p-7 sm:p-10 rounded-t-[48px] sm:rounded-t-[56px] rounded-b-[28px] bg-white/95 backdrop-blur-md border border-gold/45 shadow-card-royal"
      >
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-burgundy mb-1 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-gold" />
          Write a Blessed Dua
        </h3>
        <p className="text-xs font-serif italic text-slateBurgundy mb-6">
          "The Dua of a believer for their brother or sister in their absence is answered."
        </p>

        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 p-3.5 rounded-2xl bg-burgundy/10 border border-gold/40 text-burgundy text-xs text-center font-serif italic shadow-sm"
          >
            ✨ JazakAllah Khair! Your blessed Dua has been placed on the wall.
          </motion.div>
        )}

        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-2xl bg-burgundy/10 border border-burgundy/30 text-burgundy text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handlePostDua} className="space-y-4">
          <div>
            <input
              type="text"
              required
              placeholder="Your Name (e.g. Aunt Fatima & Family)"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gold/40 bg-pearl-light/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-burgundy/20 text-xs sm:text-sm text-charcoal font-sans"
            />
          </div>

          <div>
            <textarea
              required
              rows={3}
              placeholder="Write your prayers, Quranic ayah, or warm wishes here..."
              value={duaMessage}
              onChange={(e) => setDuaMessage(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gold/40 bg-pearl-light/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-burgundy/20 text-xs sm:text-sm text-charcoal font-sans resize-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-reflect py-3 px-7 rounded-full bg-gradient-to-r from-burgundy via-burgundy-secondary to-burgundy text-pearl font-serif font-bold text-xs tracking-widest uppercase border border-gold shadow-sm hover:shadow-burgundy-glow transition-all duration-200 flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-gold-light" />
                  <span>Posting Dua...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-gold-light" />
                  <span>Send Prayer & Blessings</span>
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* 2. Separate Live Messages Feed */}
      <motion.div variants={containerVariants} className="space-y-4 pt-2">
        <div className="text-center mb-2">
          <span className="text-[10px] uppercase tracking-widest text-slateBurgundy font-bold">
            Recent Blessings & Prayers
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {duas.map((dua) => {
            const isLiked = !!reactedDuas[dua.id];
            return (
              <motion.div
                key={dua.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="p-6 rounded-3xl bg-white/95 border border-gold/35 shadow-sm hover:border-gold transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-burgundy/10 border border-gold/40 flex items-center justify-center text-burgundy font-serif font-bold text-xs shadow-sm">
                        {dua.sender_name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-serif font-bold text-sm text-burgundy">
                        {dua.sender_name}
                      </span>
                    </div>
                    <span className="text-[10px] text-slateBurgundy font-sans">
                      {formatDuaTime(dua.created_at)}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-serif italic text-charcoal/90 leading-relaxed mt-2 pl-1">
                    "{dua.dua_message}"
                  </p>
                </div>

                <div className="flex items-center justify-end gap-1.5 mt-4 pt-2.5 border-t border-gold/15">
                  <motion.button
                    onClick={() => toggleHeartReaction(dua.id)}
                    whileTap={{ scale: 1.3 }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-pearl-light border border-gold/30 hover:border-gold/60 text-gold-dark text-[10px] font-sans font-semibold transition-all shadow-sm"
                  >
                    <motion.div
                      animate={isLiked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          isLiked ? 'fill-burgundy text-burgundy' : 'fill-gold text-gold'
                        }`}
                      />
                    </motion.div>
                    <span className={isLiked ? 'text-burgundy font-bold' : 'text-slateBurgundy'}>
                      {isLiked ? 'Ameen (Blessed)' : 'Ameen'}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};
