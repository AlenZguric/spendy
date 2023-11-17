import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { getUserProfileDocument  } from '../firebase/getUserProfileDocument'; // Prilagodite ovo prema vašim funkcijama
import {updateUserProfileDocument} from "../firebase/updateUserProfileDocument";
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Access the UID of the current user
        const uid = currentUser.uid;
        console.log('UID:', uid);
      }
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Dodajte funkcije za dohvaćanje i ažuriranje podataka profila
  const getUserProfile = async () => {
    if (user && user.uid) {
      try {
        const userProfileData = await getUserProfileDocument(user.uid);
        return userProfileData;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
    }
    return null;
  };

  const updateUserProfile = async (uid, email, updatedProfile) => {
    try {
      await updateUserProfileDocument(uid, email, updatedProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn, getUserProfile, updateUserProfile,  }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
