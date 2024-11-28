import { db, auth } from "../firebase"; // Provjeri da li je db i auth ispravno importiran
import { doc, getDoc,  addDoc, setDoc, updateDoc,  collection,  } from "firebase/firestore";


//Kreiranje prilikom SIGN UP

export const createUserDatabase = async (userId) => {
  try {
    // Kreiramo glavni dokument za korisnika unutar "reg" kolekcije
    const userRef = doc(db, "reg", userId);

    // Postavljanje inicijalnog nick_name-a
    await setDoc(userRef, { nick_name: "Alen" });

    console.log(`Korisnik "Alen" kreiran.`);

    // Kreiramo prazne subkolekcije unutar nick_name-a
    const troskoviRef = collection(userRef, "nick_name/troskovi");
    const stednjaRef = collection(userRef, "nick_name/stednja");
    const kategorijeRef = collection(userRef, "nick_name/kategorije");

    console.log("Struktura korisnika kreirana s praznim subkolekcijama (troskovi, stednja, kategorije).");
  } catch (error) {
    console.error("Greška pri kreiranju korisničke baze podataka:", error);
  }
};//addExpense

// Funkcija za dodavanje podataka u subkolekcije
export const addDataToSubcollection = async (userId, subcollectionName, data) => {
  try {
    const subcollectionRef = collection(db, "reg", userId, "nick_name", subcollectionName);
    await addDoc(subcollectionRef, data);
    console.log(`Podaci dodani u subkolekciju "${subcollectionName}":`, data);
  } catch (error) {
    console.error(`Greška pri dodavanju podataka u ${subcollectionName}:`, error);
  }
};

export const addExpense = async (userId, expenseData) => {
  try {
    const troskoviRef = collection(db, "reg", userId, "troskovi");
    await addDoc(troskoviRef, expenseData);
    console.log("Trošak dodan:", expenseData);
  } catch (error) {
    console.error("Greška pri dodavanju troška:", error);
  }
};

export const addSavings = async (userId, savingsData) => {
  try {
    const stednjaRef = collection(db, "reg", userId, "stednja");
    await addDoc(stednjaRef, savingsData);
    console.log("Štednja dodana:", savingsData);
  } catch (error) {
    console.error("Greška pri dodavanju štednje:", error);
  }
};

export const addCategory = async (userId, categoryData) => {
  try {
    const kategorijeRef = collection(db, "reg", userId, "kategorije");
    await addDoc(kategorijeRef, categoryData);
    console.log("Kategorija dodana:", categoryData);
  } catch (error) {
    console.error("Greška pri dodavanju kategorije:", error);
  }
};


export const fetchExpenses = async () => {
  const userRef = doc(db, "reg", auth.currentUser.uid); // Dohvati referencu na korisničke podatke
  try {
    const userDoc = await getDoc(userRef, "troskovi"); // Dohvati korisnički dokument iz Firestore
    if (userDoc.exists()) {
      return userDoc.data().troskovi || []; // Vraća troškove ako postoje, inače prazan array
    } else {
      console.log("Dokument ne postoji!");
      return [];
    }
  } catch (error) {
    console.error("Greška pri dohvaćanju troškova:", error);
    throw error;
  }
};



export const fetchCategories = async (userId) => {
  try {
    const userDocRef = doc(db, "reg", userId);
    const docSnapshot = await getDoc(userDocRef, "kategorije");

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      console.log("Dohvaćeni podaci za korisnika:", data); // Ispis cijelog objekta
      const categories = data?.nick_name?.kategorije || []; // Provjeri točan put
     console.log("Dohvaćene kategorije:", categories);
      return categories;
    } else {
      console.log("Dokument ne postoji.");
      return []; // Ako dokument ne postoji, vraća prazan niz
    }
  } catch (error) {
    console.error("Greška pri dohvaćanju kategorija:", error);
    return []; // Vraća prazan niz u slučaju greške
  }
};

// Funkcija za dodavanje nove kategorije
export const addNewCategory = async (userId, category) => {
  const categoryRef = doc(db, "reg", userId);
  const userSnap = await getDoc(categoryRef);
  if (userSnap.exists()) {
    const categories = userSnap.data().nick_name.kategorije || [];
    categories.push(category); // Dodajemo novu kategoriju
    await updateDoc(categoryRef, {
      "nick_name.kategorije": categories,
    });
  } else {
    throw new Error("Korisnik nije pronađen");
  }
};

// Funkcija za ažuriranje kategorije
export const updateCategory = async (userId, oldCategory, newCategory) => {
  const categoryRef = doc(db, "reg", userId);
  const userSnap = await getDoc(categoryRef);
  if (userSnap.exists()) {
    const categories = userSnap.data().nick_name.kategorije || [];
    const updatedCategories = categories.map((category) =>
      category === oldCategory ? newCategory : category
    );
    await updateDoc(categoryRef, {
      "nick_name.kategorije": updatedCategories,
    });
  } else {
    throw new Error("Korisnik nije pronađen");
  }
};

// Funkcija za brisanje kategorije
export const deleteCategory = async (userId, category) => {
  const categoryRef = doc(db, "reg", userId);
  const userSnap = await getDoc(categoryRef);
  if (userSnap.exists()) {
    const categories = userSnap.data().nick_name.kategorije || [];
    const updatedCategories = categories.filter((cat) => cat !== category);
    await updateDoc(categoryRef, {
      "nick_name.kategorije": updatedCategories,
    });
  } else {
    throw new Error("Korisnik nije pronađen");
  }
};