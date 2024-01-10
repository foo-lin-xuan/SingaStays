import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(
          "https://api.stb.gov.sg/content/attractions/v2/search?searchType=keyword&searchValues=Adventure",
          {
            headers: {
              Accept: "application/json",
              "X-API-Key": "nE2LLxGGycJ7Egvtg2xXJZOpXNOVbKFW", // Replace with your actual API key
            },
          }
        );
        setAttractions(response.data.data); // Update with the actual path to your data in the API response
      } catch (error) {
        console.error("Error fetching attractions:", error);
      }
    };

    fetchAttractions();
  }, []);

  return (
    <div>
      <h1>Attractions</h1>
      <ul>
        {attractions.map((attraction, index) => (
          <li key={index}>
            <Link to={`/attraction/${attraction.uuid}`}>{attraction.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
