import { doc, setDoc, getDoc, collection, getDocs, deleteDoc, updateDoc,  } from "firebase/firestore";
import { auth, db } from "../firebase"; // Prilagodi put prema svom firebase.js



// Funkcija koja dodaje nickname u podkolekciju 'nicknames' za korisnika
export const addUserNickname = async (nickname) => {
  const user = auth.currentUser;


  if (user) {
    try {
      // Referenca na korisnikov dokument i podkolekciju 'nicknames'
      const nicknameRef = doc(collection(db, `users/${user.uid}/nicknames`), nickname);

      const initialData = {
        savings: [],
        expenses: [],
        categories: ["auto", "hrana", "kafić", "teretana", "računi"],
        createdAt: new Date().toISOString(),
      };

      // Provjeri postoji li već nickname u podkolekciji
      const nicknameDocSnap = await getDoc(nicknameRef);

      if (!nicknameDocSnap.exists()) {
        // Ako nickname ne postoji, dodaj ga
        await setDoc(nicknameRef, initialData);
        console.log(`Struktura za nickname "${nickname}" uspješno dodana!`);
      } else {
        console.log(`Nickname "${nickname}" već postoji!`);
      }
    } catch (error) {
      console.error("Greška pri dodavanju nickname-a:", error.message);
      throw error;
    }
  } else {
    throw new Error("User is not authenticated");
  }
};

// Funkcija za dohvat svih nickname-ova za korisnika
export const getUserNicknames = async () => {
  const user = auth.currentUser;

  if (user) {
    try {
      const nicknamesRef = collection(db, `users/${user.uid}/nicknames`);
      const nicknamesSnap = await getDocs(nicknamesRef);
      const nicknames = [];
      nicknamesSnap.forEach((doc) => {
        nicknames.push(doc.id); // Dodaj nickname (ID dokumenta) u polje
      });
      return nicknames;
    } catch (error) {
      console.error("Greška pri dohvaćanju nickname-ova:", error.message);
      throw error;
    }
  } else {
    throw new Error("User is not authenticated");
  }
};


// Funkcija koja preimenuje nickname
export const renameNickname = async (oldNickname, newNickname) => {
  const user = auth.currentUser;

  if (user) {
    try {
      // Referenca na stari i novi nickname dokument
      const oldNicknameRef = doc(db, `users/${user.uid}/nicknames`, oldNickname);
      const newNicknameRef = doc(db, `users/${user.uid}/nicknames`, newNickname);

      // Provjeri postoji li već novi nickname
      const newNicknameDocSnap = await getDoc(newNicknameRef);
      if (newNicknameDocSnap.exists()) {
        console.log(`Nickname "${newNickname}" već postoji!`);
        return;
      }

      // Prekopiraj podatke sa starog nickname-a na novi
      const oldNicknameDocSnap = await getDoc(oldNicknameRef);
      if (oldNicknameDocSnap.exists()) {
        const oldData = oldNicknameDocSnap.data();

        // Dodaj novi nickname s postojećim podacima
        await setDoc(newNicknameRef, oldData);
        console.log(`Nickname "${oldNickname}" preimenovan u "${newNickname}"`);

        // Obriši stari nickname
        await deleteDoc(oldNicknameRef);
        console.log(`Stari nickname "${oldNickname}" obrisan.`);
      } else {
        console.log(`Stari nickname "${oldNickname}" ne postoji!`);
      }
    } catch (error) {
      console.error("Greška pri preimenovanju nickname-a:", error.message);
      throw error;
    }
  } else {
    throw new Error("User is not authenticated");
  }
};

// Funkcija koja briše nickname
export const deleteNickname = async (nickname) => {
  const user = auth.currentUser;

  if (user) {
    try {
      // Referenca na dokument nickname-a
      const nicknameRef = doc(db, `users/${user.uid}/nicknames`, nickname);

      // Obriši nickname
      await deleteDoc(nicknameRef);
      console.log(`Nickname "${nickname}" uspješno obrisan!`);
    } catch (error) {
      console.error("Greška pri brisanju nickname-a:", error.message);
      throw error;
    }
  } else {
    throw new Error("User is not authenticated");
  }
};

// Promjena boje za pozadinu

export const updateNicknameColor = async (nickname, newColor) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const nicknameRef = doc(db, `users/${user.uid}/nicknames/${nickname}`);
      await updateDoc(nicknameRef, { color: newColor });
      console.log("Boja uspješno ažurirana!");
    } catch (error) {
      console.error("Greška pri ažuriranju boje:", error.message);
    }
  }
};