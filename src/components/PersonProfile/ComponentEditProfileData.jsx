import React, { useState, useEffect } from "react";
import { UserAuth } from "../../contex/AuthContex";
import { updateUserProfileDocument } from "../../firebase/updateUserProfileDocument";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getUserProfileDocument } from "../../firebase/getUserProfileDocument";
import { RingLoader } from "react-spinners";
import avatarProfile from "../../assets/images/avatarProfile.png";


const EditProfile = () => {
  const { user } = UserAuth();
  const [firstName, setFirstName] = useState("");
  const [nickName, setNickName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [registrationTime, setRegistrationTime] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalProfileImage, setOriginalProfileImage] = useState(null);

  const avatarURL = avatarProfile;

  const handleImageUpload = (event) => {
    setProfileImage(event.target.files[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        try {
          setLoading(true);
          const userProfile = await getUserProfileDocument(user.uid);

          if (userProfile && userProfile.profile && userProfile.profile.key) {
            const {
              NickName = "",
              FirstName = "",
              LastName = "",
              email: userEmail = "",
              Gender = "",
              City = "",
              Country = "",
              ProfileImage = null,
            } = userProfile.profile.key;
            setNickName(NickName);
            setFirstName(FirstName);
            setLastName(LastName);
            setEmail(userEmail);
            setGender(Gender);
            setCity(City);
            setCountry(Country);

            // Ako korisnik nema sliku profila, postavite defaultnu sliku
            if (!ProfileImage) {
              setOriginalProfileImage(null);
            } else {
              setOriginalProfileImage(ProfileImage);
            }

            setProfileImage(ProfileImage);

            setRegistrationTime(userProfile.theRest?.registrationTime || "");
          } else {
            console.error("Profile data is missing or incomplete.");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [user, refresh]);

  const uploadImage = async () => {
    try {
      if (!profileImage) {
        return; // Nema potrebe za uploadom ako nema slike
      }

      const storage = getStorage();
      const storageRef = ref(storage);

      // Generišite jedinstveno ime slike kako biste izbjegli pregazivanje
      const imageName = `profile_${user.uid}_${Date.now()}`;
      const imageRef = ref(storageRef, `/images/${imageName}`);

      // Koristite uploadBytes umjesto uploadBytesResumable
      await uploadBytes(imageRef, profileImage);

      console.log("Image uploaded successfully!");

      const url = await getDownloadURL(imageRef);

      // Update the Firestore document with the new download URL
      await updateUserProfileDocument(user.uid, {
        profile: { key: { ProfileImage: url } },
      });

      return url;
    } catch (error) {
      console.error("Error uploading image: ", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Provjerite postoji li slika profila
      if (profileImage && profileImage !== originalProfileImage) {
        // Ažuriranje slike profila ako postoji i ako je promijenjena
        const imageUrl = await uploadImage();

        // Ažuriranje ostalih korisničkih podataka i slike profila
        await updateUserProfileDocument(user.uid, {
          profile: {
            key: {
              NickName: nickName,
              FirstName: firstName,
              LastName: lastName,
              email: email,
              Gender: gender,
              City: city,
              Country: country,
              ProfileImage: imageUrl,
            },
          },
        });
      } else {
        // Ažuriranje samo tekstualnih podataka ako nema slike profila ili ako nije promijenjena
        await updateUserProfileDocument(user.uid, {
          profile: {
            key: {
              NickName: nickName,
              FirstName: firstName,
              LastName: lastName,
              email: email,
              Gender: gender,
              City: city,
              Country: country,
            },
          },
        });
      }

      console.log("Profil uspješno ažuriran!");

      // Resetirajte stanje nakon ažuriranja
      setNickName("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setGender("");
      setCity("");
      setCountry("");
      setProfileImage(null);
      setRefresh((prevRefresh) => !prevRefresh);
    } catch (error) {
      console.error("Greška pri ažuriranju profila:", error.message);
    }
  };

  return (
    <div>
      <h2>Uredi korisničke podatke</h2>
      {loading ? (
        <RingLoader color="#36D7B7" loading={loading} size={150}/>
      ) : (
        
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nadimak:</label>
            <input
              type="text"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
            />
          </div>
          <div className="profilepicture">
            <img src={profileImage || avatarURL } alt="profilna" />
          </div>
          <div>
            <label>Ime:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label>Prezime:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <span>Email:</span>
            <span>{user.email}</span>
          </div>
          <div>
            <label>Spol:</label>
            <div>
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="male">Muški</label>
            </div>
            <div>
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="female">Ženski</label>
            </div>
            <div>
              <input
                type="radio"
                id="other"
                name="gender"
                value="other"
                checked={gender === "other"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label htmlFor="other">Drugo</label>
            </div>
          </div>
          <div>
            <label>Grad:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label>Država:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <label>Slika profila:</label>
            <input type="file" onChange={handleImageUpload} accept="image/*" />
            {profileImage && (
              <div>
                <p>Trenutna slika:</p>
                <img
                  src={
                    profileImage instanceof File
                      ? URL.createObjectURL(profileImage)
                      : profileImage
                  }
                  alt="Profilna slika"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
            )}
          </div>
          <button type="submit">Ažuriraj profil</button>
        </form>
      )}
      <div>
        <label>Vrijeme registracije:</label>
        <p>{registrationTime}</p>
      </div>
    </div>
  );
};

export default EditProfile;
