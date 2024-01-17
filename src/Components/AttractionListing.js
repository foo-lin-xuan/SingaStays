import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContextProvider";
import Display from "./Display";

function AttractionListing() {
  const [attractionTypes, setAttractionTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [attractions, setAttractions] = useState([]);
  //const [savedAttractions, setSavedAttractions] = useState({});
  const [allttractions, setAllAttractions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //const { savedAttractions, setSavedAttractions, setNameHandler } = useContext(UserContext);

  const { savedAttractions, setSavedAttractions, setNameHandler } = useContext(UserContext);

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
        "X-API-Key": "nE2LLxGGycJ7Egvtg2xXJZOpXNOVbKFW", // Your API key
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

  const fetchAllAttractions = async (type) => {
    try {
      const apiUrl = `https://api.stb.gov.sg/content/attractions/v2/search?searchType=keyword&searchValues=attractions`;
      const headers = {
        Accept: "application/json",
        "X-API-Key": "nE2LLxGGycJ7Egvtg2xXJZOpXNOVbKFW", // Your API key
      };

      const response = await axios.get(apiUrl, { headers });

      const formattedAttractions = response.data.data.map((attraction) => ({
        uuid: attraction.uuid,
        name: attraction.name,
        description: attraction.description,
        imageUuid: attraction.images[0]?.uuid,
        imageURL: response.data.data[0].images[0].url,
      }));

      setAllAttractions(formattedAttractions);
    } catch (error) {
      console.error(`Error fetching attractions for ${type}:`, error);
    }
  };

  const fetchAttractions = async (type) => {
    try {
      const apiUrl = `https://api.stb.gov.sg/content/attractions/v2/search?searchType=keyword&searchValues=${type}`;
      const headers = {
        Accept: "application/json",
        "X-API-Key": "nE2LLxGGycJ7Egvtg2xXJZOpXNOVbKFW", // Your API key
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
  };

  const handleSaveAttraction = (id , name) => {
    setSavedAttractions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setNameHandler(name);
  };

  const isAttractionSaved = (id) => {
    return savedAttractions[id];
  };

  return (
    <div className="container">
      <h1>Attraction Types</h1>
      <ul>
        {attractionTypes.map((type, index) => (
          <li
            key={index}
            onClick={() => handleTypeClick(type)}
            className="clickable"
          >
            {type}
          </li>
        ))}
      </ul>
      {selectedType && (
        <div>
          <h2>Attractions for {selectedType}</h2>
          <ul>
            {attractions.map((attraction, index) => (
              <li key={index}>
                {console.log("attractions:" + attraction)}
                <div
                  className="details-hero relative"
                  style={{
                    backgroundImage: attraction.imageUuid
                      ? `url(https://tih.stb.gov.sg/bin/GetMediaByUuid?uuid=${attraction.imageUuid}&fileType=Medium%2520Thumbnail&mediaType=image)`
                      : `url(${attraction.imageURL})`,
                  }}
                ></div>
                <h3>
                  <Link to={`/attraction/${attraction.uuid}`}>
                    {attraction.name}
                  </Link>
                  <button
                    onClick={() => handleSaveAttraction(attraction.uuid, attraction.name)}
                    className={`star-button ${
                      isAttractionSaved(attraction.uuid) ? "saved" : ""
                    }`}
                  >
                    ⭐
                  </button>
                </h3>
                <p>{attraction.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!selectedType && (
        <div>
          <h2>Attractions for {selectedType}</h2>
          <ul>
            {allttractions.map((attraction, index) => (
              <li key={index}>
                {console.log("attractions:" + attraction)}
                <div
                  className="details-hero relative"
                  style={{
                    backgroundImage: attraction.imageUuid
                      ? `url(https://tih.stb.gov.sg/bin/GetMediaByUuid?uuid=${attraction.imageUuid}&fileType=Medium%2520Thumbnail&mediaType=image)`
                      : `url(${attraction.imageURL})`,
                  }}
                ></div>
                <h3>
                  <Link to={`/attraction/${attraction.uuid}`}>
                    {attraction.name}
                  </Link>
                  <button
                    onClick={() => handleSaveAttraction(attraction.name)}
                    className={`star-button ${
                      isAttractionSaved(attraction.uuid) ? "saved" : ""
                    }`}
                  >
                    ⭐
                  </button>
                </h3>
                <p>{attraction.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AttractionListing;
