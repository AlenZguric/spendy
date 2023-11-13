// AuthContextProvider.js
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { updateUserProfileDocument } from "../firebase/updateUserProfileDocument";
import { ProfileContextProvider } from "../contex/ProfileContext"; // Dodajte ovu liniju za import

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const profileContext = useContext(ProfileContextProvider); // Dodajte ovu liniju za import

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUserContext = async (uid, newData) => {
    try {
      const updatedUser = await updateUserProfileDocument(uid, newData);
      setUser(updatedUser);
      profileContext.updateUserProfile(updatedUser); // Ažurirajte i korisnički profil u ProfileContextu
    } catch (error) {
      console.error("Error updating user context:", error);
    }
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, updateUserContext  }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
