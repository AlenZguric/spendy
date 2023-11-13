import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DashBoard from "./pages/DashBoard";
import PrivacyAndTerms from "./pages/PrivacyAndTerms";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthContextProvider } from '../src/contex/AuthContex';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <div>
      
      <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacyandterms" element={<PrivacyAndTerms />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>

      </AuthContextProvider>
    </div>
  );
};

export default App;
