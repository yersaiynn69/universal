// src/Profile.js
import React, { useState, useEffect } from "react";
import { auth, db, doc, setDoc, getDoc, signOut } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [privateKey, setPrivateKey] = useState("");
  const [network, setNetwork] = useState("ethereum");
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = await getDoc(userRef);
        if (userData.exists()) {
          setPrivateKey(userData.data().privateKey || "");
          setNetwork(userData.data().network || "ethereum");
        }
      }
    };
    fetchUserData();
  }, []);

  const saveSettings = async () => {
    if (auth.currentUser) {
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        privateKey,
        network,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="bg-[#14151A] min-h-screen flex flex-col items-center justify-center text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <div className="bg-[#181A20] p-6 rounded-lg shadow-lg w-[380px]">
        <input
          type="text"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Enter your Private Key"
          className="w-full mb-4 p-3 rounded bg-[#24262D] text-white"
        />
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-[#24262D] text-white"
        >
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="bsc">Binance Smart Chain (BSC)</option>
        </select>
        <button
          onClick={saveSettings}
          className="w-full bg-[#F0B90B] text-black font-semibold py-3 rounded"
        >
          Save Settings
        </button>
        {saved && <p className="text-green-500 text-center mt-2">Settings saved!</p>}
        <button onClick={handleLogout} className="w-full bg-red-500 text-white mt-4 py-3 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
