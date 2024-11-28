import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const SignOutButton = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign out"))
      .catch((error) => console.error(error));
  };

  return <button onClick={handleSignOut}>Odjavi se</button>;
};

export default SignOutButton;
