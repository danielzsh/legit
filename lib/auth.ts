import { db, auth } from "@/lib/firebaseConfig"; // Your Firebase auth setup
import { GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const user = result.user;
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return { user };
  } else {
    throw new Error("Account not found. Please register first.");
  }
};

// Complete registration and save to Firestore
export const signUpWithGoogle = async (user: User, username: string) => {
  const userDocRef = doc(db, "users", user.uid);
  await setDoc(userDocRef, {
    email: user.email,
    username,
    createdAt: new Date(),
    words: [],
    texts: [],
    translations: [],
  });
};

export const checkUsernameExists = async (username: string): Promise<boolean> => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty; // If querySnapshot is not empty, the username already exists
};

export const checkUserExists = async (uid: string): Promise<boolean> => {
  const db = getFirestore(); // Initialize Firestore
  const userDoc = await getDoc(doc(db, "users", uid)); // Get the user document by uid
  return userDoc.exists(); // Return true if the user exists, false otherwise
};
