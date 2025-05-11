// src/Login.js
import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    }
  };

  return (
    <div className="bg-[#14151A] flex items-center justify-center min-h-screen">
      <div className="bg-[#181A20] text-white rounded-xl p-8 w-[380px] shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src="https://placehold.co/40x40" alt="Binance Logo" className="mb-2" />
          <h1 className="text-lg font-bold text-center">Войти</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Эл. почта/номер телефона"
              className="w-full p-3 rounded bg-[#24262D] text-white focus:outline-none border border-[#F0B90B]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Пароль"
              className="w-full p-3 rounded bg-[#24262D] text-white focus:outline-none border border-[#F0B90B]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-[#F0B90B] text-black font-semibold py-3 rounded">
            Далее
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">
          Создать аккаунт <a href="/register" className="text-yellow-500">Binance</a>
        </div>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}
