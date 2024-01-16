import React, { useState } from "react";

const UserProfile = () => {
  const [profileImg, setProfileImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [description, setDescription] = useState("");
  const [savedProfiles, setSavedProfiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProfile = {
      profileImg,
      name,
      email,
      mobileNumber,
      description,
    };
    setSavedProfiles([...savedProfiles, newProfile]);
    setProfileImg("");
    setName("");
    setEmail("");
    setMobileNumber("");
    setDescription("");
  };

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Profile Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImg(e.target.files[0])}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Mobile Number:
          <input
            type="number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Save</button>
      </form>

      <h2>Saved Profiles</h2>
      {savedProfiles.map((profile, index) => (
        <div key={index}>
          <img src={URL.createObjectURL(profile.profileImg)} alt="Profile" />
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Mobile Number: {profile.mobileNumber}</p>
          <p>Description: {profile.description}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;