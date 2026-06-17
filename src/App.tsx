import { useEffect } from 'react';
import { useStore } from './store';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth, getUserProfile, getCloudWishlist, db } from './lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import ShopBySection from './components/ShopBySection';
import TrendingCollection from './components/TrendingCollection';
import WhyChooseUs from './components/WhyChooseUs';
import BridalShowcase from './components/BridalShowcase';
import VirtualSalon from './components/VirtualSalon';
import PatronReviews from './components/PatronReviews';
import InstaTimeline from './components/InstaTimeline';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import CollectionsPage from './components/CollectionsPage';
import AccountPage from './components/AccountPage';

export default function App() {
  const { currentScreen, setCurrentUser, setUserInquiries, setWishlist, setAuthLoading } = useStore();

  useEffect(() => {
    // Check if we are running in local-only mock user mode
    const customUserStr = localStorage.getItem('current_custom_user');
    if (customUserStr) {
      try {
        const customUser = JSON.parse(customUserStr);
        if (customUser.uid && customUser.uid.startsWith('usr_')) {
          setAuthLoading(true);
          setCurrentUser({
            uid: customUser.uid,
            email: customUser.email,
            name: customUser.name,
            createdAt: customUser.createdAt || new Date().toISOString()
          });
          const localInqs = localStorage.getItem('local_inquiries_' + customUser.uid);
          setUserInquiries(localInqs ? JSON.parse(localInqs) : []);
          setAuthLoading(false);
          return;
        }
      } catch (e) {
        console.error('Failed to parse custom local profile:', e);
      }
    }

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setAuthLoading(true);
      let unsubscribeInquiries: (() => void) | undefined;
      const customUserStr = localStorage.getItem('current_custom_user');

      if (user) {
        // If the user is anonymous, but they don't have custom credentials in localStorage, consider them logged out
        if (user.isAnonymous && !customUserStr) {
          setCurrentUser(null);
          setUserInquiries([]);
          setAuthLoading(false);
          return;
        }

        try {
          const profile = await getUserProfile(user.uid);
          let customUserParsed: any = null;
          if (customUserStr) {
            try {
              customUserParsed = JSON.parse(customUserStr);
            } catch (err) {}
          }

          if (profile) {
            setCurrentUser(profile);
          } else {
            setCurrentUser({
              uid: user.uid,
              email: user.email || (customUserParsed ? customUserParsed.email : ''),
              name: user.displayName || (customUserParsed ? customUserParsed.name : 'Viraasat Patron'),
              createdAt: new Date().toISOString()
            });
          }

          const cloudWish = await getCloudWishlist(user.uid);
          if (cloudWish) {
            setWishlist(cloudWish);
          }

          const inqRef = collection(db, 'users', user.uid, 'inquiries');
          unsubscribeInquiries = onSnapshot(inqRef, (snapshot) => {
            const inqList: any[] = [];
            snapshot.forEach((doc) => {
              inqList.push(doc.data());
            });
            inqList.sort((a, b) => {
              const dateA = a.createdAt?.seconds ? a.createdAt.seconds : 0;
              const dateB = b.createdAt?.seconds ? b.createdAt.seconds : 0;
              return dateB - dateA;
            });
            setUserInquiries(inqList);
          }, (error) => {
            console.error('Error streaming inquiries:', error);
          });
        } catch (e) {
          console.error('Error loading account database references:', e);
        } finally {
          setAuthLoading(false);
        }
      } else {
        // If there's an active credentials session inside local storage, satisfy it silently via anonymous flow
        if (customUserStr) {
          try {
            const customUser = JSON.parse(customUserStr);
            if (customUser.uid && !customUser.uid.startsWith('usr_')) {
              await signInAnonymously(auth);
              return;
            }
          } catch (reAuthErr) {
            console.warn('Silent anonymous authorization recovery failed:', reAuthErr);
          }
        }

        setCurrentUser(null);
        setUserInquiries([]);
        setAuthLoading(false);
      }

      return () => {
        if (unsubscribeInquiries) unsubscribeInquiries();
      };
    });

    return () => unsubscribeAuth();
  }, [setCurrentUser, setUserInquiries, setWishlist, setAuthLoading]);

  return (
    <div className="bg-gold-cream/40 min-h-screen text-luxury-dark font-sans selection:bg-luxury-gold/30 selection:text-gold-dark overflow-x-hidden antialiased">
      {/* Dynamic Header */}
      <Header />

      {/* Main Pages Content with Smooth Cascades */}
      <main className="relative">
        {currentScreen === 'home' ? (
          <>
            {/* Hero Section Banner */}
            <Hero />

            {/* Brand Promise Value Bar */}
            <TrustBar />

            {/* Dynamic Offset Categories */}
            <ShopBySection />

            {/* Interactive Masterpiece Product Grid & Classifications */}
            <TrendingCollection />

            {/* Asymmetrical Craftsmanship Highlights */}
            <WhyChooseUs />

            {/* Exquisite Bridal Wedding Edit block */}
            <BridalShowcase />

            {/* Interactive Try-On Virtual styling sandbox */}
            <VirtualSalon />

            {/* Scrolling voice reviews with posting inputs */}
            <PatronReviews />

            {/* Lookbook instagram image grids */}
            <InstaTimeline />

            {/* Member list subscription circles */}
            <Newsletter />
          </>
        ) : currentScreen === 'collections' ? (
          /* High-Fidelity Paginated Collections Page with native lazy loading */
          <CollectionsPage />
        ) : (
          /* Secure User Profile & Bespoke Orders Showcase */
          <AccountPage />
        )}
      </main>

      {/* Structured sitemaps & showroom contact info */}
      <Footer />

      {/* Overlays, Drawers & Details Panels */}
      <WishlistDrawer />
      <ProductDetailModal />
    </div>
  );
}
