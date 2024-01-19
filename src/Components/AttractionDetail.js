import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import styles from "./AttractionDetail.module.css";
import { ReactComponent as Star } from "../assets/star.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { UserContext } from "../context/UserContextProvider";

const initialAttractionState = {
  uuid: "",
  name: "",
  rating: "",
  imageUUID: "",
  description: "",
  tags: [],
  body: "",
  address: {},
  contact: "",
  officialEmail: "",
  officialWebsite: "",
};

function AttractionDetail() {
  const { savedAttractions, setSavedAttractions, setFavHandler } =
    useContext(UserContext);
  const [attraction, setAttraction] = useState(initialAttractionState);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchAttraction = async () => {
      setLoading(true);
      try {
        const apiUrl = `https://api.stb.gov.sg/content/attractions/v2/search?searchType=uuids&searchValues=${id}`;
        const headers = {
          Accept: "application/json",
          "X-API-Key": "3333nnLR8vJMmXyWgHreVCOXlAQqqswn", // Your API key
        };

        const response = await axios.get(apiUrl, { headers });
        setAttraction({
          uuid: id,
          name: response.data.data[0].name,
          rating: (response.data.data[0].rating / 5) * 100,
          imageUUID: response.data.data[0].images[0]?.uuid,
          // imageURL: response.data.data[0].images[0].url,
          description: response.data.data[0].description,
          tags: [...response.data.data[0].tags],
          body: response.data.data[0].body,
          address: response.data.data[0].address,
          contact: response.data.data[0].contact.primaryContactNo,
          officialEmail: response.data.data[0].officialEmail,
          officialWebsite:
            response.data.data[0].officialWebsite.search("http") > -1
              ? response.data.data[0].officialWebsite
              : "https://" + response.data.data[0].officialWebsite,
        });
      } catch (error) {
        console.error("Error fetching attraction details:", error);
      }
      setLoading(false);
    };

    fetchAttraction();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!attraction) {
    return <div>No attraction found</div>;
  }

  const parseAddress = () => {
    let address = {
      buildingName: "",
      streetName: "",
      floorNumber: "",
      unitNumber: "",
      unit: "",
      postalCode: "",
    };

    for (let part in address)
      if (attraction.address[part]) address[part] = attraction.address[part];

    if (address.floorNumber)
      address.unit = `#${address.floorNumber}-${address.unitNumber}`;

    if (address.postalCode)
      address.postalCode = `Singapore ${address.postalCode}`;

    for (let part in address) if (!address[part]) delete address[part];

    delete address.floorNumber;
    delete address.unitNumber;

    return Object.values(address);
  };

  const addressArray = parseAddress();

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

  return (
    <div className="">
      {attraction.imageUUID && (
        <div
          className={`${styles.detailsHero} relative`}
          style={{
            backgroundImage: attraction.imageUUID
              ? `url(https://tih.stb.gov.sg/bin/GetMediaByUuid?uuid=/${attraction.imageUUID}&mediaType=image)`
              : `url(${attraction.imageURL})`,
          }}
        >
          <div className="overlay"></div>
        </div>
      )}
      <div className={`${styles.detailContainer} container`}>
        <div className={styles.titleRow}>
          <h1 className={styles.name}>{attraction.name}</h1>
          <button
            onClick={() => handleSaveAttraction(id, attraction.name)}
            className={`star-button ${isAttractionSaved(id) ? "saved" : ""}`}
            style={{ borderRadius: "10px" }}
          >
            <Star />
          </button>
        </div>
        <div className="rating">
          <div className={styles.starOuter}>
            <div
              className={styles.starInner}
              style={{ width: `${attraction.rating}%` }}
            ></div>
          </div>
        </div>
        <p>{attraction.description}</p>
        <ul className={styles.tags}>
          {attraction.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <p>{parse(attraction.body)}</p>
        <h2 style={{ marginTop: "30px" }}>
          More <span className="highlighted-orange">Information</span>
        </h2>
        <table className={styles.infoTable}>
          <tbody>
            <tr>
              <th>Location</th>
              <td>
                {addressArray.map((line) => (
                  <div>{line}</div>
                ))}
              </td>
            </tr>
            <tr>
              <th>Contact</th>
              <td>{attraction.contact}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{attraction.officialEmail}</td>
            </tr>
          </tbody>
        </table>
        <a
          href={attraction.officialWebsite}
          className="button-primary"
          style={{ width: "fit-content", margin: "35px 0px" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit Website
          <span>
            <Arrow />
          </span>
        </a>
      </div>
    </div>
  );
}

export default AttractionDetail;
