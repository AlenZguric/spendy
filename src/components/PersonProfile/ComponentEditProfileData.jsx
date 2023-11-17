import React, { useState, useEffect } from 'react';
import ProfileImageUploader from './ProfileImageUploader';
import ProfileInfoSection from './ProfileInfoSection';
import { useProfile } from '../../context/ProfileContext';
import { useParams } from 'react-router-dom';
import fetchUserProfile from '../../firebase/fetchUserProfile'; // Prilagodite putanju do vaše funkcije

const ComponentEditProfileData = () => {
  const { userProfile, updateUserProfile } = useProfile();
  const { uid } = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (uid && !userProfile.uid) {
        try {
          const userProfileData = await fetchUserProfile(uid);
          setProfile(userProfileData);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    };

    fetchData();
  }, [uid, userProfile.uid]);

  return (
    <div>
      <h2>Edit Profile Data</h2>
      <ProfileImageUploader uid={uid} /* Dodajte druge propse ako su potrebni */ />
      <ProfileInfoSection setProfile={setProfile} profile={profile} />
    </div>
  );
};

export default ComponentEditProfileData;