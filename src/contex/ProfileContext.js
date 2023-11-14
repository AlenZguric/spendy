// profileContext.js
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});

  const updateUserProfile = (newProfileData) => {

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      ...newProfileData,
    }));
  };

  return (
    <ProfileContext.Provider value={{ userProfile, updateUserProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
