import { motion } from 'motion/react';
import { FileText, ArrowLeft, Gem, ShieldAlert, Award, HelpingHand } from 'lucide-react';
import { useStore } from '../store';

export default function TermsPage() {
  const setCurrentScreen = useStore((state) => state.setCurrentScreen);

  const clauses = [
    {
      icon: Award,
      title: "Authenticity & Karat Gold Certifications",
      content: "All pieces listed within our catalog feature hallmark 22K, 18K, or premium anti-tarnish micro-plates matching exact spec standards. Our diamonds, moissanites, beads, and kundan elements undergo meticulous expert inspections. You receive digital certificate invoices highlighting alloy specs and stone ratings."
    },
    {
      icon: Gem,
      title: "Bespoke Jewelry Customization Fitting Guidelines",
      content: "Customized bridal sets, tailored neckpiece extensions, and personalized ring dimensions follow high-density sizing specifications. We offer free consultation adjustments for accounts within 30 days after dispatch. Once custom order templates are individually hand-poured, cancellation requests may incur standard structural alloy restocking fees."
    },
    {
      icon: ShieldAlert,
      title: "Plating Warranty & Wear Guarantees",
      content: "We back our microplate luxury pieces with a complimentary 1-full-year tarnish and color-restoration promise. Normal wear-and-tear, exposure to high moisture pools, heavy alcohol perfume sprays, or active swimming pools are excluded from standard warranties but still qualify for our lifelong structural repair atelier services."
    }
  ];

  return (
    <div id="terms-of-service-view" className="bg-gold-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => {
            setCurrentScreen('home');
            window.scrollTo({ top: 0, behavior: 'instant' });
          }}
          className="group flex items-center gap-2 text-primary-gold hover:text-gold-dark font-sans text-sm font-semibold tracking-wider uppercase mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Atelier
        </button>

        {/* Content Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="font-script text-3xl text-primary-gold">Terms of Service</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-luxury-dark tracking-tight leading-tight">
            Patronage Terms & Conditions
          </h1>
          <div className="w-24 h-[1px] bg-luxury-gold mx-auto my-6" />
          <p className="text-luxury-slate font-sans max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Please read these guidelines thoroughly to establish a secure partnership of artistry and trust.
          </p>
        </div>

        {/* Major Clauses */}
        <div className="space-y-12">
          {clauses.map((clause, index) => {
            const Icon = clause.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-accent-peach/50 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="bg-blush-soft p-4 rounded-xl text-primary-gold shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-serif text-xl sm:text-2xl text-luxury-dark font-medium">
                      {clause.title}
                    </h3>
                    <p className="text-luxury-slate font-sans text-sm sm:text-base leading-relaxed">
                      {clause.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 bg-blush-soft/50 border border-blush-rose/10 rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 justify-between text-center md:text-left">
          <div className="space-y-2">
            <h4 className="font-serif text-lg text-luxury-dark font-medium">Have bespoke queries concerning our policies?</h4>
            <p className="text-xs text-luxury-slate max-w-md">Our global customer helpline and atelier desk are live daily to verify plating, sizing, or shipment configurations.</p>
          </div>
          <button
            onClick={() => {
              // Smooth scroll to the footer's let's talk / email newsletter
              const footer = document.querySelector('footer');
              if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 bg-primary-gold hover:bg-gold-dark text-white rounded-xl font-sans text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer"
          >
            Contact Patron Desk
          </button>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-12">
          <p className="text-xs text-luxury-slate/75 font-sans">
            Terms Version 3.4 • Published: June 2026
          </p>
        </div>
      </div>
    </div>
  );
}
