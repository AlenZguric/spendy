import React from "react";
import NavBar from "../components/NavBar/NavBar";
import ComponentEditProfileData from "../components/PersonProfile/ComponentEditProfileData";

const Profile = () => {
  return (
    <div className="ProfilePage">
      <div className="header">
        <header>
          <nav>
            <NavBar />
          </nav>
        </header>
      </div>
      <div className="main">
        <main>
          <div className="section">
            <ComponentEditProfileData/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
