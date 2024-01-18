// Proflile.js
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import profileImage from "../assets/profile.jpeg";
import styles from "./Profile.module.css";
import { Link } from "react-router-dom";

function Profile() {
  const nameCtx = useContext(UserContext);
  const profileData = {
    name: "Olivia Turner",
    email: "olivia_turner@gmail.com",
    mobile: "+91 4965285732",
    description:
      "An American marketing specialist, is an adventurous explorer captivated by off-the-beaten-path destinations and cultural immersion. With a passion for connecting with locals and savoring diverse cuisines, she embraces boutique hotels and eco-friendly lodges, embodying the mantra: 'Collect moments, not things.' Follow Olivia's journey as she weaves a tapestry of transformative travel experiences around the globe.",
  };

  return (
    <div className="small container">
      <div className={styles.profile}>
        <div className={styles.leftProfile}>
          <h1 className="orange text-center"> Profile</h1>
          <div className={styles.imageCon}>
            <img
              src={profileImage}
              alt="Profile"
              className={styles.profileImage}
            />
          </div>
        </div>
        <div
          className={`${styles.profileDetails} text-left ${styles.infoTable}`}
        >
          <p>
            <strong className={styles.orangeText}></strong>{" "}
            {profileData.description}
          </p>
          <table>
            <tr>
              <th>Name</th>
              <td>{profileData.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{profileData.email}</td>
            </tr>
            <tr>
              <th>Phone Number</th>
              <td>{profileData.mobile}</td>
            </tr>
          </table>
        </div>

        {/* <div className={`${styles.profileDetails} text-left`}>
          <p>
            <strong className={styles.orangeText}></strong>{" "}
            {profileData.description}
          </p>
          <p>
            <strong className={styles.orangeText}>Name:</strong>{" "}
            {profileData.name}
          </p>
          <p>
            <strong className={styles.orangeText}>Email:</strong>{" "}
            {profileData.email}
          </p>
          <p>
            <strong className={styles.orangeText}>Mobile:</strong>{" "}
            {profileData.mobile}
          </p>
        </div> */}
      </div>
      <div className={`${styles.favSection} text-center`}>
        <h2>
          Your <span className="orange">Favourites</span>
        </h2>

        <div className={styles.favorites}>
          {nameCtx.fav.map((attraction) => (
            <Link
              to={`/attraction/${attraction.id}`}
              key={attraction.id}
              className={styles.favoriteItem}
            >
              <p>{attraction.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
