export interface Product {
  id: string;
  name: string;
  category: 'earrings' | 'necklaces' | 'bangles' | 'sets' | string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  materials: string[];
  dimensions: string;
  artisan: string;
  isTrending?: boolean;
  isBridal?: boolean;
  details: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  avatar?: string;
  date: string;
  productName?: string;
  verified: boolean;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  createdAt: any;
  phone?: string;
  address?: string;
}

export interface InquiryRecord {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  status: 'pending' | 'customizing' | 'approved' | 'completed';
  notes?: string;
  quantity: number;
  createdAt: any;
  updatedAt: any;
}

export interface WebsiteState {
  // Navigation & Category Filtering
  currentScreen: 'home' | 'collections' | 'account';
  setCurrentScreen: (screen: 'home' | 'collections' | 'account') => void;
  activeCategory: string; // 'all' | 'earrings' | 'necklaces' | 'bangles' | 'bridal'
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating';
  
  // User Authentication State
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  userInquiries: InquiryRecord[];
  setUserInquiries: (inquiries: InquiryRecord[]) => void;
  isAuthLoading: boolean;
  setAuthLoading: (isLoading: boolean) => void;
  syncWishlist: (productId: string, action: 'add' | 'remove') => Promise<void>;
  setWishlist: (wishlist: string[]) => void;
  
  // Interactive Overlays
  selectedProduct: Product | null;
  isWishlistOpen: boolean;
  
  // Wishlist State
  wishlist: string[]; // List of Product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // User Reviews State
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;
  
  // Newsletter Subscriptions
  subscribedEmails: string[];
  subscribeEmail: (email: string) => boolean; // returns true if newly subscribed
  
  // Custom Interaction: Interactive "Heritage Customization Decorator / Matching Assistant"
  virtualMainPiece: Product | null;
  virtualMatchingAccents: Product[];
  setVirtualMainPiece: (product: Product | null) => void;
  toggleVirtualMatchingAccent: (product: Product) => void;
  resetVirtualSalon: () => void;
}
