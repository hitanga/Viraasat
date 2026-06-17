import React, { useState, useMemo } from 'react';
import { useStore } from '../store';
import { PRODUCTS } from '../data';
import { Product } from '../types';
import { Heart, Star, Sparkles, SlidersHorizontal, Eye, ArrowLeft, Search, Check, Grid3X3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CollectionsPage() {
  const { 
    activeCategory, 
    searchQuery, 
    sortBy, 
    toggleWishlist, 
    isInWishlist,
    setCurrentScreen
  } = useStore();

  // Show 16 products initially, and increase by 8 on click
  const [visibleCount, setVisibleCount] = useState(16);

  const categories = [
    { id: 'all', label: 'All Creations (130+)' },
    { id: 'earrings', label: 'Royal Earrings' },
    { id: 'necklaces', label: 'Collar Necklaces & Haars' },
    { id: 'bangles', label: 'Kadas & Filigree Bangles' },
    { id: 'bridal', label: 'Exquisite Bridal Elite' },
  ];

  const handleProductSelect = (product: Product) => {
    useStore.setState({ selectedProduct: product });
  };

  // Filter and sort products
  const processedProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((prod) => {
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
    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // Featured/Best-seller default logic (using ratings and review count weight)
      return b.reviewsCount * b.rating - a.reviewsCount * a.rating;
    });
  }, [activeCategory, searchQuery, sortBy]);

  // Click handler to load 8 more products
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleCategorySelect = (catId: string) => {
    useStore.setState({ activeCategory: catId });
    setVisibleCount(16); // Reset pagination on category change for optimal speed
  };

  // Safe subset for current pagination
  const pagedProducts = useMemo(() => {
    return processedProducts.slice(0, visibleCount);
  }, [processedProducts, visibleCount]);

  return (
    <div className="bg-surface-container-lowest min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <button 
            onClick={() => {
              setCurrentScreen('home');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
            className="group flex items-center gap-2 text-primary-gold hover:text-gold-dark text-xs font-sans font-bold uppercase tracking-wider transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home Gallery
          </button>
        </div>

        {/* Hero Title and Description block */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1 text-primary-gold text-xs font-bold uppercase tracking-[0.25em] bg-gold-cream/40 px-4 py-1.5 rounded-full border border-luxury-gold/15">
            <Sparkles className="w-3.5 h-3.5" /> Full Gilded Heritage Catalog
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-semibold text-luxury-dark tracking-tight">
            Heritage Collections
          </h1>
          <p className="text-luxury-slate text-sm md:text-base max-w-2xl mx-auto font-sans">
            Bespoke elegance crafted by legacy generational artisans. Browse our expansive collection of {PRODUCTS.length} masterpiece creations.
          </p>
        </div>

        {/* Sorters, Search Input & Pill filters panel */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-accent-peach/30 mb-10 space-y-6">
          
          {/* Active Search & Sort info */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Category pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`px-4 py-2.5 rounded-full font-sans text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat.id 
                      ? 'bg-primary-gold text-white shadow-md' 
                      : 'bg-gold-cream/40 text-luxury-slate border border-luxury-gold/10 hover:border-primary-gold/40 hover:bg-gold-cream'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sporter and result statistic */}
            <div className="flex flex-wrap items-center justify-between w-full md:w-auto gap-4">
              <span className="text-xs font-sans text-luxury-slate">
                Showing <strong className="text-luxury-dark">{pagedProducts.length}</strong> of <strong className="text-luxury-dark">{processedProducts.length}</strong> creations
              </span>

              <div className="flex items-center gap-2 bg-gold-cream/20 border border-luxury-gold/15 px-3 py-2 rounded-lg">
                <SlidersHorizontal className="w-3.5 h-3.5 text-primary-gold" />
                <select
                  value={sortBy}
                  onChange={(e) => useStore.setState({ sortBy: e.target.value as any })}
                  className="bg-transparent border-none text-xs font-sans font-bold text-luxury-dark outline-none cursor-pointer pr-3"
                >
                  <option value="featured">Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Reviews Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Connected inline search tool */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-gold w-4.5 h-4.5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                useStore.setState({ searchQuery: e.target.value });
                setVisibleCount(16); // Reset pagination count for organic filtering updates
              }}
              placeholder="Search or highlight by metals, stones, royal artisans (e.g. 'Jaipur', 'Emerald', 'Polki', 'Rani')..."
              className="w-full bg-gold-cream/20 border border-luxury-gold/15 focus:border-primary-gold text-luxury-dark text-sm placeholder-luxury-slate/60 px-12 py-3.5 rounded-xl outline-none font-sans transition-all focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => useStore.setState({ searchQuery: '' })}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-slate hover:text-luxury-dark text-xs font-sans underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Catalog list grid displaying paginated items */}
        {processedProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-white rounded-2xl border border-accent-peach/20">
            <div className="w-12 h-12 bg-gold-cream rounded-full flex items-center justify-center mx-auto text-primary-gold mb-2">
              <Grid3X3 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-luxury-dark">Bespoke Jewelry Not Found</h3>
            <p className="text-luxury-slate text-sm max-w-md mx-auto font-sans leading-relaxed">
              We couldn't locate any matching creations matching "{searchQuery}". Try selecting another category tab or using simpler search filters.
            </p>
            <button
              onClick={() => {
                useStore.setState({ searchQuery: '', activeCategory: 'all' });
                setVisibleCount(16);
              }}
              className="px-6 py-3 bg-primary-gold text-white text-xs uppercase font-bold tracking-wider rounded-lg hover:bg-gold-dark transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {pagedProducts.map((prod, idx) => {
                  const isFavorite = isInWishlist(prod.id);
                  return (
                    <motion.div 
                      key={prod.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: Math.min(idx * 0.02, 0.2) }}
                      className="group flex flex-col justify-between h-full text-left"
                    >
                      <div className="relative bg-gold-cream/40 rounded-2xl overflow-hidden aspect-[4/5] shadow-sm border border-accent-peach/20 mb-4 group-hover:shadow-md transition-shadow">
                        {prod.isBridal && (
                          <span className="absolute top-4 left-4 bg-blush-rose text-white text-[10px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm z-10 flex items-center gap-1">
                            Bridal
                          </span>
                        )}
                        
                        {/* High Quality Lazy Loaded Image with Referrer Policy and loading="lazy" */}
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Top corner Favorite heart button */}
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

                        {/* Slide-Up spec view trigger */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
                          <button 
                            onClick={() => handleProductSelect(prod)}
                            className="w-full bg-white/95 text-luxury-dark py-3.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider hover:bg-primary-gold hover:text-white transition-all shadow-lg flex items-center justify-center gap-1.5 focus:outline-none cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" /> Quick View Spec
                          </button>
                        </div>
                      </div>

                      {/* Product Specifications Summary */}
                      <div className="space-y-1 mt-1 flex-grow flex flex-col justify-between">
                        <div>
                          <button
                            onClick={() => handleProductSelect(prod)}
                            className="font-sans font-bold text-sm text-luxury-dark hover:text-primary-gold transition-colors text-left line-clamp-2"
                          >
                            {prod.name}
                          </button>

                          <p className="text-[10px] text-luxury-slate tracking-widest uppercase font-sans mt-0.5">
                            {prod.category} • {prod.artisan.split(',')[0]}
                          </p>
                        </div>

                        {/* Pricing details and review summary */}
                        <div className="pt-2">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-lg font-bold text-primary-gold">
                              ₹ {prod.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-luxury-slate/50 line-through text-xs font-sans">
                              ₹ {prod.originalPrice.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 mt-1 text-primary-gold">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${
                                    i < Math.floor(prod.rating) 
                                      ? 'fill-primary-gold text-primary-gold' 
                                      : 'text-luxury-gold/30'
                                  }`} 
                                />
                              ))}
                            </div>
                            <span className="text-[10px] text-luxury-slate ml-1 font-sans">
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

            {/* Load More Button - Loaded dynamically 8 by 8 */}
            {visibleCount < processedProducts.length && (
              <div className="text-center pt-8">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 bg-white border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-white px-10 py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-all active:scale-95 shadow-sm"
                >
                  Show More Creations
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
