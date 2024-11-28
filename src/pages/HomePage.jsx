import React, { useState } from "react";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";
import { Navigate } from "react-router-dom";

const HomePage = ({ user }) => {
  const [isSignUpActive, setIsSignUpActive] = useState(true);

  const handleMethodChange = () => setIsSignUpActive(!isSignUpActive);

  if (user) return <Navigate to="/dashboard" />;

  return (
    <section>
      <h2>HomePage</h2>
      {isSignUpActive ? <SignUp /> : <SignIn />}
      <p onClick={handleMethodChange}>
        {isSignUpActive ? "Already have an account? Login" : "Create an account"}
     </p>
      
  
    </section>
  );
};

export default HomePage;
