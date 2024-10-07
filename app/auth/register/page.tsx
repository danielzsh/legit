"use client";
import { useState } from "react";
import { registerWithGoogle, signUpWithGoogle, checkUserExists, checkUsernameExists } from "@/lib/auth"; // Update your imports
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [username, setUsername] = useState<string>(""); // New field for username
  const [user, setUser] = useState<User | null>(null); // Allow both User and null
  const router = useRouter();

  // Handle Google sign-in
  const handleGoogleRegister = async () => {
    setIsSigningIn(true);
    setError(null);

    try {
      const { user } = await registerWithGoogle(); // Sign in with Google, which returns a user object

      const userExists = await checkUserExists(user.uid);

      if (userExists) {
        // If the user already exists, redirect them to login
        setError("You already have an account! Please log in.");
        router.push("/auth/login");
      } else {
        // If the user does not exist, allow them to complete registration
        setUser(user);
      }
    } catch (error) {
      setIsSigningIn(false);
      setError((error as Error).message);
      //setError("Google sign-in failed. Please try again.");
    }
  };

  // Handle final registration step (collect username)
  const handleSubmitUsername = async () => {
    if (username.trim() === "") {
      setError("Username cannot be empty.");
      return;
    }

    if (!user) {
      setError("User is not logged in. Please sign in again.");
      return;
    }

    const usernameExists = await checkUsernameExists(username);
    if (usernameExists) {
      setError("This username is already taken. Please choose another one.");
      return;
    }

    try {
      // Call signUpWithGoogle to save the user to Firestore with the username
      await signUpWithGoogle(user, username);
      router.push("/"); // Redirect after successful registration
    } catch {
      setError("Failed to save username. Please try again.");
    }
  };

  return (
    <div className="pt-40 flex items-center justify-center">
      <div className="bg-lime-100 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
          {user ? "Complete Registration" : "Sign Up"}
        </h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}

        {!user ? (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleGoogleRegister}
              disabled={isSigningIn}
              className="w-36 bg-lime-300 text-black duration-300 py-2 px-4 rounded hover:bg-lime-200 hover:border hover:border-lime-300 focus:outline-none focus:shadow-outline"
            >
              {isSigningIn ? "Signing in..." : "With Google"}
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm mb-2">
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-1 px-2 text-md w-full rounded-md"
            />
            <button
              onClick={handleSubmitUsername}
              className="mt-5 duration-300 bg-lime-300 text-black mt-4 py-2 px-4 rounded hover:bg-lime-200 focus:outline-none focus:shadow-outline"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
