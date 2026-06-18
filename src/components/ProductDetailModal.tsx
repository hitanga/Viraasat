import { useState, FormEvent } from 'react';
import { useStore } from '../store';
import { X, Heart, Sparkles, UserCheck, Shield, Ruler, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { createInquiry } from '../lib/firebase';

export default function ProductDetailModal() {
  const { selectedProduct, toggleWishlist, isInWishlist, currentUser } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!selectedProduct) return null;

  const isFav = isInWishlist(selectedProduct.id);

  const closeOverlay = () => {
    setIsFormOpen(false);
    setNotes('');
    setQuantity(1);
    setSuccess(false);
    useStore.setState({ selectedProduct: null });
  };

  const handleInquiryAction = () => {
    if (!currentUser) {
      alert("Please log in or register your Viraasat account to request customized fittings or purchase options.");
      useStore.setState({ currentScreen: 'account', selectedProduct: null });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsFormOpen(true);
  };

  const submitInquiry = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);
    const inquiryId = `inq-${Date.now()}`;
    
    try {
      if (currentUser.uid.startsWith('usr_')) {
        const currentLocalInqsString = localStorage.getItem('local_inquiries_' + currentUser.uid);
        const currentLocalInqs = currentLocalInqsString ? JSON.parse(currentLocalInqsString) : [];
        const localInq = {
          id: inquiryId,
          userId: currentUser.uid,
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          productImage: selectedProduct.image,
          price: selectedProduct.price,
          notes: notes.trim() || undefined,
          quantity,
          status: 'pending',
          createdAt: { seconds: Math.floor(Date.now() / 1000) },
          updatedAt: { seconds: Math.floor(Date.now() / 1000) }
        };
        const updatedInqs = [localInq, ...currentLocalInqs];
        localStorage.setItem('local_inquiries_' + currentUser.uid, JSON.stringify(updatedInqs));
        const setUserInquiries = useStore.getState().setUserInquiries;
        setUserInquiries(updatedInqs);
      } else {
        await createInquiry(currentUser.uid, {
          id: inquiryId,
          productId: selectedProduct.id,
          productName: selectedProduct.name,
          productImage: selectedProduct.image,
          price: selectedProduct.price,
          notes: notes.trim() || undefined,
          quantity,
        });
      }
      setSuccess(true);
    } catch (e) {
      console.error(e);
      alert("Error booking inquiry. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={closeOverlay}
          className="absolute inset-0 bg-black cursor-pointer"
        />

        {/* Modal content cardboard */}
        <motion.div 
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden z-10 border border-accent-peach relative max-h-[90vh] flex flex-col md:flex-row"
        >
          {/* Close button top right */}
          <button 
            onClick={closeOverlay}
            className="absolute top-4 right-4 text-luxury-dark hover:text-primary-gold p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-accent-peach/20 hover:scale-110 transition-transform focus:outline-none z-20"
            aria-label="Close product specs modal"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>

          {/* Left panel: Detailed Item Portrait */}
          <div className="md:w-1/2 relative bg-gold-cream/30 min-h-[250px] md:h-auto">
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover max-h-[350px] md:max-h-none"
            />
            {selectedProduct.isBridal && (
              <span className="absolute bottom-4 left-4 bg-blush-rose text-white text-[10px] font-sans font-bold uppercase tracking-widest px-3 py-1 rounded shadow">
                Premium Bridal Piece
              </span>
            )}
          </div>

          {/* Right panel: Extensive specification sheets or Custom Inquiry Form */}
          <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between text-left max-h-[55vh] md:max-h-none">
            {isFormOpen ? (
              success ? (
                /* Success Screen */
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 py-8">
                  <div className="w-16 h-16 bg-gold-cream border border-primary-gold text-primary-gold rounded-full flex items-center justify-center shadow">
                    <Check className="w-8 h-8 font-bold" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-bold text-luxury-dark tracking-wide">Inquiry Registered</h3>
                    <p className="text-sm font-sans text-luxury-slate leading-relaxed">
                      Your custom fitting request for <strong className="text-primary-gold">{selectedProduct.name}</strong> has been secured in your personal archives. 
                    </p>
                    <p className="text-xs font-sans text-primary-gold bg-gold-cream/40 px-3 py-2 rounded border border-luxury-gold/10 mt-3">
                      You can track custom milestones, fitting messages, and quote approximations anytime inside the <strong className="underline cursor-pointer" onClick={() => { useStore.setState({ currentScreen: 'account', selectedProduct: null }); }}>My Account</strong> dashboard.
                    </p>
                  </div>
                  <button
                    onClick={closeOverlay}
                    className="mt-4 px-8 py-3 bg-primary-gold hover:bg-gold-dark text-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Done & Return
                  </button>
                </div>
              ) : (
                /* Embedded Custom Fitting / Purchase Form */
                <form onSubmit={submitInquiry} className="flex-1 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="text-primary-gold hover:text-gold-dark text-xs font-sans font-semibold flex items-center gap-1.5 focus:outline-none cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Specifications
                    </button>
                    
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-luxury-slate">Bespoke Fitting & Inquiry</span>
                      <h4 className="font-serif text-xl font-bold text-luxury-dark">{selectedProduct.name}</h4>
                      <p className="text-primary-gold font-serif font-semibold text-sm">Approximation: ₹ {selectedProduct.price.toLocaleString('en-IN')}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-accent-peach/20">
                      {/* Quantity Selector */}
                      <div className="space-y-1">
                        <label className="text-xs font-sans font-bold text-luxury-dark">Select Order / Fitting Quantity:</label>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            disabled={quantity <= 1}
                            onClick={() => setQuantity(q => q - 1)}
                            className="w-8 h-8 border border-luxury-gold/30 rounded flex items-center justify-center text-luxury-dark disabled:opacity-30 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-sans font-bold text-sm text-luxury-dark">{quantity}</span>
                          <button
                            type="button"
                            disabled={quantity >= 10}
                            onClick={() => setQuantity(q => q + 1)}
                            className="w-8 h-8 border border-luxury-gold/30 rounded flex items-center justify-center text-luxury-dark disabled:opacity-30 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Customization Notes */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-bold text-luxury-dark block">Bespoke Requests & Jewelry Sizing:</label>
                        <textarea
                          placeholder="Please clarify any details: Ring sizes, necklace length settings, choice of gold (18-karat, 22-karat), kundan/gem settings, or fitting preferences..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          maxLength={1000}
                          className="w-full h-32 text-xs p-3 bg-gold-cream/20 border border-luxury-gold/25 focus:border-primary-gold rounded-lg font-sans outline-none resize-none text-luxury-dark placeholder-luxury-slate/50 leading-relaxed"
                        />
                        <div className="text-[10px] text-right text-luxury-slate font-mono">
                          {notes.length}/1000 characters
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-accent-peach/20">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-primary-gold hover:bg-gold-dark text-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                      {isSubmitting ? 'Securing in Archives...' : 'Submit Bespoke Inquiry to Guild'}
                    </button>
                    <p className="text-[10px] text-center text-luxury-slate/60 font-sans">
                      Our master craftsman will review your specifications within 24 hours.
                    </p>
                  </div>
                </form>
              )
            ) : (
              /* Column Specifications */
              <>
                <div className="space-y-5">
                  {/* Category tag of specifications */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-sans font-bold text-primary-gold uppercase tracking-[0.2em] bg-gold-cream px-2 py-0.5 rounded border border-luxury-gold/15">
                      Artisan Spec • {selectedProduct.category}
                    </span>
                    {selectedProduct.isTrending && (
                      <span className="text-[10px] font-sans font-bold text-blush-rose uppercase tracking-[0.1em] bg-blush-light px-2 py-0.5 rounded">
                        Popular Demand
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-luxury-dark tracking-wide">
                      {selectedProduct.name}
                    </h3>
                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="font-serif text-xl font-bold text-primary-gold">
                        ₹ {selectedProduct.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-luxury-slate/50 line-through text-xs font-sans">
                        ₹ {selectedProduct.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Handcrafted story */}
                  <p className="font-sans text-xs sm:text-sm text-luxury-slate leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Specifications block */}
                  <div className="space-y-3.5 pt-2 border-t border-accent-peach/20">
                    
                    {/* Materials mapping list */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-luxury-dark block">
                        Metals & Stone Settings:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {selectedProduct.materials.map((mat, i) => (
                          <span key={i} className="text-[10px] bg-gold-cream/40 border border-luxury-gold/15 text-luxury-slate px-2 py-0.5 rounded font-sans">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Details list block */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-luxury-dark block">
                        Artisan Craftsmanship Highlights:
                      </span>
                      <ul className="text-xs text-luxury-slate space-y-1 list-disc pl-4 font-sans">
                        {selectedProduct.details.map((dt, idx) => (
                          <li key={idx} className="leading-relaxed">{dt}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Dimensions and Artisan blocks */}
                    <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                      <div className="p-2 bg-gold-cream/20 rounded-lg border border-luxury-gold/10 space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-luxury-dark font-sans flex items-center gap-1">
                          <Ruler className="w-3 h-3 text-primary-gold" /> Physical Size:
                        </span>
                        <p className="text-[11px] text-luxury-slate font-sans break-words">{selectedProduct.dimensions}</p>
                      </div>

                      <div className="p-2 bg-gold-cream/20 rounded-lg border border-luxury-gold/10 space-y-1">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-luxury-dark font-sans flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-primary-gold" /> Guild Workshop:
                        </span>
                        <p className="text-[11px] text-luxury-slate font-sans break-words">{selectedProduct.artisan}</p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Highly intuitive Royal Action buttons */}
                <div className="space-y-2.5 pt-6 border-t border-accent-peach/20 mt-6">
                  <button 
                    onClick={handleInquiryAction}
                    className="w-full py-3.5 bg-primary-gold hover:bg-gold-dark text-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] focus:outline-none cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Request Custom fitting / Buy Piece
                  </button>

                  <button 
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="w-full py-3 border border-primary-gold rounded-lg text-xs font-sans font-bold uppercase tracking-wider text-primary-gold hover:bg-gold-cream flex items-center justify-center gap-1.5 focus:outline-none transition-all active:scale-95 cursor-pointer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-blush-rose text-blush-rose stroke-blush-rose' : ''}`} />
                    {isFav ? 'In Checklist' : 'Add to Checklist'}
                  </button>
                </div>
              </>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
