import React, { useState, useEffect } from "react";
import "../../assets/styles/components/PersonProfile/ProfileInfoSection.css";
import { UserAuth } from "../../context/AuthContext";
import { getUserProfileDocument } from "../../firebase/getUserProfileDocument";
import { updateUserProfileDocument } from "../../firebase/updateUserProfileDocument";

const ProfileInfoSection = () => {
  const { user } = UserAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    // Dodajte ostale potrebne polje u formi
  });

  const handleProfileChange = (e, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
    console.log("Form data updated:", formData);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...");
      if (user && user.uid) {
        try {
          const userProfile = await getUserProfileDocument(user.uid);

          if (userProfile && userProfile.profile) {
            const {
              FirstName = "",
              LastName = "",
              // ... Dodajte ostale potrebne polje u formi
            } = userProfile.profile;

            setFormData({
              firstName: FirstName,
              lastName: LastName,
              // ... Dodajte ostale potrebne polje u formi
            });
          } else {
            console.error("Profile data is missing or incomplete.");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Submitting form...");

    if (user && user.uid) {
      try {
        const updatedProfile = {
          FirstName: formData.firstName,
          LastName: formData.lastName,
          // Dodaj ostale podatke prema potrebi
        };

        await updateUserProfileDocument(user.uid, updatedProfile);

        console.log("User profile updated successfully.");
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="name-section">
        <div className="coolinput">
          <label className="text">First Name</label>
          <input
            className="input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleProfileChange(e, "firstName")}
            placeholder="First Name"
          />
        </div>
        <div className="coolinput">
          <label className="text">Last Name</label>
          <input
            className="input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleProfileChange(e, "lastName")}
            placeholder="Last Name"
          />
        </div>
        {/* Dodajte dodatna polja prema vašim potrebama */}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileInfoSection;
