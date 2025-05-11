// src/Topbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { motion } from "framer-motion";

export default function Topbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <motion.nav 
      className="bg-[#14151A] text-white px-8 py-4 flex justify-between items-center shadow-md"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Left Side - Logo */}
      <div className="flex space-x-4 items-center">
        <h1 className="text-xl font-bold text-yellow-500">
          Universal Smart Contract
        </h1>
        {user && (
          <>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/dashboard" className="hover:text-yellow-500">
                Home
              </Link>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/profile" className="hover:text-yellow-500">
                Profile
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {/* Right Side - Logout */}
      <div>
        {user ? (
          <motion.button 
            onClick={handleLogout} 
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button>
        ) : (
          <Link
            to="/login"
            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </motion.nav>
  );
}
