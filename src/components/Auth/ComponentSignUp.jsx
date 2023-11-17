import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { createUserProfileDocument } from "../../firebase/createUserProfileDocument ";
import { FadeLoader } from "react-spinners";

const ComponentSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await createUser(email, password);
      const { user } = userCredential;

      // Stvori tri foldera za novog korisnika
      await createUserProfileDocument(user.uid);
      navigate("/dashboard");

      console.log("Uspješna registracija");
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError(
          "E-mail adresa već u uporabi. Pokušajte s drugom e-mail adresom."
        );
      } else {
        setError(
          "Dogodila se greška, provjerite svoju internet vezu ili pokušajte ponovno kasnije"
        );
      }

      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-signup">
      <div className="title">
        <h1>Sign Up for a free account</h1>
      </div>
      {loading ? (
        <FadeLoader color={"#5e35b1"} loading={loading} size={15} />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-email">
            <label>E-mail</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" />
            <div className="form-password">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
          </div>
          <div className="submit-btn">
            <button>Sign Up</button>
          </div>
          <p>
            Already have an account yet?
            <Link to="/signin">Sign In</Link>
          </p>
          {error && (
            <div className="error-message">
              <p style={{ color: "red" }}>{error}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default ComponentSignUp;
