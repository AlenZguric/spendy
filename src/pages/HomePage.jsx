import React, { useState } from "react";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import { Navigate } from "react-router-dom";
import "../styles/pages/HomePageStyle.css"; 

const HomePage = ({ user }) => {
  const [isSignUpActive, setIsSignUpActive] = useState(true);

  const handleMethodChange = () => setIsSignUpActive(!isSignUpActive);

  if (user) return <Navigate to="/dashboard" />;

  return (
    <section className="homepage">
      <div className="homepage__header">
        <h1>Welcome to Spendy!</h1>
        <p>
          Your personal finance manager. Track your expenses, grow your savings,
          and gain control over your budget — all for free!
        </p>
      </div>
      <div className="homepage__auth">
        {isSignUpActive ? <SignUp /> : <SignIn />}
        <p onClick={handleMethodChange} className="homepage__toggle">
          {isSignUpActive
            ? "Already have an account? Log in here."
            : "New to Spendy? Create an account now."}
        </p>
      </div>
    </section>
  );
};

export default HomePage;
