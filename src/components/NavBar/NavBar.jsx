import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes  } from "react-icons/fa";
import "../../assets/styles/components/NavBar/NavBarStyle.css";
import { UserAuth } from "../../contex/AuthContex";
import { getUserProfileDocument } from "../../firebase/getUserProfileDocument";
import avatarProfile from "../../assets/images/avatarProfile.png";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = UserAuth();
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const avatarURL = avatarProfile;

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfile = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        // Provjeri ima li trenutnog korisnika prije dohvaćanja podataka profila
        if (user && user.uid) {
          const userProfile = await getUserProfileDocument(user.uid);
          const profileImage = userProfile?.profileImage || avatarURL;
          setProfileImage(profileImage);
        }
      } catch (error) {
        console.error("Greška pri dohvaćanju podataka profila:", error);
      }
    };
  
    fetchProfileImage();
  }, [user,profileImage, avatarURL]);
  
  

  return (
    <div className="component-navbar">
      <div className="navbar">
        <div className="logo">
          <h1>Spendy</h1>
        </div>

        <div className="menu-icon" onClick={handleMenuToggle}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {!user && (
            <>
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li onClick={logout}>Logout</li>
            </>
          )}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {user && (
            <div className="profile-info" onClick={handleProfile}>
              <div className="profile-picture">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  <img src={avatarURL} alt="Avatar" />
                )}
              </div>
              <div  className="name-profile">
                <p>{user.email}</p>
              </div>
            </div>
          )}
          <hr />
          <p>
            <NavLink to="/privacyandterms">Privacy & Terms</NavLink>
          </p>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
