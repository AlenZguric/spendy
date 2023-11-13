import React from 'react';
import ComponentSignIn from '../components/Auth/ComponentSignIn';
import NavBar from '../components/NavBar/NavBar';

const SignIn = () => {


  return (
    <div className="SignInPage">
      <div className="header">
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>
      </div>
    <h1>Sign INNNNN</h1>
    <ComponentSignIn/>
  </div>
  );
};

export default SignIn;
