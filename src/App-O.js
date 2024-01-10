import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [stbData, setStbData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl =
          "https://api.stb.gov.sg/content/common/v2/search?dataset=accommodation";
        const headers = {
          Accept: "application/json",
          "X-Content-Language": "en",
          "X-API-Key": "2kuwN1gRBqECMuYTdxguaLry1U2QqH2R",
        };

        const response = await axios.get(apiUrl, { headers });
        setStbData(response.data);
      } catch (error) {
        console.error("Error fetching cruise data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Cruise Data</h1>
      {stbData ? (
        <div>
          {stbData.data.map((cruise) => (
            <CruiseItem key={cruise.uuid} cruise={cruise} />
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const CruiseItem = ({ cruise }) => {
  return (
    <div className="cruise-item">
      <h2>{cruise.name}</h2>
      <p>Type: {cruise.type}</p>
      <p>Description: {cruise.description}</p>
      <p>Rating: {cruise.rating}</p>
      {/* More details can be added here */}
    </div>
  );
};

export default App;
