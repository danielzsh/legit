import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig"; // Ensure firebaseConfig is correctly set up

// A function to handle Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw error;
  }
};
