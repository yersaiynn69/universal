// src/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  const handleDeploy = () => {
    navigate("/deploy");
  };

  return (
    <div className="bg-[#14151A] min-h-screen text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-[400px] w-full bg-[#181A20] p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Ваш аккаунт на Binance</h1>
        <p className="text-center mb-4">Ваш баланс: 0.0000 BNB</p>
        <div className="flex flex-col gap-4">
          <button
            className="bg-[#F0B90B] text-black font-semibold py-3 rounded"
            onClick={handleDeploy}
          >
            Deploy Smart Contract
          </button>
          <button
            className="bg-red-600 text-white font-semibold py-3 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
