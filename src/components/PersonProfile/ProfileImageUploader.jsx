import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material/";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL, list } from "firebase/storage";
import { get24HourTime } from "../../utils/GetDateAndTime";
import { UserAuth } from "../../context/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { FadeLoader } from "react-spinners";

function ProfileImageUploader() {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = UserAuth();
  const uid = user.uid;

  const generateFilename = () => {
    return `image_${uid}_${get24HourTime()}.jpg`;
  };

  useEffect(() => {
    const checkIfImagesFolderExists = async () => {
      const imagesFolderRef = ref(storage, "images");
      try {
        await list(imagesFolderRef);
      } catch (error) {
        console.log("Folder 'images' ne postoji, stvaram ga.");
        await uploadBytes(imagesFolderRef, new Uint8Array(0));
      }
    };

    checkIfImagesFolderExists();

    // Prikaz slike prilikom ponovnog učitavanja stranice
    const fetchProfileImage = async () => {
      if (uid) {
        try {
          const userDocRef = doc(firestore, "users", uid);
          const userDocSnapshot = await getDoc(userDocRef);
      
          if (userDocSnapshot.exists()) {
            const data = userDocSnapshot.data();
            const profileImage = data?.profile?.ProfileImage;
            if (profileImage) {
              setUrl(profileImage);
            }
          }
        } catch (error) {
          console.error("Error fetching profile image:", error);
        }
      }
    };
    
    fetchProfileImage();
  }, [uid]); // Dodano uid kao ovisnost kako bi se useEffect ponovno pokrenuo kad se promijeni UID

  const handleImageChange = (e) => {
   setLoading(true);
    if (e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);

      const filename = generateFilename();
      const imageRef = ref(storage, `images/${filename}`);
      const metadata = { contentType: "image/jpeg" };

      uploadBytes(imageRef, selectedImage, metadata)
        .then(() => {
          getDownloadURL(imageRef)
            .then((downloadUrl) => {
              setUrl(downloadUrl);

              // Spremi URL u bazu podataka
              const userDocRef = doc(firestore, "users", uid);
              setDoc(
                userDocRef,
                {
                  profile: {
                    ...user?.profile, // Ispravka ovdje
                    ProfileImage: downloadUrl,
                  },
                },
                { merge: true }
              );        setLoading(false);

            })
            .catch((error) => {
              console.log(error.message, "error getting the image URL");
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="ProfilePicture">
      {loading ? (
        <FadeLoader color={"#5e35b1"} loading={loading} size={15} />
      ) : (
        <Avatar src={url} sx={{ width: 150, height: 150 }} />
      )}

<label htmlFor="fileInput" className="material-symbols-outlined">
  edit
</label>
<input
  type="file"
  accept="image"
  id="fileInput"
  style={{ display: 'none' }}
  onChange={handleImageChange}
/>
    </div>
  );
}

export default ProfileImageUploader;
