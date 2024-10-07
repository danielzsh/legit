import { db, auth } from "@/lib/firebaseConfig"; // Your Firebase auth setup
import { GoogleAuthProvider, User, signOut, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if the user's Firestore document exists
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      console.log("User exists in Firestore");
      return { user };
    } else {
      console.log("User does not exist in Firestore. Signing out.");
      await signOut(auth);
      throw new Error("Account not found in Firestore. Please register first.");
    }
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    throw error; // Re-throw the error to handle it in your UI
  }
};

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

export const registerWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Check if the user's Firestore document exists
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.log("User doesn't exist in Firestore");
      return { user };
    } else {
      console.log("User exists already, log in.");
      await signOut(auth);
      throw new Error("User exists already, please log in");
    }
  } catch (error) {
    console.error("Error during Google Sign-In:", error);
    throw error;
  }
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
