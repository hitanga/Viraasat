import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, getDoc, getDocFromServer, collection, getDocs, onSnapshot, deleteDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize the Firebase client application
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth();

// Conforming clean connection test on load as instructed
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or connection state.");
    }
  }
}
testConnection();

// Operation Types & Error Handling as mandated by Security skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Hardened Error Logged: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Interfaces aligned with blueprint
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

// User Profile Database APIs
export async function createUserDocument(uid: string, email: string, name: string): Promise<void> {
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    const userProfile: UserProfile = {
      uid,
      email,
      name,
      createdAt: serverTimestamp(),
    };
    await setDoc(userDocRef, userProfile);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    const snDoc = await getDoc(userDocRef);
    if (snDoc.exists()) {
      return snDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function updateUserProfile(uid: string, updates: Partial<Pick<UserProfile, 'name' | 'phone' | 'address'>>): Promise<void> {
  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    await updateDoc(userDocRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

// Inquiries / Request Quote Operations
export async function createInquiry(uid: string, inquiry: Omit<InquiryRecord, 'userId' | 'createdAt' | 'updatedAt' | 'status'>): Promise<void> {
  const path = `users/${uid}/inquiries/${inquiry.id}`;
  try {
    const inquiryRef = doc(db, 'users', uid, 'inquiries', inquiry.id);
    const completeInquiry: InquiryRecord = {
      ...inquiry,
      userId: uid,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(inquiryRef, completeInquiry);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function deleteInquiry(uid: string, inquiryId: string): Promise<void> {
  const path = `users/${uid}/inquiries/${inquiryId}`;
  try {
    const inquiryRef = doc(db, 'users', uid, 'inquiries', inquiryId);
    await deleteDoc(inquiryRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Cloud Wishlist Operations
export async function saveWishlistItem(uid: string, productId: string): Promise<void> {
  const path = `users/${uid}/wishlist/${productId}`;
  try {
    const itemRef = doc(db, 'users', uid, 'wishlist', productId);
    await setDoc(itemRef, {
      productId,
      addedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function removeWishlistItem(uid: string, productId: string): Promise<void> {
  const path = `users/${uid}/wishlist/${productId}`;
  try {
    const itemRef = doc(db, 'users', uid, 'wishlist', productId);
    await deleteDoc(itemRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function getCloudWishlist(uid: string): Promise<string[]> {
  const path = `users/${uid}/wishlist`;
  try {
    const wishCollRef = collection(db, 'users', uid, 'wishlist');
    const querySnapshot = await getDocs(wishCollRef);
    const items: string[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.productId) {
        items.push(data.productId);
      }
    });
    return items;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}
