import { useStore } from '../store';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Heart, Star, Sparkles, SlidersHorizontal, Eye, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TrendingCollection() {
  const { 
    activeCategory, 
    searchQuery, 
    sortBy, 
    toggleWishlist, 
    isInWishlist 
  } = useStore();

  const handleProductSelect = (product: Product) => {
    useStore.setState({ selectedProduct: product });
  };

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'bangles', label: 'Bangles' },
    { id: 'bridal', label: 'The Bridal Edit' },
  ];

  // Map filters together
  const filteredProducts = PRODUCTS.filter((prod) => {
    // Category match
    const matchesCategory = 
      activeCategory === 'all' || 
      prod.category === activeCategory || 
      (activeCategory === 'bridal' && prod.isBridal);

    // Search query match
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    // Featured default
    return b.reviewsCount - a.reviewsCount;
  });

  // Limit displaying to exactly 8 products per user's requirement
  const displayedProducts = sortedProducts.slice(0, 8);

  const activateAllCategories = () => {
    useStore.setState({ activeCategory: 'all', searchQuery: '', currentScreen: 'collections' });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section id="catalog" className="bg-surface-container-lowest py-20 border-t border-accent-peach/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title and top-aligned trigger */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-1 text-primary-gold text-xs font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" /> Curated Collection
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-luxury-dark tracking-tight">
              Trending Collection
            </h2>
            <p className="text-luxury-slate text-sm font-sans">
              Pieces everyone is falling in love with. Handcrafting bespoke perfection.
            </p>
          </div>
          <button 
            onClick={activateAllCategories}
            className="text-primary-gold font-sans font-bold text-sm tracking-wider border-b border-primary-gold pb-0.5 hover:text-gold-dark transition-colors"
          >
            View All Creations
          </button>
        </div>

        {/* Live Filter & Controls strip */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-accent-peach/30 mb-10">
          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => useStore.setState({ activeCategory: cat.id })}
                className={`px-5 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id 
                    ? 'bg-primary-gold text-white shadow-md' 
                    : 'bg-gold-cream/60 text-luxury-slate border border-luxury-gold/15 hover:border-primary-gold/40 hover:bg-gold-cream'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sorter and Search Result Info */}
          <div className="flex flex-wrap items-center justify-between w-full lg:w-auto gap-4">
            <p className="text-xs text-luxury-slate font-sans tracking-wide">
              Showing <span className="font-bold text-luxury-dark">{displayedProducts.length}</span> stunning masterpieces
            </p>
            
            <div className="flex items-center gap-2 bg-gold-cream/40 border border-luxury-gold/15 px-3 py-1.5 rounded-lg">
              <SlidersHorizontal className="w-3.5 h-3.5 text-primary-gold" />
              <select
                value={sortBy}
                onChange={(e: any) => useStore.setState({ sortBy: e.target.value })}
                className="bg-transparent border-none text-xs font-sans font-semibold text-luxury-dark outline-none cursor-pointer pr-3"
              >
                <option value="featured">Featured Pieces</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Reviews Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid Layout */}
        {displayedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="font-serif text-xl text-luxury-dark">No jewelry masterpieces found in this drawer.</p>
            <p className="text-luxury-slate text-sm max-w-md mx-auto">
              Try resetting your search query or selecting another classification above.
            </p>
            <button
              onClick={activateAllCategories}
              className="px-6 py-3 bg-primary-gold text-white text-xs uppercase font-bold tracking-wider rounded-lg hover:bg-gold-dark transition-all"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {displayedProducts.map((prod) => {
                const isFavorite = isInWishlist(prod.id);
                return (
                  <motion.div 
                    key={prod.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -8 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 140,
                      damping: 18
                    }}
                    className="group flex flex-col justify-between h-full text-left cursor-pointer"
                    onClick={() => handleProductSelect(prod)}
                  >
                    <div className="relative bg-gold-cream/40 rounded-2xl overflow-hidden aspect-[4/5] shadow-sm border border-accent-peach/20 mb-4 group-hover:shadow-xl transition-all duration-300">
                      {prod.isBridal && (
                        <span className="absolute top-4 left-4 bg-blush-rose text-white text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm z-10 flex items-center gap-1">
                          Bridal
                        </span>
                      )}
                      
                      {/* Product Image */}
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Wishlist Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(prod.id);
                        }}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary-gold hover:bg-primary-gold hover:text-white shadow-md transition-all active:scale-95 focus:outline-none z-10"
                        aria-label={`Toggle wish ${prod.name}`}
                      >
                        <Heart 
                          className={`w-4 h-4 transition-colors ${
                            isFavorite ? 'fill-blush-rose stroke-blush-rose text-white' : 'stroke-primary-gold'
                          }`} 
                        />
                      </button>

                      {/* Hover Actions Strip */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductSelect(prod);
                          }}
                          className="w-full bg-white/95 text-luxury-dark py-3.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider hover:bg-primary-gold hover:text-white transition-all shadow-lg flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Quick View Spec
                        </button>
                      </div>
                    </div>

                    {/* Metadata block */}
                    <div className="space-y-1 mt-1 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Title click -> opens drawer spec detail */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductSelect(prod);
                          }}
                          className="font-sans font-bold text-sm text-luxury-dark hover:text-primary-gold transition-colors text-left"
                        >
                          {prod.name}
                        </button>

                        <p className="text-[11px] text-luxury-slate tracking-widest uppercase font-sans mt-0.5">
                          {prod.category} • Handcrafted
                        </p>
                      </div>

                      {/* Pricing block */}
                      <div className="pt-2">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-lg font-bold text-primary-gold">
                            ₹ {prod.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-luxury-slate/50 line-through text-xs font-sans">
                            ₹ {prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Star feedback rating block */}
                        <div className="flex items-center gap-1 mt-1 text-primary-gold">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-3 h-3 ${
                                  i < Math.floor(prod.rating) 
                                    ? 'fill-primary-gold text-primary-gold' 
                                    : 'text-luxury-gold/40'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-luxury-slate ml-1 font-sans">
                            ({prod.reviewsCount} reviews)
                          </span>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
