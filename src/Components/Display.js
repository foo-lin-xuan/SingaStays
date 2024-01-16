// Display.js
import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import profileImage from "../assets/profilepic.png"

function Display() {
    const nameCtx = useContext(UserContext);
    const profileData = {
        name: "John Doe",
        email: "john@helloworld.com",
        mobile: "88888888",
        description: "Hello World!",
      };

    return (
        <div className="container">
        <h1>User Profile</h1>
        <div className="profile">
        <img src={profileImage} alt="Profile" style={{ width: "100px", height: "100px" }} />
        <p>
          <strong>Name:</strong> {profileData.name}
        </p>
        <p>
          <strong>Email:</strong> {profileData.email}
        </p>
        <p>
          <strong>Mobile:</strong> {profileData.mobile}
        </p>
        <p>
          <strong>Description:</strong> {profileData.description}
        </p>
      </div>

        <h1>Your Favourites</h1>

        {nameCtx.names.map((name) => (
        <p> Name: {name} </p>
        ))}
        </div>
    );
};

export default Display;