import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../contex/AuthContex';


const ComponentSignIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {signIn} = UserAuth();

  const handleSubmit =async (e)=>{
    e.preventDefault();
    setError("")
    try{
      await signIn(email, password)
      navigate("/dashboard")
      console.log("Prijavljen si");
    }
    catch (e){
      setError(e.message)
      console.log(e.message)
    }

  }

  return (
    <div className="component-signin">
    <div className="title">
      <h1>Sign in to your account</h1>
           
    </div>
    <form onSubmit={handleSubmit}>
      <div className="form-email">
        <label>E-mail</label>
        <input onChange={(e)=> setEmail(e.target.value)} type="email" />
        <div className="form-password">
          <label>Password</label>
          <input onChange={(e)=> setPassword(e.target.value)} type="password" />
        </div>
      </div>
      <div className="submit-btn">
        <button>Sign In</button>
      </div>
      <p>
        Create free account. 
        <Link to="/signup">Sign Up</Link>
      </p>
    </form>
  </div>
  )
}

export default ComponentSignIn