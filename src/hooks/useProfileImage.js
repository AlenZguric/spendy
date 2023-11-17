
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { getUserProfileDocument } from "../firebase/getUserProfileDocument";

export function useProfileImage() {
  const { user } = UserAuth();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        if (user && user.uid) {
          const userProfile = await getUserProfileDocument(user.uid);
    
          if (userProfile && userProfile.profile && userProfile.profile.key) {
            const { ProfileImage } = userProfile.profile.key;
    
            if (ProfileImage !== "") {
              setProfileImage(ProfileImage);
            } else {
              // Ako je ProfileImage prazan string, postavi profileImage na null
              setProfileImage(null);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    
    

    fetchProfileImage();
  }, [user]);

  return profileImage;
}
