import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AttractionDetail from "./Components/AttractionDetail";

function App() {
  const [attractionTypes, setAttractionTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [savedAttractions, setSavedAttractions] = useState({});

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

  const fetchAttractions = async (type) => {
    try {
      const apiUrl = `https://api.stb.gov.sg/content/attractions/v2/search?searchType=keyword&searchValues=${type}`;
      const headers = {
        Accept: "application/json",
        "X-API-Key": "nE2LLxGGycJ7Egvtg2xXJZOpXNOVbKFW", // Your API key
      };

      const response = await axios.get(apiUrl, { headers });
      setAttractions(response.data.data);
    } catch (error) {
      console.error(`Error fetching attractions for ${type}:`, error);
    }
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    fetchAttractions(type);
  };

  const handleSaveAttraction = (id) => {
    setSavedAttractions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAttractionSaved = (id) => {
    return savedAttractions[id];
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
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
                        <h3>
                          <Link to={`/attraction/${attraction.uuid}`}>
                            {attraction.name}
                          </Link>
                          <button
                            onClick={() =>
                              handleSaveAttraction(attraction.uuid)
                            }
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
          }
        />
        <Route
          path="/attraction/:id"
          element={
            <AttractionDetail
              handleSaveAttraction={handleSaveAttraction}
              isAttractionSaved={isAttractionSaved}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
