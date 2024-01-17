// Display.js
import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import profileImage from "../assets/profilepic.png"
import styles from "./Display.module.css";

function Display() {
    const nameCtx = useContext(UserContext);
    const profileData = {
        name: "Loraine Dee",
        email: "loraine@helloworld.com",
        mobile: "12345678",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      };

      return (
        <div className={styles.container}>
          <h1 className={styles.smallHeading}> Profile</h1>
          <div className={styles.profile}>
            <img src={profileImage} alt="Profile" className={styles.profileImage} />
            <div className={styles.profileDetails}>
              <p>
                <strong className={styles.orangeText}>Name:</strong> {profileData.name}
              </p>
              <p>
                <strong className={styles.orangeText}>Email:</strong> {profileData.email}
              </p>
              <p>
                <strong className={styles.orangeText}>Mobile:</strong> {profileData.mobile}
              </p>
              <p>
                <strong className={styles.orangeText}></strong> {profileData.description}
              </p>
            </div>
          </div>
    
          <div className={styles.separator}></div>
    
          <h1>Your Favourites</h1>
    
          <div className={styles.favorites}>
            {nameCtx.names.map((name, index) => (
              <p key={index} className={styles.favoriteItem}>
                {name}
              </p>
            ))}
          </div>
        </div>
      );
    }

export default Display;