import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase"; // Osiguraj da je db ispravno importan

// Funkcija koja kreira strukturu korisnika
export const createUserStructure = async (userId, nickname) => {
  try {
    // Referenca na kolekciju 'users' i podkolekciju 'nicknames' za tog korisnika
    const nicknameRef = doc(collection(db, `users/${userId}/nicknames`), nickname);

    const initialData = {
      savings: [],
      expenses: [],
      categories: ["auto", "hrana", "kafić", "teretana", "računi"],
      createdAt: new Date().toISOString(),
    };

    // Dodaj strukturu u Firestore
    await setDoc(nicknameRef, initialData);
    console.log("User ID:", userId);
console.log("Nickname:", nickname);


    console.log(`Struktura za nickname "${nickname}" uspješno dodana!`);
  } catch (error) {
    console.error("Greška pri kreiranju strukture korisnika:", error.message);
  }
};

