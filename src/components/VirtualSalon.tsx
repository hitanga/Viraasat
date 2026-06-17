import { useStore } from '../store';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Sparkles, Check, RefreshCw, Layers, Plus, Award, Heart, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function VirtualSalon() {
  const { 
    virtualMainPiece, 
    virtualMatchingAccents, 
    setVirtualMainPiece, 
    toggleVirtualMatchingAccent, 
    resetVirtualSalon,
    toggleWishlist,
    isInWishlist
  } = useStore();

  // Pick only necklaces as potential Centerpieces
  const necklaces = PRODUCTS.filter((p) => p.category === 'necklaces');
  
  // Pick compatible earrings and bangles to suggest as accents
  const potentialAccents = PRODUCTS.filter(
    (p) => (p.category === 'earrings' || p.category === 'bangles') && p.id !== virtualMainPiece?.id
  );

  // Compute stats or compatibility scores
  const getCompatibilityScore = () => {
    if (!virtualMainPiece) return 0;
    if (virtualMatchingAccents.length === 0) return 85; 
    
    // Check if materials align
    let matchedCategories = 0;
    const mainMaterials = virtualMainPiece.materials.map(m => m.toLowerCase());
    
    virtualMatchingAccents.forEach((accent) => {
      const accentMaterials = accent.materials.map(m => m.toLowerCase());
      const hasOverlay = accentMaterials.some((am) => 
        mainMaterials.some((mm) => mm.includes(am) || am.includes(mm))
      );
      if (hasOverlay) matchedCategories += 1;
    });
    
    const score = 85 + (matchedCategories * 5);
    return Math.min(score, 100);
  };

  const addEntireEnsembleToWishlist = () => {
    if (!virtualMainPiece) return;
    
    const itemsToSave = [virtualMainPiece, ...virtualMatchingAccents];
    itemsToSave.forEach((item) => {
      if (!isInWishlist(item.id)) {
        toggleWishlist(item.id);
      }
    });
    
    alert(`Added all ${itemsToSave.length} styled pieces of this ensemble to your private Wishlist!`);
  };

  return (
    <section id="salon" className="py-24 bg-gold-cream/30 border-y border-accent-peach/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-gold flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary-gold animate-spin" /> Interactive Styling Experience
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-dark font-medium">
            Heritage Matchmaker Salon
          </h2>
          <div className="w-16 h-1 bg-primary-gold mx-auto rounded" />
          <p className="text-luxury-slate font-sans text-sm">
            Curate your dream heirloom. Select a premier necklace as your focal centerpiece and pair it with hand-carved accents to evaluate material synchronization.
          </p>
        </div>

        {/* Master Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Centerpiece selection grid (4 Columns) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-accent-peach/40 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-lg font-bold text-luxury-dark">
                  1. Select Centerpiece
                </h3>
                {virtualMainPiece && (
                  <button 
                    onClick={resetVirtualSalon}
                    className="text-luxury-slate hover:text-primary-gold p-1 text-xs font-sans flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
              <p className="text-xs text-luxury-slate font-sans">
                Choose one of our historic necklaces or imperial chokers as your styling base:
              </p>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {necklaces.map((neck) => {
                  const isSelected = virtualMainPiece?.id === neck.id;
                  return (
                    <button
                      key={neck.id}
                      onClick={() => setVirtualMainPiece(neck)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 focus:outline-none cursor-pointer ${
                        isSelected 
                          ? 'bg-gold-cream border-primary-gold ring-1 ring-primary-gold' 
                          : 'border-accent-peach/50 hover:border-luxury-gold/50 bg-white'
                      }`}
                    >
                      <img 
                        src={neck.image} 
                        alt={neck.name} 
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-accent-peach/30"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-sans font-bold text-xs text-luxury-dark truncate">{neck.name}</h4>
                        <p className="font-serif text-xs text-primary-gold font-semibold mt-0.5">₹ {neck.price.toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-luxury-slate font-sans uppercase tracking-widest">{neck.artisan.split(',')[0]}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-primary-gold border-primary-gold text-white' : 'border-accent-peach'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-accent-peach/30 mt-4 text-left">
              <div className="bg-gold-cream/40 p-3 rounded-lg text-[11px] text-luxury-slate leading-relaxed">
                <strong>💡 Artisan Tip:</strong> Chokers like the Royal Kundan look extraordinary when combined with high-drop emerald earrings.
              </div>
            </div>
          </div>

          {/* Middle panel: Live Visual Preview Deck (5 Columns) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-accent-peach/40 flex flex-col justify-between items-center text-center relative overflow-hidden min-h-[400px]">
            {/* Soft decorative golden circle */}
            <div className="absolute top-[20%] w-60 h-60 bg-gold-cream/40 rounded-full filter blur-2xl pointer-events-none" />

            {virtualMainPiece ? (
              <div className="w-full h-full flex flex-col justify-between relative z-10">
                {/* Header Compatibility Widget */}
                <div className="flex justify-between items-center pb-4 border-b border-accent-peach/20">
                  <span className="text-xs font-sans text-luxury-slate uppercase tracking-wider">
                    Ensemble Preview
                  </span>
                  <div className="bg-gold-cream px-3 py-1 rounded-full border border-luxury-gold/30 text-[11px] font-sans font-bold text-primary-gold flex items-center gap-1">
                    Compatibility: {getCompatibilityScore()}% Match
                  </div>
                </div>

                {/* Styled Jewelry Composition Area */}
                <div className="py-6 flex flex-col items-center justify-center space-y-6 relative flex-grow">
                  
                  {/* Accent earrings layer (shown floating above necklace if accented) */}
                  <div className="flex gap-12 justify-center items-center">
                    {virtualMatchingAccents.filter(a => a.category === 'earrings').length > 0 ? (
                      virtualMatchingAccents.filter(a => a.category === 'earrings').map((ea) => (
                        <motion.div 
                          key={ea.id} 
                          initial={{ scale: 0.8, y: -10 }} 
                          animate={{ scale: 1, y: 0 }}
                          className="flex flex-col items-center"
                        >
                          <img 
                            src={ea.image} 
                            alt={ea.name} 
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-full object-cover border-2 border-primary-gold shadow-md"
                          />
                          <span className="text-[10px] text-luxury-slate mt-1 max-w-[80px] truncate block font-sans">
                            {ea.name}
                          </span>
                        </motion.div>
                      ))
                    ) : (
                      <div className="w-16 h-16 rounded-full border-2 border-dashed border-luxury-gold/30 flex flex-col items-center justify-center text-luxury-gold/40">
                        <HelpCircle className="w-5 h-5 stroke-[1]" />
                        <span className="text-[8px] tracking-wide uppercase mt-1">Earrings</span>
                      </div>
                    )}
                  </div>

                  {/* Necklace Piece on dummy Form visual background */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gold-cream/20 rounded-t-[4rem] border-t border-x border-accent-peach/30 pointer-events-none -top-4 -bottom-2" />
                    <motion.img 
                      key={virtualMainPiece.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={virtualMainPiece.image} 
                      alt={virtualMainPiece.name}
                      referrerPolicy="no-referrer"
                      className="w-44 h-44 sm:w-52 sm:h-52 object-cover rounded-full shadow-lg border-4 border-white z-10"
                    />
                  </div>

                  {/* Accented Bangles stack detail float */}
                  {virtualMatchingAccents.some(a => a.category === 'bangles') && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-gold-cream/80 p-1.5 rounded-lg border border-luxury-gold/20"
                    >
                      <Layers className="w-3.5 h-3.5 text-primary-gold" />
                      <span className="text-[10px] font-sans font-bold text-luxury-dark uppercase">
                        Kadaa Accented: {virtualMatchingAccents.find(a => a.category === 'bangles')?.name}
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Quick actions for styled set */}
                <div className="pt-4 border-t border-accent-peach/20 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-sans text-luxury-slate">Ensemble Value:</span>
                    <strong className="font-serif text-base text-primary-gold">
                      ₹ {(virtualMainPiece.price + virtualMatchingAccents.reduce((acc, curr) => acc + curr.price, 0)).toLocaleString('en-IN')}
                    </strong>
                  </div>
                  
                  <button 
                    onClick={addEntireEnsembleToWishlist}
                    className="w-full py-3 bg-primary-gold text-white text-xs font-sans font-bold uppercase tracking-widest rounded-lg hover:bg-gold-dark transition-all shadow shimmer-btn flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" /> Save Ensemble to Wishlist
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold-cream flex items-center justify-center text-luxury-gold">
                  <HelpCircle className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-luxury-dark uppercase tracking-wider">
                    Main Centerpiece Required
                  </h4>
                  <p className="text-xs text-luxury-slate max-w-xs mx-auto mt-1 font-sans">
                    Please click on any premium necklace card on the left panel to populate the dressing form mannequin!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right panel: Accent match controls (3 Columns) */}
          <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-accent-peach/40 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold text-luxury-dark">
                2. Try Accents
              </h3>
              <p className="text-xs text-luxury-slate font-sans">
                Toggle compatible earrings and wrist cuffs to check styling weight balance:
              </p>

              {virtualMainPiece ? (
                <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
                  {potentialAccents.map((acc) => {
                    const isSelected = virtualMatchingAccents.some((p) => p.id === acc.id);
                    return (
                      <button
                        key={acc.id}
                        onClick={() => toggleVirtualMatchingAccent(acc)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 focus:outline-none cursor-pointer ${
                          isSelected 
                            ? 'bg-primary-gold/5 border-primary-gold' 
                            : 'border-accent-peach/30 hover:border-luxury-gold/40 bg-white'
                        }`}
                      >
                        <img 
                          src={acc.image} 
                          alt={acc.name} 
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-lg object-cover shrink-0 border border-accent-peach/20"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="font-sans font-bold text-[11px] text-luxury-dark truncate leading-tight">
                            {acc.name}
                          </h4>
                          <p className="text-[10px] text-primary-gold font-bold">
                            ₹ {acc.price.toLocaleString('en-IN')}
                          </p>
                          <span className="text-[9px] text-luxury-slate uppercase tracking-wider font-sans block leading-[1]">
                            {acc.category}
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-primary-gold border-primary-gold text-white' : 'border-accent-peach'
                        }`}>
                          {isSelected ? (
                            <Check className="w-2.5 h-2.5 stroke-[4]" />
                          ) : (
                            <Plus className="w-2.5 h-2.5 text-luxury-gold" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-luxury-slate/50 text-xs italic">
                  A centerpiece necklace must be selected first to try matching accessory parts.
                </div>
              )}
            </div>

            {virtualMainPiece && (
              <div className="pt-4 border-t border-accent-peach/30 mt-4 space-y-2 text-left">
                <span className="text-[10px] font-sans font-bold text-luxury-dark uppercase tracking-widest block">
                  Material Details:
                </span>
                <div className="flex flex-wrap gap-1">
                  {virtualMainPiece.materials.map((mat, i) => (
                    <span key={i} className="text-[9px] bg-gold-cream border border-luxury-gold/15 px-1.5 py-0.5 rounded text-luxury-slate">
                      {mat}
                    </span>
                  ))}
                  {virtualMatchingAccents.flatMap(v => v.materials).map((mat, i) => (
                    <span key={i} className="text-[9px] bg-blush-soft border border-blush-rose/10 px-1.5 py-0.5 rounded text-blush-rose">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
