import { useState } from 'react';
import { useStore } from '../store';
import { PRODUCTS } from '../data';
import { 
  X, 
  Heart, 
  Eye, 
  ArrowRight, 
  Trash2, 
  HelpCircle, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Calculator, 
  ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WishlistDrawer() {
  const { isWishlistOpen, wishlist, toggleWishlist, currentUser } = useStore();
  
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Local state for the custom Plating & Sizing interface
  const [showEstimator, setShowEstimator] = useState(false);
  const [platingType, setPlatingType] = useState<'22k' | '18k' | 'silver'>('22k');
  const [fittingType, setFittingType] = useState<'standard' | 'heavy' | 'comfort'>('standard');
  const [estimatorSuccess, setEstimatorSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeWishlist = () => {
    useStore.setState({ isWishlistOpen: false });
    // Reset calculator after transition completes
    setTimeout(() => {
      setShowEstimator(false);
      setEstimatorSuccess(false);
    }, 400);
  };

  const exploreDetails = (product: any) => {
    closeWishlist();
    useStore.setState({ selectedProduct: product });
  };

  // Live Pricing calculations
  const baseValue = savedProducts.reduce((sum, item) => sum + item.price, 0);
  
  const platingRate = platingType === '22k' ? 0.08 : platingType === '18k' ? 0.05 : 0.03;
  const platingFee = Math.round(baseValue * platingRate);

  const sizingFee = fittingType === 'heavy' ? 4500 : fittingType === 'comfort' ? 2500 : 0;
  const deliveryAndInsurance = baseValue > 200000 ? 0 : 1500;

  const grandTotalEstimate = baseValue + platingFee + sizingFee + deliveryAndInsurance;

  // Sync / saving bespoke specs as custom database inquiries
  const handleRegisterBespokeInquiry = async () => {
    if (!currentUser) {
      closeWishlist();
      alert("Please log in or register your Viraasat account to bind these custom coordinates to your royal ledger.");
      useStore.setState({ currentScreen: 'account' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      const { createInquiry } = await import('../lib/firebase');
      
      const platingLabels = {
        '22k': '22K Hallmarking Gold Micro-Plating (+8% fee)',
        '18k': '18K Elegant Rose/White Gold Plating (+5% fee)',
        'silver': 'Pure Silver Rhodium Mirror Polish (+3% fee)'
      };
      
      const fittingLabels = {
        'standard': 'Standard Fit sizing',
        'heavy': 'Bespoke Heavy Fit link extensions (Labor fee)',
        'comfort': 'Comfort-Contoured styling (Labor fee)'
      };

      // Create a bespoke custom database entry for each wishlisted item with calculation details
      const isLocal = currentUser.uid.startsWith('usr_');
      let localInqs: any[] = [];
      if (isLocal) {
        const currentLocalInqsString = localStorage.getItem('local_inquiries_' + currentUser.uid);
        localInqs = currentLocalInqsString ? JSON.parse(currentLocalInqsString) : [];
      }

      for (const prod of savedProducts) {
        const itemPlatingFee = Math.round(prod.price * (platingType === '22k' ? 0.08 : platingType === '18k' ? 0.05 : 0.03));
        const itemSizingFee = fittingType === 'heavy' ? 4500 : fittingType === 'comfort' ? 2500 : 0;
        const noteWithCustoms = `[Royal Estimator Profile] Plating: ${platingLabels[platingType]}. Fit Sizing: ${fittingLabels[fittingType]}. Plating Charge: +₹${itemPlatingFee.toLocaleString('en-IN')}, Refitting Labor: +₹${itemSizingFee.toLocaleString('en-IN')}.`;

        const inqId = `est-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        if (isLocal) {
          localInqs.unshift({
            id: inqId,
            userId: currentUser.uid,
            productId: prod.id,
            productName: prod.name,
            productImage: prod.image,
            price: prod.price + itemPlatingFee + itemSizingFee,
            notes: noteWithCustoms,
            quantity: 1,
            status: 'pending',
            createdAt: { seconds: Math.floor(Date.now() / 1000) },
            updatedAt: { seconds: Math.floor(Date.now() / 1000) }
          });
        } else {
          await createInquiry(currentUser.uid, {
            id: inqId,
            productId: prod.id,
            productName: prod.name,
            productImage: prod.image,
            price: prod.price + itemPlatingFee + itemSizingFee,
            notes: noteWithCustoms,
            quantity: 1,
          });
        }
      }

      if (isLocal) {
        localStorage.setItem('local_inquiries_' + currentUser.uid, JSON.stringify(localInqs));
        const setUserInquiries = useStore.getState().setUserInquiries;
        setUserInquiries(localInqs);
      }

      setEstimatorSuccess(true);
      setTimeout(() => {
        setEstimatorSuccess(false);
        setShowEstimator(false);
        closeWishlist();
        useStore.setState({ currentScreen: 'account' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);

    } catch (err) {
      console.error('Error saving bespoke estimator entries to cloud:', err);
      alert('Error registering your custom requests. Please verify your collection catalog.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Sliding Drawer Container */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white z-[51] shadow-2xl flex flex-col justify-between"
          >
            {/* Conditional Drawer Header */}
            {!showEstimator ? (
              <div className="p-6 border-b border-accent-peach flex justify-between items-center bg-gold-cream/30">
                <div className="flex items-center gap-2 text-primary-gold">
                  <Heart className="w-5 h-5 fill-blush-rose text-blush-rose" />
                  <h3 className="font-serif text-lg font-semibold uppercase tracking-wider text-luxury-dark">
                    My Wishlist Scrolls
                  </h3>
                  <span className="text-xs font-sans font-bold bg-primary-gold text-white px-2 py-0.5 rounded-full ml-1">
                    {savedProducts.length}
                  </span>
                </div>
                <button 
                  onClick={closeWishlist}
                  className="text-luxury-slate hover:text-luxury-dark p-1 focus:outline-none"
                  aria-label="Close wishlist drawer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            ) : (
              <div className="p-6 border-b border-accent-peach flex justify-between items-center bg-gold-cream/30">
                <button 
                  onClick={() => { setShowEstimator(false); setEstimatorSuccess(false); }}
                  className="text-primary-gold hover:text-gold-dark flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider cursor-pointer focus:outline-none"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Wishlist
                </button>
                <div className="flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-primary-gold" />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary-gold font-sans">Royal Estimator</span>
                </div>
              </div>
            )}

            {/* List Body or Estimator View */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {!showEstimator ? (
                savedProducts.length === 0 ? (
                  <div className="py-20 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-gold-cream/55 flex items-center justify-center mx-auto text-luxury-gold/60">
                      <Heart className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-serif text-base font-bold text-luxury-dark uppercase">Your scrolls are empty</h4>
                      <p className="text-xs text-luxury-slate max-w-xs mx-auto font-sans leading-relaxed">
                        Tap the heart charm icon on any traditional jhumka or imperial kundan choker to save items here for later bespoke styling reviews.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        closeWishlist();
                        const target = document.getElementById('catalog');
                        if (target) {
                          const offset = 80;
                          const elementPos = target.getBoundingClientRect().top;
                          const offsetPos = elementPos + window.scrollY - offset;
                          window.scrollTo({ top: offsetPos, behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary-gold text-white text-xs uppercase font-bold tracking-wider rounded-lg hover:bg-gold-dark transition-all cursor-pointer"
                    >
                      Browse Masterpieces <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedProducts.map((prod) => (
                      <div 
                        key={prod.id}
                        className="p-3 bg-gold-cream/20 rounded-xl border border-accent-peach/20 hover:border-luxury-gold/30 transition-all flex gap-4"
                      >
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          referrerPolicy="no-referrer"
                          className="w-20 h-24 object-cover rounded-lg shrink-0 border border-accent-peach/30 shadow-sm"
                        />

                        <div className="flex-grow min-w-0 flex flex-col justify-between py-0.5">
                          <div className="space-y-1 text-left">
                            <h4 
                              onClick={() => exploreDetails(prod)}
                              className="font-sans font-bold text-xs text-luxury-dark hover:text-primary-gold transition-colors cursor-pointer truncate"
                            >
                              {prod.name}
                            </h4>
                            <span className="text-[10px] text-luxury-slate tracking-widest uppercase font-sans block leading-none">
                              {prod.category}
                            </span>
                            <p className="font-serif text-sm font-bold text-primary-gold pt-1">
                              ₹ {prod.price.toLocaleString('en-IN')}
                            </p>
                          </div>

                          {/* Actions block inside card */}
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <button 
                              onClick={() => exploreDetails(prod)}
                              className="text-[10px] uppercase font-sans font-bold text-luxury-dark hover:text-primary-gold flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" /> Spec Look
                            </button>

                            <button 
                              onClick={() => toggleWishlist(prod.id)}
                              className="text-[10px] uppercase font-sans font-bold text-red-700 hover:text-red-900 ml-auto flex items-center gap-1 cursor-pointer"
                              title="Remove"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : estimatorSuccess ? (
                /* Interactive Success screen */
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
                  <div className="w-16 h-16 bg-gold-cream border-2 border-primary-gold text-primary-gold rounded-full flex items-center justify-center shadow">
                    <Check className="w-8 h-8 font-bold" />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h3 className="font-serif text-xl font-bold text-luxury-dark tracking-wide uppercase">Specifications Saved</h3>
                    <p className="text-xs font-sans text-luxury-slate leading-relaxed">
                      Your premium plating preferences and customized sizing calibrations are being safely bound to your personal archives.
                    </p>
                    <p className="text-[11px] font-sans text-primary-gold bg-gold-cream/40 px-3 py-2 rounded border border-luxury-gold/10 mt-4 animate-pulse">
                      Exacting quote details are saving into your account dashboard. Please hold...
                    </p>
                  </div>
                </div>
              ) : (
                /* High-fidelity custom estimators controls */
                <div className="text-left space-y-6">
                  <div className="space-y-1.5 border-b border-accent-peach/20 pb-4">
                    <h4 className="font-serif text-lg font-bold text-luxury-dark uppercase">AESTHETIC CALIBRATIONS</h4>
                    <p className="text-xs text-luxury-slate font-sans leading-relaxed">
                      Customise micro-plating finishes, gold purities, and boutique sizing limits on your <strong className="text-primary-gold">{savedProducts.length} masterpieces</strong>.
                    </p>
                  </div>

                  {/* Plating Options Section */}
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-wider font-sans font-bold text-luxury-dark block">
                      Select Custom Plating Polish:
                    </label>
                    <div className="space-y-2.5">
                      {/* 22K */}
                      <button
                        type="button"
                        onClick={() => setPlatingType('22k')}
                        className={`w-full p-3 rounded-xl border text-left flex gap-3 transition-all cursor-pointer ${
                          platingType === '22k'
                            ? 'bg-gold-cream/35 border-primary-gold ring-1 ring-primary-gold'
                            : 'border-accent-peach/30 hover:bg-gold-cream/10'
                        }`}
                      >
                        <span className="mt-0.5 text-primary-gold font-bold">⚜</span>
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-luxury-dark">22K Antique micro-plating (+8% surcharge)</span>
                          </div>
                          <p className="text-[10px] text-luxury-slate leading-relaxed">
                            Deep, dark, high-purity honey gold wash. Ideal for rich traditional heritage kundan chokers.
                          </p>
                        </div>
                      </button>

                      {/* 18K */}
                      <button
                        type="button"
                        onClick={() => setPlatingType('18k')}
                        className={`w-full p-3 rounded-xl border text-left flex gap-3 transition-all cursor-pointer ${
                          platingType === '18k'
                            ? 'bg-gold-cream/35 border-primary-gold ring-1 ring-primary-gold'
                            : 'border-accent-peach/30 hover:bg-gold-cream/10'
                        }`}
                      >
                        <span className="mt-0.5 text-primary-gold font-bold">✨</span>
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-luxury-dark">18K Contemporary Rose & Champagne (+5% surcharge)</span>
                          </div>
                          <p className="text-[10px] text-luxury-slate leading-relaxed">
                            Fine champagne hue with highly durable tarnish-resistant properties.
                          </p>
                        </div>
                      </button>

                      {/* Rhodium */}
                      <button
                        type="button"
                        onClick={() => setPlatingType('silver')}
                        className={`w-full p-3 rounded-xl border text-left flex gap-3 transition-all cursor-pointer ${
                          platingType === 'silver'
                            ? 'bg-gold-cream/35 border-primary-gold ring-1 ring-primary-gold'
                            : 'border-accent-peach/30 hover:bg-gold-cream/10'
                        }`}
                      >
                        <span className="mt-0.5 text-primary-gold font-bold">❄</span>
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-luxury-dark">Pure Rhodium Polished Cover (+3% surcharge)</span>
                          </div>
                          <p className="text-[10px] text-luxury-slate leading-relaxed">
                            Brilliant white mirror armor glaze. Perfect for pristine silver designs and diamond settings.
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Sizing & Comfort Section */}
                  <div className="space-y-3 pt-2">
                    <label className="text-[10px] uppercase tracking-wider font-sans font-bold text-luxury-dark block">
                      Select Custom Sizing Fit Labor:
                    </label>
                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() => setFittingType('standard')}
                        className={`w-full p-2.5 rounded-lg border text-xs text-left font-sans flex items-center justify-between transition-all cursor-pointer ${
                          fittingType === 'standard'
                            ? 'bg-gold-cream/20 border-primary-gold border-2 font-bold'
                            : 'border-accent-peach/30 hover:bg-gold-cream/10'
                        }`}
                      >
                        <span>Standard Guild Measurements</span>
                        <span className="text-[10px] bg-primary-gold/10 text-primary-gold px-2 py-0.5 rounded">Included</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFittingType('comfort')}
                        className={`w-full p-2.5 rounded-lg border text-xs text-left font-sans flex items-center justify-between transition-all cursor-pointer ${
                          fittingType === 'comfort'
                            ? 'bg-gold-cream/20 border-primary-gold border-2 font-bold'
                            : 'border-accent-peach/30 hover:bg-gold-cream/10'
                        }`}
                      >
                        <span>Comfort Inner Contour rounding</span>
                        <span className="text-[10px] bg-primary-gold/10 text-primary-gold px-2 py-0.5 rounded">+ ₹ 2,500</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFittingType('heavy')}
                        className={`w-full p-2.5 rounded-lg border text-xs text-left font-sans flex items-center justify-between transition-all cursor-pointer ${
                          fittingType === 'heavy'
                            ? 'bg-gold-cream/20 border-primary-gold border-2 font-bold'
                            : 'border-accent-peach/30 hover:bg-gold-cream/10'
                        }`}
                      >
                        <span>Added Link segments & Heavy bridal fit</span>
                        <span className="text-[10px] bg-primary-gold/10 text-primary-gold px-2 py-0.5 rounded">+ ₹ 4,500</span>
                      </button>
                    </div>
                  </div>

                  {/* Subtotal Board */}
                  <div className="bg-gold-cream/25 border border-dashed border-primary-gold/30 rounded-xl p-4 space-y-2.5 font-sans">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-luxury-slate">Saved Pieces Subtotal:</span>
                      <span className="font-semibold text-luxury-dark">₹ {baseValue.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-luxury-slate">Bespoke Plating Treatment ({platingType.toUpperCase()}):</span>
                      <span className="font-semibold text-luxury-dark">+ ₹ {platingFee.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-luxury-slate">Artisan Fitting Labor:</span>
                      <span className="font-semibold text-luxury-dark">+ ₹ {sizingFee.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-luxury-slate">Transit Vault Cover & Courier:</span>
                      <span className="font-medium text-luxury-dark">
                        {deliveryAndInsurance === 0 ? (
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">Complimentary</span>
                        ) : (
                          `₹ ${deliveryAndInsurance.toLocaleString('en-IN')}`
                        )}
                      </span>
                    </div>

                    <div className="border-t border-luxury-gold/20 pt-2.5 mt-1 flex justify-between items-baseline">
                      <span className="text-xs font-bold uppercase text-luxury-dark">Total Luxury Estimate:</span>
                      <span className="font-serif text-lg font-bold text-primary-gold">₹ {grandTotalEstimate.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions footer */}
            <div className="p-6 border-t border-accent-peach bg-gold-cream/20 space-y-4">
              {!showEstimator ? (
                <>
                  <div className="bg-white p-3.5 rounded-xl border border-luxury-gold/15 text-xs text-luxury-slate text-left leading-relaxed">
                    📢 <strong>Flagship Experience Note:</strong> Items on your scrolls persist in your local storage workspace. Bring your wishlist into our Delhi CP showroom for expedited fitting sessions.
                  </div>

                  {savedProducts.length > 0 && (
                    <button
                      onClick={() => setShowEstimator(true)}
                      className="w-full py-4 bg-primary-gold text-white text-xs font-sans font-bold uppercase tracking-widest rounded-xl hover:bg-gold-dark transition-all shadow-md shimmer-btn cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4" /> Estimate Selected Set Plating & Sizing Fees
                    </button>
                  )}
                </>
              ) : (
                !estimatorSuccess && (
                  <div className="space-y-2.5">
                    <button
                      onClick={handleRegisterBespokeInquiry}
                      disabled={isSubmitting || savedProducts.length === 0}
                      className="w-full py-4 bg-primary-gold text-white text-xs font-sans font-bold uppercase tracking-widest rounded-xl hover:bg-gold-dark transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                      ) : (
                        <ShieldCheck className="w-4 h-4" />
                      )}
                      {isSubmitting ? 'Securing Metal Specifications...' : 'Secure Custom Estimates to Ledger'}
                    </button>
                    <p className="text-[9px] text-center text-luxury-slate/60 font-sans leading-relaxed">
                      Saving these estimates creates active inquiries in your user portfolio for customized craft reviews.
                    </p>
                  </div>
                )
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
