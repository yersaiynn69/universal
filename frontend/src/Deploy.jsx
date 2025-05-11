// src/Deploy.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth, db, doc, getDoc, setDoc } from "./firebaseConfig";

export default function Deploy() {
  const [privateKey, setPrivateKey] = useState("");
  const [network, setNetwork] = useState("ethereum");
  const [deploying, setDeploying] = useState(false);
  const [error, setError] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = await getDoc(userRef);
        if (userData.exists()) {
          setPrivateKey(userData.data().privateKey || "");
        }
      }
    };
    fetchUserData();
  }, []);

  const savePrivateKey = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, { privateKey }, { merge: true });
      alert("Private Key saved successfully.");
    }
  };

  const handleDeploy = async () => {
    if (!privateKey) {
      setError("Private Key is required.");
      return;
    }

    setDeploying(true);
    setError("");
    setContractAddress("");
    setTxHash("");
    
    try {
      const response = await axios.post(`http://localhost:8000/deploy/${network}`, {
        private_key: privateKey,
      });
      setContractAddress(response.data.address);
      setTxHash(response.data.tx_hash);
    } catch (err) {
      setError("Error: " + (err.response?.data?.detail || err.message));
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="bg-[#14151A] min-h-screen flex flex-col items-center justify-center text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Deploy Your Smart Contract</h1>
      <div className="bg-[#181A20] p-6 rounded-lg shadow-lg w-[380px]">
        <div className="mb-4">
          <label className="block text-sm mb-2">Private Key</label>
          <input 
            type="password" 
            value={privateKey} 
            onChange={(e) => setPrivateKey(e.target.value)} 
            className="w-full p-3 rounded bg-[#24262D] text-white focus:outline-none" 
          />
          <button 
            onClick={savePrivateKey} 
            className="mt-2 w-full bg-[#F0B90B] text-black font-semibold py-2 rounded"
          >
            Save Private Key
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Select Network</label>
          <select 
            value={network} 
            onChange={(e) => setNetwork(e.target.value)} 
            className="w-full p-3 rounded bg-[#24262D] text-white focus:outline-none"
          >
            <option value="ethereum">Ethereum</option>
            <option value="polygon">Polygon</option>
            <option value="bsc">BSC</option>
          </select>
        </div>

        <button
          onClick={handleDeploy}
          disabled={deploying}
          className="w-full bg-[#F0B90B] text-black font-semibold py-3 rounded"
        >
          {deploying ? "Deploying..." : "Deploy Contract"}
        </button>

        {contractAddress && (
          <p className="mt-4 text-green-500 text-center">Contract: {contractAddress}</p>
        )}
        {txHash && (
          <p className="mt-4 text-blue-500 text-center">Tx Hash: {txHash}</p>
        )}
        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
