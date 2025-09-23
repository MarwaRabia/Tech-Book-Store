// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey: "AIzaSyDoVcxSKKRvK8hdD-9jgyB30_mUWwGa1qw",
  authDomain: "tech-book-store-db.firebaseapp.com",
  projectId: "tech-book-store-db",
  storageBucket: "tech-book-store-db.firebasestorage.app",
  messagingSenderId: "1091202444938",
  appId: "1:1091202444938:web:6d16bb6b3619d47f298773",
};

// Initialize Firebase app
const firebaseWebApp = initializeApp(firebaseConfig);

// Initialize Auth with app
export const auth = getAuth(firebaseWebApp);

// Google provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Sign in function
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...additionalInfo,
      });
    } catch (error) {
      toast.error("error creating the user", error.message);
    }
  }
  return userDocRef;
};
