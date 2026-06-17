import { useState } from 'react';
import { useStore } from '../store';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const { wishlist, activeCategory, searchQuery, currentScreen, currentUser } = useStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Quick store accessors
  const wishlistCount = wishlist.length;

  const handleNavClick = (screen: 'home' | 'collections', categoryName?: string, anchorId?: string) => {
    setIsMobileMenuOpen(false);
    
    if (screen === 'collections') {
      useStore.setState({ 
        currentScreen: 'collections', 
        activeCategory: categoryName || 'all' 
      });
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      useStore.setState({ currentScreen: 'home' });
      // Wait briefly for react to mount homepage if returning from collections
      setTimeout(() => {
        const id = anchorId || 'hero';
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }, 80);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-accent-peach/50 h-20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
          
          {/* Left: Nav items (Desktop) */}
          <nav className="hidden lg:flex flex-1 items-center gap-8">
            <button 
              onClick={() => handleNavClick('home')} 
              className={`font-sans text-sm font-semibold tracking-wider pb-1 transition-all ${
                currentScreen === 'home' 
                  ? 'text-primary-gold border-b-2 border-primary-gold' 
                  : 'text-luxury-slate hover:text-primary-gold'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('collections', 'all')} 
              className={`font-sans text-sm font-semibold tracking-wider pb-1 transition-all ${
                currentScreen === 'collections' && activeCategory === 'all'
                  ? 'text-primary-gold border-b-2 border-primary-gold' 
                  : 'text-luxury-slate hover:text-primary-gold'
              }`}
            >
              All Creations
            </button>
            <button 
              onClick={() => handleNavClick('collections', 'earrings')} 
              className={`font-sans text-sm font-semibold tracking-wider pb-1 transition-all ${
                currentScreen === 'collections' && activeCategory === 'earrings'
                  ? 'text-primary-gold border-b-2 border-primary-gold' 
                  : 'text-luxury-slate hover:text-primary-gold'
              }`}
            >
              Earrings
            </button>
            <button 
              onClick={() => handleNavClick('collections', 'necklaces')} 
              className={`font-sans text-sm font-semibold tracking-wider pb-1 transition-all ${
                currentScreen === 'collections' && activeCategory === 'necklaces'
                  ? 'text-primary-gold border-b-2 border-primary-gold' 
                  : 'text-luxury-slate hover:text-primary-gold'
              }`}
            >
              Necklaces
            </button>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex flex-1 items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-luxury-dark hover:text-primary-gold transition-colors p-2"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Center Brand Name */}
          <div className="flex-1 flex justify-center text-center">
            <button 
              onClick={() => handleNavClick('home')}
              className="group cursor-pointer flex flex-col items-center"
            >
              <h1 className="font-serif text-2xl md:text-3xl font-semibold tracking-[0.15em] text-primary-gold group-hover:text-gold-dark transition-colors uppercase">
                Viraasat
              </h1>
              <span className="text-[9px] uppercase tracking-[0.3em] text-luxury-slate font-sans group-hover:text-primary-gold transition-all">
                The Gilded Heritage
              </span>
            </button>
          </div>

          {/* Right menu actions */}
          <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
            <nav className="hidden lg:flex items-center gap-6 mr-4">
              <button 
                onClick={() => handleNavClick('collections', 'bangles')} 
                className={`font-sans text-sm font-semibold tracking-wider pb-1 transition-all ${
                  currentScreen === 'collections' && activeCategory === 'bangles'
                    ? 'text-primary-gold border-b-2 border-primary-gold' 
                    : 'text-luxury-slate hover:text-primary-gold'
                }`}
              >
                Bangles
              </button>
              <button 
                onClick={() => handleNavClick('collections', 'bridal')} 
                className={`font-sans text-sm font-semibold tracking-wider pb-1 transition-all ${
                  currentScreen === 'collections' && activeCategory === 'bridal'
                    ? 'text-primary-gold border-b-2 border-primary-gold' 
                    : 'text-luxury-slate hover:text-primary-gold'
                }`}
              >
                Bridal
              </button>
              <button 
                onClick={() => handleNavClick('home', undefined, 'salon')} 
                className="font-sans text-sm font-semibold tracking-wider text-primary-gold hover:text-gold-dark flex items-center gap-1.5 bg-gold-cream/60 py-1 px-2.5 rounded border border-luxury-gold/20"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Try-On Salon
              </button>
            </nav>

            {/* Quick Actions Panel */}
            <div className="flex items-center gap-4 text-primary-gold">
              {/* Search Toggle */}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:scale-110 transition-transform p-1.5 focus:outline-none"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist toggle */}
              <button 
                onClick={() => useStore.setState({ isWishlistOpen: true })}
                className="relative hover:scale-110 transition-transform p-1.5 focus:outline-none"
                aria-label="View wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-blush-rose stroke-blush-rose' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blush-rose text-white text-[10px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* My Account Dashboard gateway */}
              <button 
                onClick={() => {
                  useStore.setState({ currentScreen: 'account' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`hover:scale-110 transition-transform p-1.5 focus:outline-none relative ${
                  currentScreen === 'account' ? 'text-primary-gold bg-gold-cream/40 rounded' : ''
                }`}
                aria-label="My Account Dashboard"
                title={currentUser ? `Atelier Registry: ${currentUser.name}` : `Open Patron Account / Authentication`}
              >
                <User className="w-5 h-5 text-primary-gold" />
                {currentUser && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Floating search input strip */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 w-full bg-gold-cream border-b border-accent-peach shadow-md px-6 py-4"
            >
              <div className="max-w-2xl mx-auto flex items-center gap-3">
                <Search className="text-primary-gold w-5 h-5 shrink-0" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    useStore.setState({ searchQuery: e.target.value });
                    if (currentScreen !== 'collections') {
                      useStore.setState({ currentScreen: 'collections' });
                    }
                  }}
                  placeholder="Search royal chokers, necklaces, heritage jhumkas, bracelets..."
                  className="w-full bg-transparent border-b border-luxury-gold/40 focus:border-primary-gold text-luxury-dark placeholder-luxury-slate/60 outline-none pb-1 font-sans text-base"
                  autoFocus
                />
                <button 
                  onClick={() => {
                    useStore.setState({ searchQuery: '' });
                    setIsSearchOpen(false);
                  }}
                  className="text-luxury-slate hover:text-luxury-dark text-xs uppercase tracking-wider underline font-sans"
                >
                  Clear & Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Slide-out mobile navigation drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Drawer */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white z-[51] shadow-2xl flex flex-col p-6"
            >
              <div className="flex justify-between items-center pb-6 border-b border-accent-peach">
                <div>
                  <h3 className="font-serif text-xl tracking-widest text-primary-gold uppercase">VIRAASAT</h3>
                  <p className="text-[10px] tracking-wider text-luxury-slate uppercase">Premium Indian Heritage</p>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-luxury-slate hover:text-luxury-dark p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-5 py-8 flex-grow overflow-y-auto">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    useStore.setState({ currentScreen: 'account' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left font-serif text-lg text-primary-gold hover:text-gold-dark transition-colors py-2 flex items-center gap-2 border-b border-accent-peach/20 pb-4"
                >
                  <User className="w-5 h-5 text-primary-gold" /> My Account {currentUser ? `(${currentUser.name})` : ''}
                </button>

                <button 
                  onClick={() => handleNavClick('home')}
                  className="text-left font-serif text-lg text-luxury-dark hover:text-primary-gold transition-colors py-2"
                >
                  Home
                </button>
                <button 
                  onClick={() => handleNavClick('collections', 'all')}
                  className="text-left font-serif text-lg text-luxury-dark hover:text-primary-gold transition-colors py-2"
                >
                  New Arrivals
                </button>
                <button 
                  onClick={() => handleNavClick('collections', 'earrings')}
                  className="text-left font-serif text-lg text-luxury-dark hover:text-primary-gold transition-colors py-2"
                >
                  Earrings Collection
                </button>
                <button 
                  onClick={() => handleNavClick('collections', 'necklaces')}
                  className="text-left font-serif text-lg text-luxury-dark hover:text-primary-gold transition-colors py-2"
                >
                  Necklaces Collection
                </button>
                <button 
                  onClick={() => handleNavClick('collections', 'bangles')}
                  className="text-left font-serif text-lg text-luxury-dark hover:text-primary-gold transition-colors py-2"
                >
                  Bangles Collection
                </button>
                <button 
                  onClick={() => handleNavClick('collections', 'bridal')}
                  className="text-left font-serif text-lg text-luxury-dark hover:text-primary-gold transition-colors py-2"
                >
                  Bridal Couture Set
                </button>
                <button 
                  onClick={() => handleNavClick('home', undefined, 'salon')}
                  className="text-left font-serif text-lg text-primary-gold bg-gold-cream/80 py-2.5 px-4 rounded border border-luxury-gold/30 hover:bg-gold-cream transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5 shrink-0" /> Virtual Try-On Salon
                </button>
              </div>

              <div className="pt-6 border-t border-accent-peach text-center space-y-2">
                <p className="text-xs text-luxury-slate font-sans">© 2026 Viraasat Jewelry.</p>
                <p className="text-[10px] text-primary-gold italic">Handcrafted with Heritage</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
