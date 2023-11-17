import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import "../../assets/styles/components/SignIn/SignIn.css";
import { FadeLoader } from "react-spinners";



const ComponentSignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {signIn} = UserAuth();
  const [loading, setLoading] = useState(false);



  const handleSubmit =async (e)=>{
    e.preventDefault();
    setError("")
    setLoading(true);
    try{
      await signIn(email, password)
      navigate("/dashboard")
      console.log("Prijavljen si");
    }
    catch (e){
      setError(e.message)
      console.log(e.message)
    }finally {
      setLoading(false);
    }

  }

  return (
    <div className="component-signin">
      <div className="form">
        <div className="title">
          <h1>Sign in to your account</h1>
        </div>
        {loading ? (
          <FadeLoader color={"#5e35b1"} loading={loading} size={15}/>
        ):(
          <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="form-email">
              <label>E-mail</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="input"
              />
              <span>Email adresa</span>
            </div>
  
            <div className="form-password">
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="input"
              />
              <span>Lozinka</span>
            </div>
          </div>
          <div className="submit-btn">
            <button className="submit">Sign In</button>
          </div>
          <p className="signin">
            Create free account.
            <Link to="/signup">Sign Up</Link>
          </p>
          {error && (
          <div className="error-message">
            <p style={{ color: "red" }}>{error}</p>
          </div>
        )}
        </form>
        )}
      </div>
    </div>
  );
  
}

export default ComponentSignIn