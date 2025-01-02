import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import '../../styles/components/SignOutButton.css';

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign out"))
      .catch((error) => console.error(error));
  };

  return <button className="sign-out-btn" onClick={handleSignOut}>Odjavi se</button>;
};

export default SignOutButton;
