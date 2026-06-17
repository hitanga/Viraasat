import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../store';

export default function Hero() {
  const scrollToCatalog = () => {
    useStore.setState({ activeCategory: 'all' });
    const target = document.getElementById('catalog');
    if (target) {
      const offset = 80;
      const elementPos = target.getBoundingClientRect().top;
      const offsetPos = elementPos + window.scrollY - offset;
      window.scrollTo({ top: offsetPos, behavior: 'smooth' });
    }
  };

  const scrollToNewArrivals = () => {
    useStore.setState({ activeCategory: 'earrings' }); // high-fidelity trending filter
    const target = document.getElementById('catalog');
    if (target) {
      const offset = 80;
      const elementPos = target.getBoundingClientRect().top;
      const offsetPos = elementPos + window.scrollY - offset;
      window.scrollTo({ top: offsetPos, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:py-28 overflow-hidden bg-white">
      {/* Absolute high-contrast soft decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-cream rounded-full filter blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blush-soft rounded-full filter blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Text & CTAs */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-6 space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-cream/90 border border-luxury-gold/30">
            <Sparkles className="w-3.5 h-3.5 text-primary-gold animate-bounce" />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary-gold">
              Elegance Redefined
            </span>
          </div>

          <h2 className="font-serif text-[42px] sm:text-[50px] md:text-[56px] lg:text-[64px] leading-[1.1] font-semibold text-luxury-dark tracking-tight">
            Jewelry That <br className="hidden lg:block"/>
            Makes Every <br />
            <span className="font-script text-primary-gold text-[5rem] sm:text-[6.2rem] md:text-[6.8rem] normal-case block leading-[0.5] pt-4 pb-2">
              Moment Shine
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-luxury-slate max-w-lg leading-relaxed pt-2">
            Handcrafted with heritage, designed for the modern woman. Discover a collection that blends timeless Indian craftsmanship with contemporary minimalism.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={scrollToCatalog}
              className="shimmer-btn bg-primary-gold text-white px-8 py-4 rounded-lg font-sans font-bold text-sm uppercase tracking-wider hover:bg-gold-dark transition-all duration-300 shadow-md flex items-center gap-2 group cursor-pointer"
            >
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollToNewArrivals}
              className="border-2 border-luxury-gold/50 text-primary-gold px-8 py-4 rounded-lg font-sans font-bold text-sm uppercase tracking-wider hover:bg-gold-cream transition-all duration-300 cursor-pointer"
            >
              New Arrivals
            </button>
          </div>
        </motion.div>

        {/* Right Column: High-fidelity floating photo composition */}
        <div className="md:col-span-6 relative h-[450px] sm:h-[500px] lg:h-[550px] flex items-center justify-center">
          
          {/* Main Backdrop Glass Aura */}
          <div className="absolute w-[80%] h-[80%] bg-gold-cream/50 rounded-[4rem] filter blur-xl rotate-12 pointer-events-none" />

          {/* Piece 1: Traditional Chandbalis Bubble (Upper Right) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute top-2 right-[5%] sm:right-[15%] w-36 h-36 sm:w-44 sm:h-44 z-20 floating-element"
            style={{ animationDelay: '0s' }}
          >
            <div className="relative group w-full h-full">
              <div className="absolute inset-0 bg-primary-gold/10 rounded-full blur-md group-hover:scale-115 transition-transform" />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApWc-87-nV_7pYuacu0E3ImQFInxDCY7zWZKQ07IJOEJMGUCiRvO2inEYF1mvrv6LEpBRPw43VkIpVMxwYwBHR_QoOKuNf2z__ZuJHX-IPOYJsYzkMXvwTksJQOsLIkS_Ldw7UiCWYg5AjWIhW7xRppFgpR7YbyZYHVFYKbKt9OHEG8b0rdAHFYyHvGr86LSOtRNtiRmo5YABsF-ulLXpHba7ir6ltluipTDqO5WdPdGxeJA0yieo0"
                alt="Devi Heritage Kundan Chandbalis detail bubble"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full shadow-xl border-4 border-white transition-transform group-hover:scale-105 duration-300"
              />
            </div>
          </motion.div>

          {/* Piece 2: Heavy Bridal Haar (Bottom Left / Main Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="absolute bottom-2 left-[5%] lg:left-[10%] w-[220px] h-[270px] sm:w-[280px] sm:h-[340px] z-10 floating-element"
            style={{ animationDelay: '1.5s' }}
          >
            <div className="relative group w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJxAIRlp6IJfM78zFCTg-vSDtmYoqfjx2YeN-q3gWT08yOjgfztMV9RqMw5bEcb81_M_tPDArYCl92z75q75pq-m6p8PB3O42ORidIMWgYIOVaZS4Qljkuz4YEG6gZ9i14BuY2665wB9VK1hdXUnuV9rmU9afR4KcEDqui4YnOqp68rR6CvAJiZFJAgrSIa4_nnt8aWpDuc5Nci_TEVyvt4vfIF1vNO_wfsFUSztqVPtz1bqOIcRfc"
                alt="Heritage Emerald Temple Haar displayed elegantly"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 flex flex-col justify-end text-left">
                <p className="text-white text-xs font-semibold tracking-wider uppercase font-sans">Heritage Special</p>
                <h4 className="text-white text-sm font-serif italic">The Varanasi Haar</h4>
              </div>
            </div>
          </motion.div>

          {/* Piece 3: Bangles Cluster Overlay (Center-Right overlay circle) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute top-[45%] right-0 w-32 h-32 sm:w-40 sm:h-40 z-30 floating-element"
            style={{ animationDelay: '0.7s' }}
          >
            <div className="relative group w-full h-full">
              <div className="absolute inset-0 bg-luxury-gold/20 rounded-full blur-md group-hover:scale-115 transition-transform" />
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXWTnAcbhQ2FcqJB6eaYe1FuCiHdWXu-ITT-UVbu9BtPBy_HuG-9aPsvNaEF0atVW3GxsVMGoKNG37OAepD3HcIrN_ZBwfrJwq7UXr3NrMEhGXxulO0Xk-aka62mKxC6v1pIFApXzjha84Dch0u8Wug1_5timKwtcueNKxvLa5uB-mpw2J7HSkA-zVTYddRxfyBA6MPR2LRS7MV5FwtMzkk_ECq0bXTzKFGM9JxO_Sfxqglc7qAkqK"
                alt="Mayur Filigree Bangles details"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full shadow-xl border-4 border-white transition-transform group-hover:scale-105 duration-300"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
