import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AttractionDetail from "./Components/AttractionDetail";
import AttractionListing from "./Components/AttractionListing";
import HomePage from "./Components/HomePage";
import { ReactComponent as HeaderLogo } from "./assets/header-logo.svg";
import { ReactComponent as FooterLogo } from "./assets/footer-logo.svg";
import { ReactComponent as Arrow } from "./assets/arrow.svg";
import { ReactComponent as Facebook } from "./assets/facebook-social.svg";
import { ReactComponent as Twitter } from "./assets/twitter-social.svg";
import { ReactComponent as Instagram } from "./assets/instagram-social.svg";
import { UserContext } from "./context/UserContextProvider";
import Profile from "./Components/Profile";

function App() {
  const [attractionTypes, setAttractionTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [attractions, setAttractions] = useState([]);
  const [savedAttractions, setSavedAttractions] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { setNameHandler } = useContext(UserContext);

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
  };

  const handleSaveAttraction = (name) => {
    setNameHandler(name);
  };

  const isAttractionSaved = (id) => {
    return savedAttractions[id];
  };

  return (
    <>
      <Router>
        <header>
          <nav>
            <div className="nav-left">
              <div className="logo">
                <Link to="/">
                  <HeaderLogo />
                </Link>
              </div>
              <ul className="nav-links">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/attractions">Attractions</Link>
                </li>
                {isLoggedIn && (
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                )}
                <li className="hide-desktop show-mobile">
                  <Link onClick={handlerLogIn}>
                    {isLoggedIn ? "Log Out" : "Log In"}
                  </Link>
                </li>
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

        <Routes>
          {isLoggedIn && <Route path="profile" element={<Profile />} />}
          <Route path="/" element={<HomePage />} />
          <Route path="/attractions" element={<AttractionListing />} />
          <Route
            path="/attraction/:id"
            element={
              <AttractionDetail
                handleSaveAttraction={handleSaveAttraction}
                isAttractionSaved={isAttractionSaved}
              />
            }
          />
          <Route path="*" element={<HomePage />} />
        </Routes>

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
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/attractions">Attractions</Link>
                </li>
                {isLoggedIn && (
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                )}
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
      </Router>
    </>
  );
}

export default App;
