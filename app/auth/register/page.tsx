"use client";
import { useState } from "react";
import { signInWithGoogle } from "@/lib/auth"; // Google Sign-In function
import { useRouter } from "next/navigation";

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();

  // Handle Google sign-in
  const handleGoogleRegister = async () => {
    setIsSigningIn(true);
    setError(null);
    
    try {
      await signInWithGoogle();
      router.push('/'); // Redirect after successful registration
    } catch {
      setIsSigningIn(false);
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <div className="pt-40 flex items-center justify-center">
      <div className="bg-lime-100 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          Sign Up
        </h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}

        {/* Google Sign-In Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleGoogleRegister}
            disabled={isSigningIn}
            className="w-36 bg-red-500 text-white duration-300 py-2 px-4 rounded hover:bg-red-400 focus:outline-none focus:shadow-outline"
          >
            {isSigningIn ? 'Signing in...' : 'With Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
