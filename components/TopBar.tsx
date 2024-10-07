"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig"; // Import your Firebase config

const TopBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is logged in
      } else {
        setUser(null); // No user is logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state after logging out
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  return (
    <div className="relative flex pt-7 justify-between items-center pr-7">
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-5">
        <input
          type="text"
          placeholder="Search for texts..."
          className="p-2 pl-4 border border-gray-300 rounded-lg w-96 focus:outline-none"
        />
        <button className="text-gray-800 py-2 px-3 rounded bg-green-200 duration-300 hover:opacity-70">
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
        </button>
      </div>

      <div className="flex space-x-6 items-center ml-auto">
        {user ? (
          <>
            <Link href="/profile">
              <FontAwesomeIcon icon={faUser} className="text-2xl duration-300 hover:opacity-70 text-gray-800" />
            </Link>
            <Link href="/settings">
              <FontAwesomeIcon icon={faCog} className="text-2xl duration-300 hover:opacity-70 text-gray-800" />
            </Link>
            <button
              onClick={handleSignOut}
              className="bg-lime-300 duration-300 text-gray-800 px-4 py-2 rounded hover:bg-lime-400 focus:outline-none"
            >
              Log out
            </button>
          </>
        ) : (
          // User is not logged in, show Log in button
          <>
            <Link href="/auth/login">
              <button className="text-gray-800 py-2 px-4 rounded bg-lime-50 border border-lime-500 text-gray-800 duration-300 hover:bg-lime-100 hover:text-gray-900">
                Log in
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="text-gray-800 py-2 px-4 rounded bg-lime-500 text-white duration-300 hover:opacity-80">
                Register
              </button>
            </Link>

          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
/*import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

const TopBar: React.FC = () => {
  return (
    <div className="relative flex pt-7 justify-between items-center pr-7">
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-5">
        <input
          type="text"
          placeholder="Search for texts..."
          className="p-2 pl-4 border border-gray-300 rounded-lg w-96 focus:outline-none"
        />
        <button className="text-gray-800 py-2 px-3 rounded bg-green-200 duration-300 hover:opacity-70">
          <FontAwesomeIcon icon={faPlus} className="text-xl" />
        </button>
      </div>

      <div className="flex space-x-6 ml-auto">
        <Link href="/profile">
          <FontAwesomeIcon icon={faUser} className="text-2xl duration duration-300 hover:opacity-70 text-gray-800" />
        </Link>
        <Link href="/settings">
          <FontAwesomeIcon icon={faCog} className="text-2xl duration duratino-300 hover:opacity-70 text-gray-800" />
        </Link>
      </div>
    </div>
  );
};

export default TopBar;*/
