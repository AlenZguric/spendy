// ComponentEditProfileData.js

import React, { useState, useEffect } from "react";
import { UserAuth } from "../../contex/AuthContex";
import { updateUserProfileDocument } from "../../firebase/updateUserProfileDocument";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getUserProfileDocument } from "../../firebase/getUserProfileDocument";
import { imageDb } from "../../firebase/firebase";
import { v4 } from "uuid";

const ComponentEditProfileData = () => {
  const { user } = UserAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [registrationTime, setRegistrationTime] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const handleImageUpload = (event) => {
    setProfileImage(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const userProfile = await getUserProfileDocument(user.uid);

          if (userProfile) {
            const {
              FirstName,
              LastName,
              email: userEmail,
              Gender,
              City,
              Country,
              ProfileImage,
            } = userProfile.profile?.key || {};

            setFirstName(FirstName || "");
            setLastName(LastName || "");
            setEmail(userEmail || "");
            setGender(Gender || "");
            setCity(City || "");
            setCountry(Country || "");
            setProfileImage(ProfileImage || null);
            setRegistrationTime(userProfile.theRest?.registrationTime || "");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  async function uploadImage(uid, key, imageDb) {
    try {
      const storage = getStorage();
      const storageRef = ref(storage);
      
      // Generišite jedinstveno ime slike kako biste izbjegli pregazivanje
      const imageName = `profile_${user.uid}_${Date.now()}`;
      const imageRef = ref(storageRef, `/images/${imageName}`);
      
      // Koristite uploadBytes umjesto uploadBytesResumable
      await uploadBytes(imageRef, profileImage);
      
      console.log("Image uploaded successfully!");
      
   
       const url = await imageRef.getDownloadURL();
   
       // Update the Firestore document with the new download URL
       await updateUserProfileDocument(uid, { profile: { key: { ProfileImage: url } } });
   
       return url;
    } catch (error) {
       console.error("Error uploading image: ", error);
       throw error;
    }
   }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadImage();
      await updateUserProfileDocument(user.uid, {
        profile: {
          key: {
            FirstName: firstName,
            LastName: lastName,
            email: email,
            Gender: gender,
            City: city,
            Country: country,
            ProfileImage: profileImage,
          },
        },
      });

      console.log("Profil uspješno ažuriran!");

      setFirstName("");
      setLastName("");
      setEmail("");
      setGender("");
      setCity("");
      setCountry("");
      setProfileImage("");
    } catch (error) {
      console.error("Greška pri ažuriranju profila:", error.message);
    }
  };

  return (
    <div>
      <h2>Uredi korisničke podatke</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ime:</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Prezime:</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Spol:</label>
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </div>
        <div>
          <label>Grad:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label>Država:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div>
          <label>Slika profila:</label>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
          />
          {profileImage && (
            <div>
              <p>Trenutna slika:</p>
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profilna slika"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            </div>
          )}
        </div>

        <button type="submit">Ažuriraj profil</button>
      </form>

      <div>
        <label>Vrijeme registracije:</label>
        <p>{registrationTime}</p>
      </div>
    </div>
  );
};

export default ComponentEditProfileData;
