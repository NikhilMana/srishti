import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Types
export interface SignRecord {
  userId: string;
  gesture: string;
  timestamp: Timestamp;
  location?: {
    latitude: number;
    longitude: number;
  };
  status: 'pending' | 'assigned' | 'completed';
  assignedVolunteerId?: string;
  notes?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  isAvailable: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Database functions
export const addSignRecord = async (signRecord: Omit<SignRecord, 'timestamp'>) => {
  try {
    const docRef = await addDoc(collection(db, 'signs'), {
      ...signRecord,
      timestamp: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding sign record:', error);
    throw error;
  }
};

export const getAvailableVolunteers = async () => {
  try {
    const q = query(
      collection(db, 'volunteers'),
      where('isAvailable', '==', true)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Volunteer[];
  } catch (error) {
    console.error('Error getting volunteers:', error);
    throw error;
  }
};

export const assignVolunteer = async (signId: string, volunteerId: string) => {
  try {
    const signRef = doc(db, 'signs', signId);
    await updateDoc(signRef, {
      assignedVolunteerId: volunteerId,
      status: 'assigned'
    });
  } catch (error) {
    console.error('Error assigning volunteer:', error);
    throw error;
  }
};

// Authentication functions
export const registerVolunteer = async (email: string, password: string, volunteerData: Omit<Volunteer, 'id'>) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const volunteerRef = doc(db, 'volunteers', userCredential.user.uid);
    await setDoc(volunteerRef, {
      ...volunteerData,
      isAvailable: true
    });
    return userCredential.user;
  } catch (error) {
    console.error('Error registering volunteer:', error);
    throw error;
  }
};

export const loginVolunteer = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutVolunteer = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export { auth, db }; 