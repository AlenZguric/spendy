import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";  // Provjeri da li je ovo ispravan put
import AddNickname from "../../components/auth/AddNickname";  // Put do tvoje AddNickname komponente

const UserAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Praćenje promjena u korisničkom statusu
    const unsubscribe = auth.onAuthStateChanged(setUser);
    // Očisti pretplatu kad komponenta bude unmounted
    return unsubscribe;
  }, []);

  // Ako je korisnik prijavljen, proslijedi njegov userId u AddNickname, inače prikaži "Loading..."
  return user ? <AddNickname userId={user.uid} /> : <p>Loading...</p>;
};

export default UserAuth;
