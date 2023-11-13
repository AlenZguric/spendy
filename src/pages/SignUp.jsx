import React from "react";
import ComponentSignUp from "../components/Auth/ComponentSignUp";
import NavBar from "../components/NavBar/NavBar";


const SignUp = () => {



  return (
    <div className="SignUpPage">
      <div className="header">
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>
      </div>
      <h1>Page SignUp</h1>
      <ComponentSignUp/>
    </div>
  );
};

export default SignUp;
