import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { createUserStructure } from "../../services/createUserStructure";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import '../../styles/components/SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (email, password, nickname) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      createUserStructure(user.uid, nickname); // Dodavanje nickname-a
      toast.success("Registration successful!", { position: "top-center", autoClose: 2000 });

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      toast.error(`Something went wrong ${error.message}`, { position: "top-center" , autoClose:2000});
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp(email, password, nickname);
        }}
      >
        <fieldset>
          <legend>Sign Up</legend>
          <label htmlFor="signup-email">Email</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="signup-nickname">Nickname</label>
          <input
            type="text"
            id="signup-nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </fieldset>
      </form>
      <ToastContainer />
    </>
  );
};

export default SignUp;
