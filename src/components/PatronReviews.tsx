import React, { useState } from 'react';
import { useStore } from '../store';
import { PRODUCTS } from '../data';
import { MessageSquare, Star, Plus, Check, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PatronReviews() {
  const { reviews, addReview } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Local Form state
  const [authorName, setAuthorName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [starCount, setStarCount] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [isSuccessTip, setIsSuccessTip] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    addReview({
      author: authorName,
      rating: starCount,
      content: commentText,
      productName: selectedProduct || 'General Collection',
    });

    // Reset fields
    setAuthorName('');
    setSelectedProduct('');
    setStarCount(5);
    setCommentText('');
    
    setIsSuccessTip(true);
    setTimeout(() => {
      setIsSuccessTip(false);
      setIsFormOpen(false);
    }, 1800);
  };

  return (
    <section className="py-20 bg-white overflow-hidden text-center relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-gold">
            Voices of Appreciation
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-dark font-medium">
            Voice of Our Patrons
          </h2>
          <div className="w-20 h-1 bg-primary-gold mx-auto rounded" />
        </div>

        {/* Horizontal scroll layout */}
        <div className="flex gap-6 overflow-x-auto pb-10 pt-4 px-2 scroll-smooth scrollbar-thin snap-x max-w-full">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="min-w-[320px] sm:min-w-[400px] max-w-[420px] snap-center glass-card p-8 rounded-2xl flex flex-col justify-between text-left shadow-sm hover:shadow-md transition-shadow relative border border-accent-peach/20 bg-gold-cream/10"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={rev.avatar} 
                    alt={rev.author} 
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-gold bg-gold-cream"
                  />
                  <div>
                    <h4 className="font-sans font-bold text-sm text-luxury-dark uppercase tracking-wide">
                      {rev.author}
                    </h4>
                    
                    {/* Stars rating review show */}
                    <div className="flex text-primary-gold mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-primary-gold text-primary-gold' : 'text-luxury-gold/30'
                          }`} 
                        />
                      ))}
                    </div>

                    {rev.productName && (
                      <span className="text-[10px] text-primary-gold bg-gold-cream px-1.5 py-0.5 rounded uppercase tracking-wider font-sans inline-block mt-2">
                        Verified For: {rev.productName}
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-sans italic text-luxury-slate text-sm sm:text-base leading-relaxed">
                  "{rev.content}"
                </p>
              </div>

              <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-accent-peach/10 text-primary-gold text-[10px] font-sans font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" /> Verified Patron Purchase
              </div>
            </div>
          ))}
        </div>

        {/* Trigger Button to leave review */}
        <div className="pt-4">
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 border border-primary-gold text-primary-gold px-8 py-3 rounded-lg font-sans font-semibold text-xs uppercase tracking-wider hover:bg-gold-cream transition-all duration-300 focus:outline-none cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Share Your Experience
          </button>
        </div>

      </div>

      {/* Review Dialog Modal Overlay */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Form container */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-6 sm:p-8 z-10 border border-accent-peach relative overflow-hidden"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 text-luxury-slate hover:text-luxury-dark"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-4 text-left">
                <h3 className="font-serif text-2xl font-semibold text-luxury-dark tracking-wide">
                  Submit Patron Review
                </h3>
                <p className="text-xs text-luxury-slate font-sans">
                  Your experience guides our traditional artisan workshops. Please share your thoughts below:
                </p>

                <AnimatePresence mode="wait">
                  {isSuccessTip ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-primary-gold/5 border border-primary-gold p-6 rounded-xl text-center space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-gold text-white flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6 stroke-[3]" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-primary-gold">Review Logged!</h4>
                      <p className="text-xs text-luxury-slate font-sans">
                        Thank you for honoring our heritage. Your review is now live in our guest scrolls.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider font-sans font-bold text-luxury-dark">
                          Your Full Name
                        </label>
                        <input 
                          type="text" 
                          required
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="E.g. Maharani Meera"
                          className="w-full bg-gold-cream/40 px-4 py-3 border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-primary-gold font-sans text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs uppercase tracking-wider font-sans font-bold text-luxury-dark">
                            Item Tagged
                          </label>
                          <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="w-full bg-gold-cream/40 px-3 py-3 border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-primary-gold font-sans text-xs"
                          >
                            <option value="">General Collection</option>
                            {PRODUCTS.map((p) => (
                              <option key={p.id} value={p.name}>{p.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs uppercase tracking-wider font-sans font-bold text-luxury-dark">
                            Rating Scale
                          </label>
                          <div className="flex items-center gap-1.5 h-11">
                            {[1, 2, 3, 4, 5].map((stars) => (
                              <button
                                type="button"
                                key={stars}
                                onClick={() => setStarCount(stars)}
                                className="focus:outline-none transition-transform active:scale-125"
                              >
                                <Star 
                                  className={`w-5 h-5 ${
                                    stars <= starCount 
                                      ? 'fill-primary-gold text-primary-gold' 
                                      : 'text-luxury-gold/20'
                                  }`} 
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider font-sans font-bold text-luxury-dark">
                          Your Experience Review
                        </label>
                        <textarea 
                          rows={3}
                          required
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="How did the plating make you feel? Did you enjoy the delicate filigree weights?"
                          className="w-full bg-gold-cream/40 px-4 py-3 border border-luxury-gold/20 rounded-lg focus:outline-none focus:border-primary-gold font-sans text-sm resize-none"
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-3.5 bg-primary-gold text-white font-sans text-xs uppercase font-bold tracking-widest rounded-lg hover:bg-gold-dark transition-all duration-300 shadow shimmer-btn focus:outline-none mt-2 cursor-pointer"
                      >
                        Publish Guest Scroll Review
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
