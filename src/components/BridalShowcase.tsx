import { useStore } from '../store';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function BridalShowcase() {
  const selectBridal = () => {
    useStore.setState({ activeCategory: 'bridal', searchQuery: '', currentScreen: 'collections' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section id="bridal" className="relative py-20 bg-surface-container-low overflow-hidden">
      {/* Soft overlay patterns resembling elegant drapes */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl grid md:grid-cols-12 border border-accent-peach/30">
          
          {/* Left Text Segment */}
          <div className="p-8 sm:p-12 md:p-16 lg:p-20 md:col-span-6 flex flex-col justify-center space-y-6 text-left">
            <span className="text-xs font-bold text-primary-gold tracking-[0.25em] uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary-gold" /> The Wedding Edit
            </span>
            
            <h2 className="font-serif text-[38px] sm:text-[44px] lg:text-[50px] leading-[1.2] font-semibold text-luxury-dark">
              Celebrate Every <br />
              <span className="font-script text-primary-gold text-[5.2rem] normal-case block leading-[0.5] pt-4 pb-2">
                Wedding Moment
              </span>
            </h2>
            
            <p className="font-sans text-sm sm:text-base text-luxury-slate leading-relaxed">
              Our bridal collection is custom designed to make you feel like a queen on your special day. Discover matched sets, mathapattis, and magnificent haars curated for Haldi, Mehendi, and the Grand Wedding.
            </p>
            
            <div className="pt-2">
              <button 
                onClick={selectBridal}
                className="shimmer-btn bg-primary-gold text-white px-8 py-4 rounded-xl font-sans font-bold text-xs uppercase tracking-widest hover:bg-gold-dark transition-all duration-300 shadow-md focus:outline-none cursor-pointer"
              >
                View Bridal Collection
              </button>
            </div>
          </div>

          {/* Right Imagery Segment */}
          <div className="md:col-span-6 relative min-h-[350px] md:h-auto overflow-hidden group">
            <div className="absolute inset-0 bg-primary-gold/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <img 
              className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIgRPpjEpMSl6OmON1eBpkMf_mhFPlAfKDsoaDYnVPzS6c8qOPX1Fq0HubqkNONHujMllro_ktXo_v-lA-t3iL4BzEKVcW5bCHv1rN4X8TFrZSx1ayFmxWi_c_MLEYdyvKD3mNRsMV2WvQEqBQs9auWDvY4J59fvvQy4QLw9SzQ_9zsvx6CIqpO8sHdM9DeVJGGMaLdp_63CU-e9w2a6uts7ZfkcQnVoByPCGHsUBQmdanSREh5pOY"
              alt="Intricate bridal jewelry set with kundan and rubies layered beautifully"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
