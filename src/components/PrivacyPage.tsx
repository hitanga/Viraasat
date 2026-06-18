import { motion } from 'motion/react';
import { Shield, ArrowLeft, Lock, Eye, FileText, CheckCircle } from 'lucide-react';
import { useStore } from '../store';

export default function PrivacyPage() {
  const setCurrentScreen = useStore((state) => state.setCurrentScreen);

  const sections = [
    {
      icon: Shield,
      title: "Data Protection Commitment",
      content: "At Viraasat, we consider the privacy and protection of our patrons' security of paramount importance. Client credentials, secure consultation logs, and order histories are heavily encrypted with advanced transport security protocols and Firestore database tier guarantees. Your design discussions and bespoke measurements remain strictly private."
    },
    {
      icon: Lock,
      title: "Information Safeguarding",
      content: "We collect basic credentials solely to design bespoke fits and handle premium logistics inquiries. We never expose your mailing list details, contact information, phone numbers, or design checklist records to brokers, third-party dealers, or promotional lists."
    },
    {
      icon: Eye,
      title: "Consent & Controls",
      content: "You retain full control over your structural account history, saved wishlist collections, and customized inquiries. You can request deletion of your Viraasat profiling database or historical communications by lodging a request directly to the support deck."
    }
  ];

  return (
    <div id="privacy-policy-view" className="bg-gold-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8">
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
          <p className="font-script text-3xl text-primary-gold">Privacy Policy</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-luxury-dark tracking-tight leading-tight">
            Protection & Trust Covenant
          </h1>
          <div className="w-24 h-[1px] bg-luxury-gold mx-auto my-6" />
          <p className="text-luxury-slate font-sans max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Ensuring absolute data exclusivity and secure transaction compliance for our global connoisseurs.
          </p>
        </div>

        {/* Major Sections */}
        <div className="space-y-12">
          {sections.map((sec, index) => {
            const Icon = sec.icon;
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
                      {sec.title}
                    </h3>
                    <p className="text-luxury-slate font-sans text-sm sm:text-base leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Guidelines list */}
        <div className="mt-16 bg-white/50 border border-luxury-gold/15 rounded-3xl p-8 sm:p-12 space-y-8">
          <h2 className="font-serif text-2xl sm:text-3xl text-luxury-dark text-center">
            How we protect your Viraasat profiling
          </h2>
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-sans font-semibold text-sm text-luxury-dark uppercase tracking-wider">End-to-End Encryption</h4>
                <p className="text-xs text-luxury-slate leading-relaxed">All transaction and authentication parameters transfer over SSL/TLS.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-sans font-semibold text-sm text-luxury-dark uppercase tracking-wider">No Brokerage of Lists</h4>
                <p className="text-xs text-luxury-slate leading-relaxed">Email addresses submitted for newsletters remain isolated in firewalled Firestore keys.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-sans font-semibold text-sm text-luxury-dark uppercase tracking-wider">Patron Anonymity Option</h4>
                <p className="text-xs text-luxury-slate leading-relaxed">Custom fitting profiles can be completed using masked local references.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-sans font-semibold text-sm text-luxury-dark uppercase tracking-wider">Clear Consent Dialogs</h4>
                <p className="text-xs text-luxury-slate leading-relaxed">Our design checklists will never upload tracking state details to remote servers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="text-center mt-12">
          <p className="text-xs text-luxury-slate/75 font-sans">
            Last Updated: June 2026 • Policy Version 2.1
          </p>
        </div>
      </div>
    </div>
  );
}
