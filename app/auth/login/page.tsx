"use client";
import { useEffect, useState } from "react";
import { signInWithGoogle,checkUserExists } from "@/lib/auth"; // Use the function from lib
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig"; // Firebase config
import Link from 'next/link';

const LogInPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
  
    try {
      const { user } = await signInWithGoogle();
      const userExists = await checkUserExists(user.uid);
      if (userExists) {
        router.push('/');
      } else {
        setError("User does not exist. Please register first.");
        setIsSigningIn(false);
        await signOut(auth);
      }
    } catch {
      setIsSigningIn(false);
      //setError("Google sign-in failed. Please try again.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userExists = await checkUserExists(user.uid);
        if (userExists) {
          router.push('/');
        } else {
          setError("User does not exist. Please register first.");
          setIsSigningIn(false);
          await signOut(auth);
        }
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="pt-40 flex items-center justify-center">
      <div className="bg-lime-100 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Log In
        </h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}

        {/* Google Sign-In Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            disabled={isSigningIn}
            className="w-36 bg-lime-300 duration-300 text-black py-2 px-4 rounded hover:bg-lime-200 focus:outline-none focus:shadow-outline"
          >
            {isSigningIn ? 'Logging in...' : 'With Google'}
          </button>
        </div>
        <p className="text-sm mt-5 text-gray-600 text-center">
          Need an account? <Link href="/auth/register" className="text-lime-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
