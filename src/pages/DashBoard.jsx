import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar';

const DashBoard = () => {
  const {user, logout} = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async ()=>{
    try{
      await logout();
      navigate("/");
      console.log("Odjavljen si");
    }
    catch(e){
      console.log(e.message);
    }
  };
  
  
  return (
    <div className='DashboardPage'>
      <div className="header">
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>
      </div>
      <h1>Dashboard</h1>
      <p>User email: {user && user.email}</p>

      <button onClick={handleLogOut}>LogOut</button>
    </div>
  );
};

export default DashBoard