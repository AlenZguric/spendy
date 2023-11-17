import React from "react";

const OtherInfoSection = ({ nickName, user, gender, city, country, setNickName, setGender, setCity, setCountry }) => {
  return (
    <div className="other-info-section">
      <div>
        <label>Nadimak:</label>
        <input
          type="text"
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />
      </div>
      <div>
        <span>Email:</span>
        <span>{user.email}</span>
      </div>
      <div>
        <label>Spol:</label>
        <div>
          <label>
            <input
              type="radio"
              value="male"
              checked={gender === "male"}
              onChange={() => setGender("male")}
            />
            Muški
          </label>
          <label>
            <input
              type="radio"
              value="female"
              checked={gender === "female"}
              onChange={() => setGender("female")}
            />
            Ženski
          </label>
          <label>
            <input
              type="radio"
              value="other"
              checked={gender === "other"}
              onChange={() => setGender("other")}
            />
            Ostalo
          </label>
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
    </div>
  );
};

export default OtherInfoSection;
