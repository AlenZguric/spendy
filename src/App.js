import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import NavBar from "../src/components/NavBar";
import HomePage from "./pages/HomePage";
import DashBoard from "./pages/DashBoard";
import AddExpensePage from "./pages/AddExpensePage";
import ExpenseListPage from "./pages/ExpenseListPage";
import CategoryExpensesPage from "./pages/CategoryExpensesPage";
import SavingsPage from "./pages/SavingsPage";

import { ProtectedRoute } from "./components/protectedRoute";
import { auth } from "./firebase";
import "./App.css";
import Contactpage from "./pages/Contactpage";
import UsersPage from "./pages/UsersPage";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <p>Loading...</p>;
  }
  //console.log("Korisnik u App.js:", user);


  return (
    <div className="App">
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage  />} />
          <Route path="/contact" element={<Contactpage user={user} />} />
          <Route path="/sign-in" element={<SignIn user={user} />} />
          <Route path="/sign-up" element={<SignUp user={user} />} />


          <Route path="/dashboard" element={<ProtectedRoute user={user}> <DashBoard userId={user?.uid} /></ProtectedRoute>}/>
          <Route path="/add-expense" element={<ProtectedRoute user={user}><AddExpensePage /></ProtectedRoute>} />
          <Route path="/expense-list" element={<ProtectedRoute user={user}><ExpenseListPage /></ProtectedRoute>}  />
          <Route path="/category-expenses" element={<ProtectedRoute user={user}><CategoryExpensesPage /></ProtectedRoute>} />
          <Route path="/savings" element={<ProtectedRoute user={user}><SavingsPage /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute user={user}><UsersPage /></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
