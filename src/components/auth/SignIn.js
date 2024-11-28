import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify za obavijesti

const SignIn = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Ako je korisnik već prijavljen, redirektaj na Dashboard
  if (user) return <Navigate to='/dashboard' />;

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Molimo vas unesite email i lozinku!");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Prijava uspjela");
        navigate("/dashboard"); // Preusmjeravanje na dashboard nakon prijave
        toast.success("You are log in!", { position: "top-center", autoClose: 2000 });
      })
      .catch((error) => {
        console.error(error.message);
        toast.error("Incorrect email and password!", { position: "top-center", autoClose: 2000 });
      });
  };

  return (
<>
<form onSubmit={handleSignIn}>
      <fieldset>
        <legend>Sign In</legend>
        <label htmlFor="signin-email">Email</label>
        <input
          type="email"
          id="signin-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="signin-password">Password</label>
        <input
          type="password"
          id="signin-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </fieldset>
    </form>
    <ToastContainer />
    </>
  );
};

export default SignIn;
