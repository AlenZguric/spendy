// profileContext.js
import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({});

  const updateUserProfile = (newProfileData) => {
    // Dodajte logiku za ažuriranje profila u Firestoreu
    // ...

    // Ažurirajte lokalno stanje profila
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
