import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../assets/styles/components/NavBar/NavBarStyle.css";
import { UserAuth } from "../../context/AuthContext";
import { getUserProfileDocument } from "../../firebase/getUserProfileDocument";
import defaultAvatar from "../../assets/images/defaultAvatar.png";
import {useOutsideClick} from "../../hooks/useOutsideClick";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = UserAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [registrationTime, setRegistrationTime] = useState("");

  const navigate = useNavigate();

  const avatarURL = defaultAvatar;

  const menuRef = useOutsideClick(() => {
    setMenuOpen(false);
  });

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleProfile = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

 
  

  useEffect(() => {
  const fetchData = async () => {
    if (user && user.uid) {
      try {
        const userProfile = await getUserProfileDocument(user.uid);

        if (userProfile && userProfile.profile && userProfile.profile) {
          const {
            FirstName = "",
            LastName = "",
            email: userEmail = "",
            Gender = "",
            City = "",
            Country = "",
            ProfileImage,
          } = userProfile.profile;

          setFirstName(FirstName);
          setLastName(LastName);
          setEmail(userEmail);
          setGender(Gender);
          setCity(City);
          setCountry(Country);
          setProfileImage(ProfileImage || null);

          console.log(lastName, email, gender, city, country, registrationTime);

          // Postavite i ostale vrijednosti, npr. registrationTime
          setRegistrationTime(userProfile.theRest?.registrationTime || "");
        } else {
          console.error("Profile data is missing or incomplete.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  };
  fetchData();

  }, [user ]);

  return (
    <div className="component-navbar" >
      <div className="navbar" ref={menuRef}>
        <div className="logo">
          <h1>Spendy</h1>
        </div>

        <div className="menu-icon" onClick={handleMenuToggle}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}  >
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li onClick={logout}>
                <NavLink to="/">Logout</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/signin">Sign In</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Sign Up</NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/privacyandterms">Privacy & Terms</NavLink>
          </li>
          {user && (
            <div className="profile-info" onClick={handleProfile}>
              <div className="profile-picture" >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" style={{maxHeight: "100px", maxWidth: "100px"}} />
                ) : (
                  <img src={avatarURL} alt="Avatar" style={{maxHeight: "100px", maxWidth: "100px"}} />
                )}
              </div>
              <div className="name-profile">
                <p>welcome, </p>
                <p>{firstName || user.email}</p>
              </div>
            </div>
          )}
          
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
