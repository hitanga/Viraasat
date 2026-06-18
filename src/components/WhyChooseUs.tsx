import { motion } from 'motion/react';
import { Award, Drill, Heart, ShieldCheck, Sun, Gem, Trash2 } from 'lucide-react';

export default function WhyChooseUs() {
  const values = [
    {
      icon: Award,
      title: 'Premium Craftsmanship',
      desc: 'Intricate details by master artisans with decades of heritage-level experience.'
    },
    {
      icon: Heart,
      title: 'Comfortable To Wear',
      desc: 'Designed with weight-balanced ergonomics in mind for strain-free comfort.'
    },
    {
      icon: Sun,
      title: 'Trend Focused',
      desc: 'Regularly updated catalog editions that redefine contemporary Indian looks.'
    },
    {
      icon: Gem,
      title: 'Affordable Luxury',
      desc: 'High-end premium aesthetics without the marked-up diamond price tags.'
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-12 gap-16 items-center">
        
        {/* Left Double Image Arrangement with Overlay Premium Badge */}
        <div className="md:col-span-6 relative grid grid-cols-2 gap-4">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="pt-12"
          >
            <img 
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg border border-accent-peach/20" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZhyfq-eccj_0mZozPVXAC2GA5ji0ZMNFaK4Vs_y826dHCi__f3vYvSsFwEFos1I7uQ86ZPym-RHYr3waLsugowC91OYrz_tznJAJsjXmqDMnsA-fAuufhLoCVtQXDlNOGi52xSFefcrYavNsc9xeV9dWBejBYgWgqoGHNbPLjHwb587puXQSvAqmwiOZppRkbUKcx_6LkScuGHxkKtoqNlc1m-guhyMw2QoSx2zvtbj5cCMalu2gi"
              alt="Artisan hands assembling custom kundan stones"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img 
              className="w-full h-[400px] object-cover rounded-2xl shadow-lg border border-accent-peach/20" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfagU4tjh3oJZx8DYhNxnNdAgHqLdyLoGOkjxj7155O5PeevT0H8S4OI1kyCJ4AHuJpqNyrBxSuGLOdstGDJPnpUu9lGhfXkaUHErD_N7uj0VRsIZYawKbTKb8Q8vr88VomsFBKIEGVZWSB1-NlGKDtulgGHQ1yy-rQYg6LuwDXPaffDVh7z5CrnLQ2XVuKwqzOOBK0-nG9M-0SKsNX_-COpN86Ihk-h2b8n_igVA9qiKyDxV_hHtT"
              alt="Woman laughing and wearing premium Viraasat gold choker"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Golden Center Overlay Medal */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="w-28 h-28 sm:w-32 sm:h-32 bg-primary-gold rounded-full flex flex-col items-center justify-center text-white border-[6px] border-white shadow-xl"
            >
              <Award className="w-8 h-8 md:w-10 md:h-10 text-white stroke-[1.5]" />
              <span className="text-[8px] uppercase tracking-[0.2em] font-sans font-bold text-white/90 mt-1">
                Viraasat Trust
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Descriptive Column */}
        <div className="md:col-span-6 space-y-8 text-left">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-gold">The Art of Fine Jewelry</span>
            <h2 className="font-serif text-3xl md:text-4xl text-luxury-dark font-medium leading-tight">
              Crafted With Perfection
            </h2>
            <div className="w-16 h-0.5 bg-primary-gold" />
            <p className="text-luxury-slate font-sans text-base leading-relaxed">
              Every single piece at Viraasat is a labor of love, designed to withstand time, honor our cultural heritage, and set new modern style trends.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {values.map((v, idx) => {
              const IconComp = v.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 12px 24px -10px rgba(216,178,110,0.3)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 160, 
                    damping: 15 
                  }}
                  className="glass-card p-6 rounded-2xl space-y-3 shadow-sm border border-accent-peach/20 hover:border-primary-gold/50 transition-all flex flex-col justify-between cursor-pointer bg-white"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gold-cream flex items-center justify-center text-primary-gold">
                      <IconComp className="w-5 h-5 animate-pulse" />
                    </div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-luxury-dark">
                      {v.title}
                    </h4>
                    <p className="text-xs text-luxury-slate leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
