// src/Register.js
import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="bg-[#14151A] flex items-center justify-center min-h-screen">
      <div className="bg-[#181A20] text-white rounded-xl p-8 w-[380px] shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <img src="https://placehold.co/40x40" alt="Binance Logo" className="mb-2" />
          <h1 className="text-lg font-bold text-center">Регистрация на Binance</h1>
        </div>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Эл. почта/номер телефона"
            className="w-full p-3 rounded bg-[#24262D] text-white focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-3 rounded bg-[#24262D] text-white focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-[#F0B90B] text-black font-semibold py-3 rounded">
            Далее
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Уже есть аккаунт? <a href="/" className="text-yellow-500">Войти</a>
        </p>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
    </div>
  );
}
