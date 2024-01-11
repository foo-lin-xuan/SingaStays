import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

const initialAttractionState = {
  uuid: "",
  name: "",
  imageUUID: "",
  description: "",
  tags: [],
  body: "",
  address: {},
  contact: "",
  officialEmail: "",
  officialWebsite: "",
};

function AttractionDetail({ handleSaveAttraction, isAttractionSaved }) {
  const [attraction, setAttraction] = useState(initialAttractionState);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchAttraction = async () => {
      console.log(id);
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
          imageUUID: response.data.data[0].images[0].uuid,
          description: response.data.data[0].description,
          tags: [...response.data.data[0].tags],
          body: response.data.data[0].body,
          address: response.data.data[0].address,
          contact: response.data.data[0].contact.primaryContactNo,
          officialEmail: response.data.data[0].officialEmail,
          officialWebsite: response.data.data[0].officialWebsite,
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

  return (
    <div className="container">
      <h1>{attraction.name}</h1>
      <button onClick={() => handleSaveAttraction(id)}>
        {isAttractionSaved(id) ? "➖" : "➕"}
      </button>
      <p>{attraction.description}</p>
      <h2>tags: </h2>
      <ul>
        {attraction.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      {parse(attraction.body)}
      <h2>Location</h2>
      <b>{attraction.name}</b> <br />
      {attraction.address.buildingName} <br />
      {attraction.address.streetName} <br />#{attraction.address.floorNumber}-
      {attraction.address.unitNumber} <br />
      Singapore {attraction.address.postalCode} <br />
      <h2>Contact Info</h2>
      <div>{attraction.contact}</div>
      <div>{attraction.officialWebsite}</div>
      <div>{attraction.officialEmail}</div>
    </div>
  );
}

export default AttractionDetail;
