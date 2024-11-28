import SignOutButton from "../components/auth/SignOutButton";
import React from "react";
import UserAuth from "../components/auth/UserAuth";

const DashBoard = () => {





  return (
    <div className="dash-board-page">
      <div className="aside-box">
<UserAuth/>
      </div>
      <div className="main-box">
      <SignOutButton/>
      </div>
   
   
    </div>
  );
};

export default DashBoard;
