import React, { useState } from 'react';
import { Landmark, Instagram, Youtube, Sparkles, Send, Mail, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
      setIsContactOpen(false);
    }, 2000);
  };

  return (
    <>
      <footer className="bg-surface-container-low border-t border-accent-peach/50 text-left">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 px-6 py-20 max-w-7xl mx-auto">
          
          {/* Col 1 (4 Columns) Brand info */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h2 className="font-serif text-2xl tracking-[0.15em] text-primary-gold uppercase">VIRAASAT</h2>
              <p className="text-[10px] tracking-[0.3em] text-luxury-slate uppercase font-sans">The Gilded Heritage</p>
            </div>
            
            <p className="text-luxury-slate font-sans text-sm leading-relaxed pr-8">
              Bringing the timeless beauty of Indian heritage to the modern world through exquisite, weight-balanced handcrafted artificial jewelry. Celebrating authentic filigree templates since 1982.
            </p>

            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-primary-gold/20 flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-white transition-all"
                aria-label="Instagram link"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-primary-gold/20 flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-white transition-all"
                aria-label="Youtube link"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="w-10 h-10 rounded-full border border-primary-gold/20 flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-white transition-all focus:outline-none cursor-pointer"
                title="Direct Showroom Contact"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2 (2 Columns) Brand Story links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-serif text-base font-semibold text-luxury-dark tracking-wider">Brand Story</h4>
            <ul className="space-y-3 font-sans text-xs uppercase tracking-wider">
              <li>
                <a href="#hero" className="text-luxury-slate hover:text-primary-gold transition-colors">Our Heritage</a>
              </li>
              <li>
                <button onClick={() => alert("Our workshops host over 85 master filigree craftsmen across Rajasthan and Uttar Pradesh.")} className="text-luxury-slate hover:text-primary-gold transition-colors text-left focus:outline-none">
                  Meet the Artisans
                </button>
              </li>
              <li>
                <button onClick={() => alert("We utilize lead-free brass base alloys and safe recycled plating methods to support green sustainability.")} className="text-luxury-slate hover:text-primary-gold transition-colors text-left focus:outline-none">
                  Sustainability
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="text-luxury-slate hover:text-primary-gold transition-colors text-left focus:outline-none">
                  Contact Showroom
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 (3 Columns) Collections */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="font-serif text-base font-semibold text-luxury-dark tracking-wider">Collections</h4>
            <ul className="space-y-3 font-sans text-xs uppercase tracking-wider">
              <li>
                <a href="#bridal" className="text-luxury-slate hover:text-primary-gold transition-colors">Bridal Couture Collection</a>
              </li>
              <li>
                <a href="#catalog" className="text-luxury-slate hover:text-primary-gold transition-colors">Contemporary Daily Wear</a>
              </li>
              <li>
                <a href="#catalog" className="text-luxury-slate hover:text-primary-gold transition-colors">Party & Sangeet Wear</a>
              </li>
              <li>
                <a href="#catalog" className="text-luxury-slate hover:text-primary-gold transition-colors">Limited Jodhpur Editions</a>
              </li>
            </ul>
          </div>

          {/* Col 4 (3 Columns) Customer Support */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="font-serif text-base font-semibold text-luxury-dark tracking-wider">Customer Support</h4>
            <ul className="space-y-3 font-sans text-xs uppercase tracking-wider">
              <li>
                <button onClick={() => alert("To track your custom offline shipping dispatch, please enter the ID from your receipt inside your email correspondence.")} className="text-luxury-slate hover:text-primary-gold transition-colors text-left focus:outline-none">
                  Track Custom Order
                </button>
              </li>
              <li>
                <button onClick={() => alert("We ship jewelry inside high-security shockproof velvet locks with insured pan-India transit within 3-5 business days.")} className="text-luxury-slate hover:text-primary-gold transition-colors text-left focus:outline-none">
                  Shipping Policy parameters
                </button>
              </li>
              <li>
                <button onClick={() => alert("Due to high craftsmanship values, we gladly exchange items within 7 days. Returns can be initiated via direct email/phone.")} className="text-luxury-slate hover:text-primary-gold transition-colors text-left focus:outline-none">
                  Refunds & Exchange Returns
                </button>
              </li>
              <li>
                <button onClick={() => alert("Aunt-tarnish gold plating stays pristine when wiped dry with velvet cloths after wear. Avoid alcohol sprays, perfumes, and hard moisture pools.")} className="text-luxury-slate hover:text-primary-gold transition-colors text-left focus:outline-none">
                  Bespoke Jewelry Care Guide
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Inner Copyright Bottom Strip */}
        <div className="border-t border-accent-peach/30 py-8 px-6 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-luxury-slate text-xs font-sans">
            © 2026 Viraasat Jewelry. Crafted with Handcrafted Heritage. All Rights Reserved.
          </p>
          <div className="flex gap-6 font-sans text-xs">
            <button onClick={() => alert("Privacy Statement: Viraasat never exposes list data or email addresses to brokers. Client credentials are encrypted.")} className="text-luxury-slate hover:text-primary-gold">
              Privacy Policy
            </button>
            <button onClick={() => alert("Terms: Bespoke measurements are guided by individual sizing choices. Plating warranties valid for 1 full year.")} className="text-luxury-slate hover:text-primary-gold">
              Terms of Service
            </button>
          </div>
        </div>
      </footer>

      {/* Showroom Direct Contact Modal Overlay */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Form card */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white max-w-md w-full rounded-2xl p-6 sm:p-8 z-10 border border-accent-peach shadow-2xl relative"
            >
              <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-luxury-slate hover:text-luxury-dark"
              >
                Close ×
              </button>

              <div className="text-left space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-luxury-dark uppercase">Showroom Directory</h3>
                  <p className="text-xs text-luxury-slate font-sans mt-0.5">Viraasat Delhi High-Street Flagship Store</p>
                </div>

                {/* Static contact directory details */}
                <div className="bg-gold-cream/40 p-3 rounded-lg text-xs text-luxury-slate space-y-2 font-sans border border-luxury-gold/15">
                  <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary-gold" /> D-5, Connaught Place, New Delhi - 110001</p>
                  <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary-gold" /> +91 11 4325 0982</p>
                  <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary-gold" /> concierge@viraasat.com</p>
                </div>

                <div className="border-t border-accent-peach/30 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-sans text-luxury-dark mb-2">Concierge Message Dispatch</h4>
                  
                  {isSuccess ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg font-sans text-xs text-center">
                      ✓ Concierge alerted! We will check our guest-book records and call you back in 2 hours.
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-3">
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your Royal Name"
                        className="w-full bg-gold-cream/30 border border-luxury-gold/15 rounded p-2.5 text-xs outline-none focus:border-primary-gold"
                      />
                      <input 
                        type="email" 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="Your Communication Email"
                        className="w-full bg-gold-cream/30 border border-luxury-gold/15 rounded p-2.5 text-xs outline-none focus:border-primary-gold"
                      />
                      <textarea 
                        rows={2}
                        required
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        placeholder="Describe your design custom fitting request..."
                        className="w-full bg-gold-cream/30 border border-luxury-gold/15 rounded p-2.5 text-xs resize-none outline-none focus:border-primary-gold"
                      />
                      <button 
                        type="submit"
                        className="w-full py-2.5 bg-primary-gold text-white text-xs font-bold font-sans uppercase tracking-widest rounded shadow hover:bg-gold-dark transition-colors cursor-pointer"
                      >
                        Dispatch Concierge Call
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
