// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Topbar from "./Topbar";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Deploy from "./Deploy";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={<AnimatedPage><Login /></AnimatedPage>}
        />
        <Route
          path="/register"
          element={<AnimatedPage><Register /></AnimatedPage>}
        />
        <Route
          path="/dashboard"
          element={<AnimatedPage><Dashboard /></AnimatedPage>}
        />
        <Route
          path="/profile"
          element={<AnimatedPage><Profile /></AnimatedPage>}
        />
        <Route
          path="/deploy"
          element={<AnimatedPage><Deploy /></AnimatedPage>}
        />
        <Route
          path="/"
          element={<AnimatedPage><Dashboard /></AnimatedPage>}
        />
      </Routes>
    </AnimatePresence>
  );
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <Topbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
