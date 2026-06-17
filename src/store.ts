import { create } from 'zustand';
import { WebsiteState, Product, Review } from './types';
import { PRODUCTS, INITIAL_REVIEWS } from './data';

export const useStore = create<WebsiteState>((set, get) => ({
  // Navigation & Category Filtering
  currentScreen: 'home',
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  
  // User Authentication State
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  userInquiries: [],
  setUserInquiries: (inquiries) => set({ userInquiries: inquiries }),
  isAuthLoading: true,
  setAuthLoading: (isLoading) => set({ isAuthLoading: isLoading }),
  setWishlist: (wishlist) => set({ wishlist }),
  syncWishlist: async (productId, action) => {
    const user = get().currentUser;
    if (!user || user.uid.startsWith('usr_')) return;
    try {
      const { saveWishlistItem, removeWishlistItem } = await import('./lib/firebase');
      if (action === 'add') {
        await saveWishlistItem(user.uid, productId);
      } else {
        await removeWishlistItem(user.uid, productId);
      }
    } catch (e) {
      console.error('Failed to sync wishlist to cloud:', e);
    }
  },

  // Interactive Overlays
  selectedProduct: null,
  isWishlistOpen: false,
  
  // Wishlist state initialized from localStorage
  wishlist: (() => {
    try {
      const saved = localStorage.getItem('viraasat_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })(),
  
  toggleWishlist: (productId: string) => {
    set((state) => {
      const isExist = state.wishlist.includes(productId);
      const newWishlist = isExist
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId];
        
      try {
        localStorage.setItem('viraasat_wishlist', JSON.stringify(newWishlist));
      } catch (e) {
        console.error('LocalStorage write failed', e);
      }

      if (state.currentUser) {
        get().syncWishlist(productId, isExist ? 'remove' : 'add');
      }

      return { wishlist: newWishlist };
    });
  },
  
  isInWishlist: (productId: string) => {
    return get().wishlist.includes(productId);
  },
  
  // User Reviews State initialized with mock static ones + dynamic storage
  reviews: (() => {
    try {
      const saved = localStorage.getItem('viraasat_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  })(),
  
  addReview: (newReview) => {
    set((state) => {
      const completeReview: Review = {
        ...newReview,
        id: `review-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        verified: true,
        avatar: newReview.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newReview.author)}`
      };
      const updated = [completeReview, ...state.reviews];
      try {
        localStorage.setItem('viraasat_reviews', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return { reviews: updated };
    });
  },
  
  // Newsletter Subscriptions
  subscribedEmails: (() => {
    try {
      const saved = localStorage.getItem('viraasat_subscribers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })(),
  
  subscribeEmail: (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return false;
    
    const current = get().subscribedEmails;
    if (current.includes(cleanEmail)) {
      return false;
    }
    
    const updated = [...current, cleanEmail];
    try {
      localStorage.setItem('viraasat_subscribers', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    set({ subscribedEmails: updated });
    return true;
  },
  
  // Virtual Heritage Styling Assistant (The Salon helper)
  virtualMainPiece: null,
  virtualMatchingAccents: [],
  
  setVirtualMainPiece: (product) => {
    set({ 
      virtualMainPiece: product,
      // Clear matching accents that are the same as main piece
      virtualMatchingAccents: []
    });
  },
  
  toggleVirtualMatchingAccent: (product) => {
    set((state) => {
      const exists = state.virtualMatchingAccents.some((p) => p.id === product.id);
      const updated = exists 
        ? state.virtualMatchingAccents.filter((p) => p.id !== product.id)
        : [...state.virtualMatchingAccents, product];
      return { virtualMatchingAccents: updated };
    });
  },
  
  resetVirtualSalon: () => {
    set({
      virtualMainPiece: null,
      virtualMatchingAccents: []
    });
  }
}));
