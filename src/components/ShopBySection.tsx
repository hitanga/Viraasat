import { motion } from 'motion/react';
import { useStore } from '../store';
import { ArrowUpRight } from 'lucide-react';

export default function ShopBySection() {
  const activeCategory = useStore((state) => state.activeCategory);

  const selectCategory = (categoryName: string) => {
    useStore.setState({ activeCategory: categoryName, currentScreen: 'collections' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const categories = [
    {
      id: 'earrings',
      name: 'Earrings',
      count: '340+ Handcrafted Pieces',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO9cRCDbU2hYww2KrOuM7G6icg1nZ_J9aqkoMMmyzWiVlzqFOQj4A48r2XsUnlJAD_tjR6pwl4cvUmJvAm3sIc7YVCc1wFFP5PtB-RyVaLIBnqLIgr68wgWy4RVG5vlgF51mRv0C7h4JHfId0rgDLsi-40ElEAZ9i8IAu_Bh00_E6_mfH2MMGgu4V91RwB1NAlgE6gTqnLHPZU84g5kEP64QKAO1vtm6V5uf329nwyQJ8qslsKXVyG',
      offsetClass: ''
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      count: '210+ Heritage Chokers',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9ab1nQq8L1w_9byciXDn7u6lmxOSEL2ao2d3Ssm2QUJ8lAbsuaIRGy4kFErXTO6rivsBQeHRD2lz5nqQpMs7JYfKeVSdaWjLDYWCAz1LeKH5SJAqUHzsu7ojYOl7c9PuRo6ZKjUyXNaBgribivitinJLpcfwvt2Mp2B3ILuaAh58bX5ogl_Mk6hWKeVDDrGVhkbk1fDHZxaoD7slSXg8ibSXCq84svmYIQ8Z1tTdwBDxpVTqbHxTQ',
      offsetClass: 'md:mt-12'
    },
    {
      id: 'bangles',
      name: 'Bangles',
      count: '180+ Kadaas & Bangles',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCworTXgonTBFWsO3hLL_zW3xsurVJ8jbrxMdJGjqOOdHH7BuP7iP42LIW37iRyPBOGDEnYMqOZenJ09FdUi9BVObN8P1OtH98EJiE4Bq0xARSCGFJ_XnyAgUmGuxNdP1LgPgnzIb97hcLeiDex5hDAXlNyqW28avQPIksdD6GWq-gg_uVgt6AePiZN4wbJmncbH1rwGV-a8PxrjbuPeP4HBnqhOpZwojFrQQabbrtCi5k-H84zqXXG',
      offsetClass: ''
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto text-center">
      <div className="space-y-3 mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-gold">Luxury Classifications</span>
        <h2 className="font-serif text-3xl md:text-4xl text-luxury-dark font-medium">Shop by Category</h2>
        <div className="w-20 h-1 bg-primary-gold mx-auto rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {categories.map((cat, idx) => (
          <motion.div 
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            onClick={() => selectCategory(cat.id)}
            className={`group relative h-[450px] overflow-hidden rounded-2xl cursor-pointer shadow-md border border-accent-peach/20 ${cat.offsetClass}`}
          >
            {/* Elegant luxury overlay cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/75 via-luxury-dark/20 to-transparent z-10 group-hover:via-luxury-dark/45 transition-all duration-300 pointer-events-none" />
            
            <img 
              src={cat.image} 
              alt={cat.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            
            <div className="absolute bottom-0 left-0 w-full p-8 z-20 text-left flex justify-between items-end">
              <div>
                <h3 className="text-white font-serif text-2xl tracking-wide group-hover:text-primary-gold transition-colors">
                  {cat.name}
                </h3>
                <p className="text-white/80 font-sans text-xs uppercase tracking-widest mt-1">
                  {cat.count}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-primary-gold group-hover:border-primary-gold group-hover:scale-110 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
