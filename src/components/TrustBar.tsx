import { Award, Heart, ShieldCheck, Truck, Sparkles, Feather } from 'lucide-react';

export default function TrustBar() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'Premium Quality',
      desc: '100% Certified Materials'
    },
    {
      icon: Heart,
      title: 'Skin Friendly',
      desc: 'Hypoallergenic Alloys'
    },
    {
      icon: Feather,
      title: 'Lightweight',
      desc: 'Designed for Earlobe Comfort'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      desc: 'Express Pan-India Transit'
    },
    {
      icon: Sparkles,
      title: 'Trend Inspired',
      desc: 'Timeless Contemporary Style'
    }
  ];

  return (
    <section className="bg-surface-container-low py-12 border-y border-accent-peach/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
        {trustItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={index} 
              className="flex flex-col items-center text-center space-y-2 group col-span-1 even:border-l even:border-accent-peach/20 md:even:border-l-0 md:[&:not(:first-child)]:border-l md:border-accent-peach/30"
            >
              <div className="p-2 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-6 h-6 text-primary-gold stroke-[1.5]" />
              </div>
              <h4 className="font-sans font-bold text-xs uppercase tracking-[0.15em] text-luxury-dark pt-1">
                {item.title}
              </h4>
              <p className="text-[10px] text-luxury-slate uppercase tracking-wider hidden sm:block">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
