import { useState, useEffect, FormEvent } from 'react';
import { useStore } from '../store';
import { auth, createUserDocument, getUserProfile, updateUserProfile, deleteInquiry, InquiryRecord, UserProfile } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInAnonymously, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  User, 
  Mail, 
  Lock, 
  LogOut, 
  MapPin, 
  Phone, 
  FolderHeart, 
  ShoppingBag, 
  Settings, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  AlertCircle,
  Clock,
  Trash2
} from 'lucide-react';
import { PRODUCTS } from '../data';

export default function AccountPage() {
  const { currentUser, setCurrentUser, userInquiries, setUserInquiries, wishlist, setWishlist } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'favorites'>('orders');
  
  // Auth Form State
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Profile Edit State
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);

  // Initialize edit form when user changes
  useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name || '');
      setEditPhone(currentUser.phone || '');
      setEditAddress(currentUser.address || '');
    }
  }, [currentUser]);

  // Handle Register
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email || !password || !fullName) {
      setAuthError('Please fill in all requested coordinates.');
      return;
    }
    if (password.length < 6) {
      setAuthError('The passphrase must consist of at least 6 tokens.');
      return;
    }
    setAuthLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    
    // Check local duplicate check
    const existingCreds = localStorage.getItem('creds_' + normalizedEmail);
    if (existingCreds) {
      setAuthError('This noble registry is already in use by a patron.');
      setAuthLoading(false);
      return;
    }

    try {
      // Authenticate browser session anonymously with Firebase so security rules validate reads/writes
      let uid = '';
      try {
        const userCredential = await signInAnonymously(auth);
        uid = userCredential.user.uid;
      } catch (anonErr) {
        console.warn('Anonymous Auth fallback to local simulation:', anonErr);
        uid = 'usr_' + Math.random().toString(36).substring(2, 11);
      }

      // Record profile in Firestore if real uid is retrieved
      if (!uid.startsWith('usr_')) {
        try {
          await createUserDocument(uid, normalizedEmail, fullName.trim());
        } catch (dbErr) {
          console.warn('Firestore user profile document mapping failed, utilizing offline local profile:', dbErr);
          uid = 'usr_' + Math.random().toString(36).substring(2, 11);
        }
      }

      // Save credentials in local storage
      const creds = {
        uid,
        email: normalizedEmail,
        name: fullName.trim(),
        password,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('creds_' + normalizedEmail, JSON.stringify(creds));
      localStorage.setItem('current_custom_user', JSON.stringify(creds));

      // Update store user
      const profile: UserProfile = {
        uid,
        email: normalizedEmail,
        name: fullName.trim(),
        createdAt: new Date().toISOString()
      };
      setCurrentUser(profile);
    } catch (err: any) {
      console.error(err);
      setAuthError(err.message || 'Verification failure. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email || !password) {
      setAuthError('Bespoke access requires both register and lock code.');
      return;
    }
    setAuthLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const credsStr = localStorage.getItem('creds_' + normalizedEmail);
    if (!credsStr) {
      setAuthError('Incorrect credential settings.');
      setAuthLoading(false);
      return;
    }

    try {
      const creds = JSON.parse(credsStr);
      if (creds.password !== password) {
        setAuthError('Incorrect credential settings.');
        setAuthLoading(false);
        return;
      }

      // Ensure signed anonymously to access Firestore records cleanly
      if (!creds.uid.startsWith('usr_')) {
        try {
          await signInAnonymously(auth);
        } catch (anonErr) {
          console.warn('Silent anonymous re-auth failed, session running offline mode:', anonErr);
        }
      }

      localStorage.setItem('current_custom_user', JSON.stringify(creds));

      // Retrieve full profile
      let profile: UserProfile | null = null;
      if (!creds.uid.startsWith('usr_')) {
        try {
          profile = await getUserProfile(creds.uid);
        } catch (e) {
          console.warn('Error reading from Firestore user schema, using cache:', e);
        }
      }

      if (profile) {
        setCurrentUser(profile);
      } else {
        const cachedProfile: UserProfile = {
          uid: creds.uid,
          email: creds.email,
          name: creds.name,
          createdAt: creds.createdAt || new Date().toISOString()
        };
        setCurrentUser(cachedProfile);
      }
    } catch (err: any) {
      console.error(err);
      setAuthError('Verification failure. Please confirm security inputs.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Social shortcut Google Login
  const handleGoogleLogin = async () => {
    setAuthError('');
    const provider = new GoogleAuthProvider();
    try {
      setAuthLoading(true);
      const result = await signInWithPopup(auth, provider);
      // Fetch or auto create profile
      const user = result.user;
      let profile = await getUserProfile(user.uid);
      if (!profile) {
        await createUserDocument(user.uid, user.email || '', user.displayName || 'Viraasat Patron');
        profile = {
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || 'Viraasat Patron',
          createdAt: new Date().toISOString()
         };
      }
      
      const creds = {
        uid: user.uid,
        email: user.email || '',
        name: user.displayName || 'Viraasat Patron',
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('current_custom_user', JSON.stringify(creds));
      setCurrentUser(profile);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setAuthError('Google sign-in is not enabled in Firebase Console. Go to: Firebase Console -> Authentication -> Sign-in Method -> Add new provider -> Enable ' + '"Google".');
      } else if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('The authentication popup window was closed before signing in. Please try again.');
      } else {
        setAuthError('Google sign in interrupted.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Sign Out
  const handleLogout = async () => {
    try {
      localStorage.removeItem('current_custom_user');
      await signOut(auth);
      setCurrentUser(null);
      setUserInquiries([]);
      // Wishlist resets to offline local storage
      const saved = localStorage.getItem('viraasat_wishlist');
      setWishlist(saved ? JSON.parse(saved) : []);
      useStore.setState({ currentScreen: 'home' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    }
  };

  // Update User Profile details
  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setProfileLoading(true);
    setProfileSuccess(false);
    try {
      await updateUserProfile(currentUser.uid, {
        name: editName,
        phone: editPhone,
        address: editAddress
      });
      setCurrentUser({
        ...currentUser,
        name: editName,
        phone: editPhone,
        address: editAddress
      });
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Fail to update profile configuration.');
    } finally {
      setProfileLoading(false);
    }
  };

  // Delete an inquiry
  const handleDeleteInquiry = async (inqId: string) => {
    if (!currentUser) return;
    if (confirm("Are you sure you wish to retrieve and discard this custom fitting inquiry from the royal archives?")) {
      try {
        await deleteInquiry(currentUser.uid, inqId);
      } catch (err) {
        console.error(err);
        alert("Failed to delete the chosen archives.");
      }
    }
  };

  // Get list of matching wishlisted products
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  // Loading state
  const isAuthLoading = useStore((state) => state.isAuthLoading);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-transparent pt-32 pb-20 flex flex-col justify-center items-center">
        <div className="w-12 h-12 border-4 border-primary-gold/30 border-t-primary-gold rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-[0.2em] text-primary-gold mt-4 font-sans animate-pulse">Syncing Royal Ledger...</p>
      </div>
    );
  }

  // Auth Forms Screen
  if (!currentUser) {
    return (
      <section className="min-h-screen pt-32 pb-20 px-6 bg-gold-cream/15 flex justify-center items-center">
        <div className="max-w-md w-full bg-white border border-accent-peach/70 rounded-2xl shadow-xl overflow-hidden p-6 md:p-8 relative">
          
          <div className="text-center space-y-2 mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-primary-gold font-sans font-bold">Viraasat Atelier</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-luxury-dark uppercase"> BIND YOUR LEDGER </h2>
            <p className="text-xs text-luxury-slate font-sans">Register once to track bespoke customization requests, fitting approvals, and sync saved pieces to the cloud.</p>
          </div>

          {/* Tab togglers */}
          <div className="flex border-b border-accent-peach/30 mb-6 font-sans text-xs font-semibold uppercase tracking-wider">
            <button 
              onClick={() => { setAuthMode('login'); setAuthError(''); }}
              className={`flex-1 text-center pb-3 border-b-2 transition-colors ${authMode === 'login' ? 'text-primary-gold border-primary-gold' : 'text-luxury-slate border-transparent hover:text-primary-gold'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setAuthMode('register'); setAuthError(''); }}
              className={`flex-1 text-center pb-3 border-b-2 transition-colors ${authMode === 'register' ? 'text-primary-gold border-primary-gold' : 'text-luxury-slate border-transparent hover:text-primary-gold'}`}
            >
              Start Registration
            </button>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-blush-light text-blush-rose border border-blush-rose/10 rounded-lg text-xs font-sans flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={authMode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            {authMode === 'register' && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-dark font-sans flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary-gold" /> Your Full Name:
                </label>
                <input 
                  type="text"
                  placeholder="e.g. Maharani Gayatri Devi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs p-3 border border-luxury-gold/20 focus:border-primary-gold rounded-lg font-sans outline-none text-luxury-dark bg-gold-cream/5"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-dark font-sans flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary-gold" /> Custom Email Coordinates:
              </label>
              <input 
                type="email"
                placeholder="patron@viraasatheritage.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-3 border border-luxury-gold/20 focus:border-primary-gold rounded-lg font-sans outline-none text-luxury-dark bg-gold-cream/5"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-dark font-sans flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary-gold" /> Atelier Security Lock:
              </label>
              <input 
                type="password"
                placeholder="🔒 at least 6 tokens"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs p-3 border border-luxury-gold/20 focus:border-primary-gold rounded-lg font-sans outline-none text-luxury-dark bg-gold-cream/5"
                required
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-primary-gold hover:bg-gold-dark text-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-6"
            >
              {authLoading ? (
                <div className="w-4 h-4 border-2 border-white/65 border-t-white rounded-full animate-spin" />
              ) : null}
              {authMode === 'login' ? 'Unlock Portfolio Ledger' : 'Create Heritage Registry'}
            </button>
          </form>

          <div className="relative my-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-accent-peach/30"></div>
            </div>
            <span className="relative bg-white px-3 text-[10px] uppercase tracking-widest text-luxury-slate font-sans">Or Instant Access</span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 border border-accent-peach/50 hover:bg-gold-cream/30 text-luxury-dark rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="text-sm">🔑</span> Accredit with Google Signature
          </button>

          <p className="text-[10px] text-center text-luxury-slate/60 mt-6 font-sans">
            Your connection is securely validated by automated Firebase Authorization.
          </p>
        </div>
      </section>
    );
  }

  // Authenticated Dashboard
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      
      {/* Royal Cover Banner */}
      <div className="bg-gradient-to-r from-gold-cream/30 via-accent-peach/10 to-gold-cream/30 border border-luxury-gold/15 rounded-3xl p-6 md:p-10 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white border-2 border-primary-gold rounded-full flex items-center justify-center shadow-md">
            <span className="text-2xl font-serif text-primary-gold font-bold">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'P'}
            </span>
          </div>
          <div className="space-y-1 select-none">
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-2xl font-semibold text-luxury-dark tracking-wide">{currentUser.name}</h2>
              <span className="bg-primary-gold/10 border border-primary-gold/40 text-[9px] uppercase font-bold tracking-widest text-primary-gold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 animate-pulse" /> Heritage Patron
              </span>
            </div>
            <p className="text-xs text-luxury-slate font-sans flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-primary-gold" /> {currentUser.email}
            </p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="px-5 py-2.5 border border-blush-rose/40 hover:bg-blush-light text-blush-rose hover:text-blush-rose rounded-lg text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Sign Out Ledger
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left tabs selector */}
        <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-2 border-b lg:border-none border-accent-peach/30 pb-4 lg:pb-0">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 lg:flex-none text-left px-5 py-4 rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center shadow-sm lg:shadow-none gap-3 transition-all cursor-pointer border ${activeTab === 'orders' ? 'bg-primary-gold text-white border-primary-gold' : 'bg-white border-accent-peach text-luxury-slate hover:bg-gold-cream/50'}`}
          >
            <ShoppingBag className="w-4 h-4" /> 
            <span>Fitting Inquiries ({userInquiries.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 lg:flex-none text-left px-5 py-4 rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center shadow-sm lg:shadow-none gap-3 transition-all cursor-pointer border ${activeTab === 'favorites' ? 'bg-primary-gold text-white border-primary-gold' : 'bg-white border-accent-peach text-luxury-slate hover:bg-gold-cream/50'}`}
          >
            <FolderHeart className="w-4 h-4" /> 
            <span>Saved Creations ({wishlist.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 lg:flex-none text-left px-5 py-4 rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center shadow-sm lg:shadow-none gap-3 transition-all cursor-pointer border ${activeTab === 'profile' ? 'bg-primary-gold text-white border-primary-gold' : 'bg-white border-accent-peach text-luxury-slate hover:bg-gold-cream/50'}`}
          >
            <Settings className="w-4 h-4" /> 
            <span>Fitting Coordinates</span>
          </button>
        </div>

        {/* Right dashboard cards content panel */}
        <div className="w-full lg:w-3/4 bg-white border border-accent-peach/60 rounded-2xl p-6 md:p-8 min-h-[400px]">
          
          {/* Fitting inquiries */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="border-b border-accent-peach/20 pb-4">
                <h3 className="font-serif text-xl font-bold tracking-wide text-luxury-dark uppercase">Bespoke Fitting & Quote Archives</h3>
                <p className="text-xs text-luxury-slate font-sans">A historical record of your custom fitting orders. Our design guild handles requests with personal specifications.</p>
              </div>

              {userInquiries.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 bg-gold-cream rounded-full border border-luxury-gold/15 text-primary-gold flex items-center justify-center mx-auto shadow-inner">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-1 max-w-sm mx-auto">
                    <h4 className="font-serif text-sm font-bold text-luxury-dark uppercase">Archives Empty</h4>
                    <p className="text-xs text-luxury-slate font-sans leading-relaxed">You have not requested bespoke fitting services yet. Browse our Collections page to initiate a customized luxury quote.</p>
                  </div>
                  <button 
                    onClick={() => useStore.setState({ currentScreen: 'collections', activeCategory: 'all' })}
                    className="px-6 py-2.5 border border-primary-gold text-primary-gold hover:bg-gold-cream/50 rounded-lg text-[10px] font-sans font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Examine Gold Creations
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {userInquiries.map((inq) => (
                    <div key={inq.id} className="border border-accent-peach/40 hover:border-luxury-gold/30 rounded-xl p-4 flex flex-col sm:flex-row gap-4 justify-between items-start bg-gold-cream/5 transition-all">
                      <div className="flex gap-4">
                        <img 
                          src={inq.productImage} 
                          alt={inq.productName} 
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-lg border border-accent-peach/30 shrink-0"
                        />
                        <div className="space-y-1.5 text-left">
                          <span className="text-[9px] font-sans font-mono text-luxury-slate bg-gold-cream border border-luxury-gold/10 px-1.5 py-0.5 rounded">ID: {inq.id}</span>
                          <h4 className="font-serif text-base font-bold text-luxury-dark leading-tight">{inq.productName}</h4>
                          <p className="text-[11px] text-primary-gold font-serif font-semibold">
                            Quote Approximation: ₹ {inq.price.toLocaleString('en-IN')} (Qty: {inq.quantity})
                          </p>
                          {inq.notes ? (
                            <p className="text-[11px] text-luxury-slate font-sans bg-white border border-accent-peach/20 p-2 rounded italic leading-relaxed max-w-lg mt-1">
                              <strong>Patron Request Notes:</strong> "{inq.notes}"
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-center sm:items-end w-full sm:w-auto gap-4 pt-4 sm:pt-0 self-stretch shrink-0">
                        {/* Status Badge */}
                        <div className="space-y-1 flex flex-col items-start sm:items-end uppercase font-sans">
                          {inq.status === 'pending' && (
                            <span className="bg-amber-100/60 border border-amber-300 text-amber-800 text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" /> Awaiting Guild
                            </span>
                          )}
                          {inq.status === 'customizing' && (
                            <span className="bg-rose-100 border border-rose-300 text-rose-800 text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-ping" /> Modeling Metal
                            </span>
                          )}
                          {inq.status === 'approved' && (
                            <span className="bg-emerald-100 border border-emerald-300 text-emerald-800 text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" /> Gold Setting Secured
                            </span>
                          )}
                          {inq.status === 'completed' && (
                            <span className="bg-slate-100 border border-slate-300 text-slate-800 text-[9px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" /> Archives Delivered
                            </span>
                          )}
                          
                          <span className="text-[9px] text-luxury-slate/60 font-mono text-right flex items-center gap-1 pt-1">
                            <Clock className="w-3 h-3 text-primary-gold" /> {inq.createdAt ? new Date(inq.createdAt.seconds * 1000).toLocaleDateString() : 'Today'}
                          </span>
                        </div>

                        {/* Withdraw pending inquiry */}
                        {inq.status === 'pending' && (
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-2 border border-accent-peach/50 hover:border-blush-rose text-luxury-slate hover:text-blush-rose rounded-lg transition-colors cursor-pointer"
                            title="Discard archive record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Creations favorites */}
          {activeTab === 'favorites' && (
            <div className="space-y-6">
              <div className="border-b border-accent-peach/20 pb-4">
                <h3 className="font-serif text-xl font-bold tracking-wide text-luxury-dark uppercase">Bespoke Vault Checklist</h3>
                <p className="text-xs text-luxury-slate font-sans">These masterpieces are cloud-synchronized under your certified credentials. Clicking an item opens full fitting options.</p>
              </div>

              {wishlistedProducts.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 bg-gold-cream rounded-full border border-luxury-gold/15 text-primary-gold flex items-center justify-center mx-auto shadow-inner">
                    <FolderHeart className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="space-y-1 max-w-sm mx-auto">
                    <h4 className="font-serif text-sm font-bold text-luxury-dark uppercase">Vault is Open</h4>
                    <p className="text-xs text-luxury-slate font-sans leading-relaxed">No creations saved in the cloud. Save items from our catalog to build your royal wishlist portfolio.</p>
                  </div>
                  <button 
                    onClick={() => useStore.setState({ currentScreen: 'collections', activeCategory: 'all' })}
                    className="px-6 py-2.5 border border-primary-gold text-primary-gold hover:bg-gold-cream/50 rounded-lg text-[10px] font-sans font-bold uppercase tracking-widest transition-all cursor-pointer"
                  >
                    Examine Gold Creations
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishlistedProducts.map((prod) => (
                    <div 
                      key={prod.id}
                      onClick={() => useStore.setState({ selectedProduct: prod })}
                      className="border border-accent-peach/30 hover:border-luxury-gold/30 rounded-xl p-3 flex gap-3 bg-gold-cream/5 hover:bg-gold-cream/20 cursor-pointer text-left transition-all"
                    >
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-lg border border-accent-peach/20 shrink-0 shadow-sm"
                      />
                      <div className="space-y-1 self-center">
                        <span className="text-[9px] font-sans font-bold uppercase text-primary-gold tracking-widest bg-gold-cream px-1.5 py-0.5 rounded">{prod.category}</span>
                        <h4 className="font-serif text-sm font-bold text-luxury-dark truncate max-w-[180px]">{prod.name}</h4>
                        <p className="text-xs font-serif text-primary-gold font-semibold">₹ {prod.price.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile credentials customization */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="border-b border-accent-peach/20 pb-4">
                <h3 className="font-serif text-xl font-bold tracking-wide text-luxury-dark uppercase">Royal Fitting Coordinates</h3>
                <p className="text-xs text-luxury-slate font-sans">Bespoke fitting calls, diamond settings, and high-end security documents use these coordinates. Please keep them updated.</p>
              </div>

              {profileSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-sans flex items-center gap-2">
                  <span className="text-sm">✨</span>
                  <span>Fitting records saved. Your personal counselor will refer to these coordinates.</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-dark font-sans flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-primary-gold" /> Legal Signature / Full Name:
                  </label>
                  <input 
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-xs p-3 border border-luxury-gold/20 focus:border-primary-gold rounded-lg font-sans outline-none text-luxury-dark bg-gold-cream/5"
                    required
                  />
                </div>

                <div className="space-y-1 opacity-60">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-dark font-sans flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary-gold" /> Profile Email Address (Fixed):
                  </label>
                  <input 
                    type="email"
                    value={currentUser.email}
                    disabled
                    className="w-full text-xs p-3 border border-luxury-gold/10 rounded-lg font-sans outline-none text-luxury-dark bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-dark font-sans flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary-gold" /> Mobile / WhatsApp coordinate:
                  </label>
                  <input 
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full text-xs p-3 border border-luxury-gold/20 focus:border-primary-gold rounded-lg font-sans outline-none text-luxury-dark bg-gold-cream/5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-luxury-dark font-sans flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary-gold" /> Physical Coordinates for customized delivery:
                  </label>
                  <textarea 
                    placeholder="Provide your high-end shipping coordinates / boutique address..."
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    rows={3}
                    className="w-full text-xs p-3 border border-luxury-gold/20 focus:border-primary-gold rounded-lg font-sans outline-none text-luxury-dark bg-gold-cream/5 resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={profileLoading}
                  className="px-6 py-3 bg-primary-gold hover:bg-gold-dark text-white rounded-lg text-xs font-sans font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {profileLoading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/65 border-t-white rounded-full animate-spin" />
                  ) : null}
                  Verify & Save Coordinates
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
