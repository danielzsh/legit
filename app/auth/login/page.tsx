"use client";
import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth"; // Use the function from lib
import { useRouter } from "next/navigation";

const LogInPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setError(null);
    
    try {
      await signInWithGoogle();
      router.push('/'); // Redirect after successful sign-in
    } catch {
      setIsSigningIn(false);
      setError("Google sign-in failed. Please try again.");
    }
  };

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
            className="w-36 bg-red-500 duration-300 text-white py-2 px-4 rounded hover:bg-red-400 focus:outline-none focus:shadow-outline"
          >
            {isSigningIn ? 'Logging in...' : 'With Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
