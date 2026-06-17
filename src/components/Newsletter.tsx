import React, { useState } from 'react';
import { useStore } from '../store';
import { Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Newsletter() {
  const { subscribeEmail } = useStore();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'duplicate'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const isNew = subscribeEmail(email);
    if (isNew) {
      setStatus('success');
      setEmail('');
    } else {
      setStatus('duplicate');
    }

    setTimeout(() => {
      setStatus('idle');
    }, 4500);
  };

  return (
    <section className="px-6 pb-20 bg-white">
      <div className="max-w-7xl mx-auto bg-primary-gold/15 rounded-[2.5rem] p-8 sm:p-12 md:p-20 text-center relative overflow-hidden border border-luxury-gold/25">
        
        {/* Soft elegant blur decorations inside card */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="flex justify-center">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-primary-gold bg-white px-3 py-1 rounded-full border border-luxury-gold/20 flex items-center gap-1">
              ✨ Membership Invitation
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-luxury-dark font-medium tracking-wide">
            Join the Inner Circle
          </h2>
          
          <p className="text-luxury-slate font-sans text-sm sm:text-base leading-relaxed">
            Subscribe to receive elegant updates on vintage collection drops, preview invitations to private showroom sales, and enjoy <span className="text-primary-gold font-bold">10% off</span> your initial bespoke purchase.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Private Email Address"
              className="flex-1 bg-white border border-luxury-gold/10 rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary-gold/40 focus:border-primary-gold outline-none font-sans text-sm placeholder-luxury-slate/50 text-luxury-dark"
            />
            <button 
              type="submit"
              className="shimmer-btn bg-primary-gold hover:bg-gold-dark text-white px-8 py-4 rounded-xl font-sans font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
            >
              Subscribe Now
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Feedback logs */}
          <AnimatePresence>
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-green-700 font-sans text-xs bg-green-50 rounded-lg p-3 border border-green-200"
              >
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Subscription successful! We have dispatched your private 10% coupon to your inbox.</span>
              </motion.div>
            )}

            {status === 'duplicate' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-primary-gold font-sans text-xs bg-gold-cream rounded-lg p-3 border border-luxury-gold/25"
              >
                <span>You are already in our inner circle registry scrolls! Exciting updates continue.</span>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-luxury-slate/70 text-[11px] font-sans">
            By subscribing, you agree to allow Viraasat to contact you regarding heritage collections. Read our privacy parameters.
          </p>
        </div>
      </div>
    </section>
  );
}
