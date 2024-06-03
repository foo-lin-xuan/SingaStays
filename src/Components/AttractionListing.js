import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import styles from "./HomePage.module.css";
import { ReactComponent as Star } from "../assets/star.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import hero from "../assets/hero-listing.png";
import placeholder from "../assets/placeholder.jpg";

function AttractionListing() {
  const [attractionTypes, setAttractionTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [allAttractions, setAllAttractions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeType, setActiveType] = useState(attractionTypes[0] || "");

  const { savedAttractions, setSavedAttractions, setFavHandler } =
    useContext(UserContext);

  const handlerLogIn = () => {
    setIsLoggedIn(() => !isLoggedIn);
  };

  useEffect(() => {
    fetchAttractionTypes();
  }, []);

  const fetchAttractionTypes = async () => {
    try {
      const apiUrl =
        "https://api.stb.gov.sg/content/common/v2/types?category=attractions";
      const headers = {
        Accept: "application/json",
        "X-API-Key": process.env.REACT_APP_API_KEY,
      };

      const response = await axios.get(apiUrl, { headers });
      setAttractionTypes(response.data.data);
    } catch (error) {
      console.error("Error fetching attraction types:", error);
    }
  };

  useEffect(() => {
    fetchAllAttractions();
  }, []);

  const fetchAllAttractions = async () => {
    try {
      const apiUrl = `https://api.stb.gov.sg/content/attractions/v2/search?searchType=keyword&searchValues=adventure`;
      const headers = {
        Accept: "application/json",
        "X-API-Key": process.env.REACT_APP_API_KEY,
      };

      const response = await axios.get(apiUrl, { headers });
      // console.log(response);
      const formattedAttractions = response.data.data.map((attraction) => ({
        uuid: attraction.uuid,
        name: attraction.name,
        description: attraction.description,
        imageUuid: attraction.images[0]?.uuid,
        // imageURL: response.data.data[0].images[0].url,
      }));

      setAllAttractions(formattedAttractions);
    } catch (error) {
      console.error(`Error fetching all attractions:`, error);
    }
  };

  const fetchAttractions = async (type) => {
    try {
      const apiUrl = `https://api.stb.gov.sg/content/attractions/v2/search?searchType=keyword&searchValues=${type}`;
      const headers = {
        Accept: "application/json",
        "X-API-Key": process.env.REACT_APP_API_KEY,
      };

      const response = await axios.get(apiUrl, { headers });

      const formattedAttractions = response.data.data.map((attraction) => ({
        uuid: attraction.uuid,
        name: attraction.name,
        description: attraction.description,
        imageUuid: attraction.images[0]?.uuid,
        imageURL: response.data.data[0].images[0].url,
      }));

      setAttractions(formattedAttractions);
    } catch (error) {
      console.error(`Error fetching attractions for ${type}:`, error);
    }
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    fetchAttractions(type);
    setActiveType(type);
  };

  const handleSaveAttraction = (id, name) => {
    setSavedAttractions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setFavHandler(id, name);
  };

  const isAttractionSaved = (id) => {
    return savedAttractions[id];
  };

  function truncateWords(text, maxWords) {
    const words = text.split(" ");
    const truncatedWords = words.slice(0, maxWords);
    const truncatedText = truncatedWords.join(" ");

    // Add ellipsis if the original text has more words than the max
    return words.length > maxWords ? truncatedText + "..." : truncatedText;
  }

  return (
    <div className={styles.attractionListing}>
      <section className={styles.heroSection}>
        <div className="hide-desktop show-mobile">
          <img src={hero} alt="picture of a family showing marina bay sands" />
        </div>
        <div className="overlay hide-mobile show-desktop"></div>
        <div className={styles.content}>
          <hr />
          <h1>
            Discover Comfort, Embrace Adventure with
            <span className="highlighted-orange"> SingaStays</span>.
          </h1>
          <p className="big">
            Embark on a joyful stay in Singapore with SingaStays! Explore
            tailored attractions for a perfect blend of comfort and adventure.
            Your unforgettable experience begins here.
          </p>
        </div>
      </section>
      <section className={`${styles.section} ${styles.exploreContainer}`}>
        <div className={styles.exploreIntro}>
          <div className={styles.exploreText}>
            <h2>
              <span className="highlighted-orange">Explore </span>
              Attractions <br />
              in Singapore
            </h2>
            <p>
              Discover the perfect stay that suits your preferences. Click on
              the tags below to explore attractions tailored to your needs.
            </p>
          </div>
          <ul className={styles.tagContainer}>
            {attractionTypes.map((type, index) => (
              <li
                key={index}
                onClick={() => handleTypeClick(type)}
                className={`clickable ${
                  type === activeType ? styles.active : ""
                }`}
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
        {selectedType && (
          <div className="text-center">
            {/* <h2>Attractions for {selectedType}</h2> */}
            <ul className={`${styles.lisContent} container`}>
              {attractions.map((attraction, index) => (
                <li key={index}>
                  {/* {console.log("attractions:" + attraction)} */}
                  <div
                    className={`relative hover-con ${styles.exploreIndividualContent}`}
                  >
                    {/* {attraction.imageUUID ? ( */}
                    {attraction.imageUuid && attraction.imageUuid.length > 0 ? (
                      <Link
                        to={`/attraction/${attraction.uuid}`}
                        className={`${styles.detailsHero} relative main-hover`}
                        style={{
                          backgroundImage: attraction.imageUuid
                            ? `url(https://tih.stb.gov.sg/bin/GetMediaByUuid?uuid=${attraction.imageUuid}&mediaType=image)`
                            : `url(${attraction.imageURL})`,
                        }}
                      ></Link>
                    ) : (
                      <Link
                        to={`/attraction/${attraction.uuid}`}
                        className={`${styles.detailsHero} relative main-hover`}
                        style={{
                          backgroundImage: `url(${placeholder})`,
                        }}
                      ></Link>
                    )}

                    <div className="star-button">
                      <button
                        onClick={() =>
                          handleSaveAttraction(attraction.uuid, attraction.name)
                        }
                        className={` ${
                          isAttractionSaved(attraction.uuid) ? "saved" : ""
                        }`}
                      >
                        <Star />
                      </button>
                    </div>
                  </div>
                  <div className={`${styles.exploreContent} text-left`}>
                    <h4>
                      <Link to={`/attraction/${attraction.uuid}`}>
                        {attraction.name}
                      </Link>
                    </h4>
                    <p>{truncateWords(attraction.description, 20)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!selectedType && (
          <div className="text-center">
            {/* <h2>Attractions for {selectedType}</h2> */}
            <ul className={`${styles.lisContent} container`}>
              {allAttractions.map((attraction, index) => (
                <li key={index}>
                  {/* {console.log("attractions:" + attraction)} */}
                  <div
                    className={`relative hover-con ${styles.exploreIndividualContent}`}
                  >
                    {/* {console.log("attractions:", attraction.imageUuid)} */}

                    {attraction.imageUuid && attraction.imageUuid.length > 0 ? (
                      <Link
                        to={`/attraction/${attraction.uuid}`}
                        className={`${styles.detailsHero} relative main-hover`}
                        style={{
                          backgroundImage: attraction.imageUuid
                            ? `url(https://tih.stb.gov.sg/bin/GetMediaByUuid?uuid=${attraction.imageUuid}&mediaType=image)`
                            : `url(${attraction.imageURL})`,
                        }}
                      ></Link>
                    ) : (
                      <Link
                        to={`/attraction/${attraction.uuid}`}
                        className={`${styles.detailsHero} relative main-hover`}
                        style={{
                          backgroundImage: `url(${placeholder})`,
                        }}
                      ></Link>
                    )}

                    <div className="star-button">
                      <button
                        onClick={() =>
                          handleSaveAttraction(attraction.uuid, attraction.name)
                        }
                        className={` ${
                          isAttractionSaved(attraction.uuid) ? "saved" : ""
                        }`}
                      >
                        <Star />
                      </button>
                    </div>
                  </div>
                  <div className={`${styles.exploreContent} text-left`}>
                    <h4>
                      <Link to={`/attraction/${attraction.uuid}`}>
                        {attraction.name}
                      </Link>
                    </h4>
                    <p>{truncateWords(attraction.description, 20)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default AttractionListing;
