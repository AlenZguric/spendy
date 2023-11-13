import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import avatarProfile from "../assets/images/avatarProfile.png"

const useProfileImage = (user) => {
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user) {
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', user.uid);

        try {
          const snapshot = await getDoc(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.data();
            if (
              userData &&
              userData.profile &&
              userData.profile.key &&
              userData.profile.key.ProfileImage
            ) {
              setProfileImage(userData.profile.key.ProfileImage);
            } else {
              // Postavite defaultnu sliku ako ne postoji profilna slika
              setProfileImage(avatarProfile);
            }
          }
        } catch (error) {
          console.error('Error fetching profile image:', error);
        }
      }
    };

    fetchProfileImage();
  }, [user]);

  return profileImage;
};

export default useProfileImage;
