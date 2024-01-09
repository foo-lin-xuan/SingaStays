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
        <pre>{JSON.stringify(stbData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
