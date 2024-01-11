import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AttractionDetail from "./Components/AttractionDetail";
import { ReactComponent as HeaderLogo } from "./assets/header-logo.svg";
import { ReactComponent as FooterLogo } from "./assets/footer-logo.svg";
import { ReactComponent as Arrow } from "./assets/arrow.svg";
import { ReactComponent as Facebook } from "./assets/facebook-social.svg";
import { ReactComponent as Twitter } from "./assets/twitter-social.svg";
import { ReactComponent as Instagram } from "./assets/instagram-social.svg";

function App() {
  const [attractionTypes, setAttractionTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [savedAttractions, setSavedAttractions] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <>
      <header>
        <nav>
          <div className="nav-left">
            <div className="logo">
              <a href="#">
                <HeaderLogo />
              </a>
            </div>
            <ul className="nav-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Accomodations</a>
              </li>
              {isLoggedIn && (
                <li>
                  <a href="#">Profile</a>
                </li>
              )}
            </ul>
          </div>
          <div className="nav-right">
            <div>
              <button onClick={handlerLogIn} className="button-secondary">
                {isLoggedIn ? "Log Out" : "Log In"}
                <span>
                  <Arrow />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="content">
          <hr />
          <h1>
            Discover Comfort, Embrace Adventure with
            <span className="highlighted-orange"> SingaStays</span>.
          </h1>
          <p className="big">
            Embark on a joyful stay in Singapore with SingaStays! Explore
            tailored accommodations for a perfect blend of comfort and
            adventure. Your unforgettable experience begins here.
          </p>
          <div>
            <a className="button-primary" href="#">
              Explore Singapore
              <span>
                <Arrow />
              </span>
            </a>
          </div>
        </div>
      </section>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
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
                          <h3>
                            <Link to={`/attraction/${attraction.uuid}`}>
                              {attraction.name}
                            </Link>
                            <button
                              onClick={() =>
                                handleSaveAttraction(attraction.uuid)
                              }
                              className={`star-button ${
                                isAttractionSaved(attraction.uuid)
                                  ? "saved"
                                  : ""
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
      <footer>
        <div>
          <FooterLogo />
        </div>
        <div className="footer-content">
          <div className="footer-tagline">
            <p className="small">
              Discover Comfort, Embrace Adventure – Your Joyful Stay in
              Singapore Begins with SingaStays
            </p>
          </div>
          <div>
            <ul className="nav-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Accomodations</a>
              </li>
              <li>
                <button onClick={handlerLogIn} className="link">
                  {isLoggedIn ? "Log Out" : "Log In"}
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright-content">
          <p className="small">Copyright ©2023</p>
          <div className="socials">
            <div>
              <a href="#">
                <Facebook />
              </a>
            </div>
            <div>
              <a href="#">
                <Twitter />
              </a>
            </div>
            <div>
              <a href="#">
                <Instagram />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
