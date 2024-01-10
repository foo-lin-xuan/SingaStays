import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AttractionDetail() {
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchAttraction = async () => {
      setLoading(true);
      try {
        const apiUrl = `https://api.stb.gov.sg/content/attractions/v2/search?searchType=keyword&searchValues=${id}`;
        const response = await axios.get(apiUrl);
        setAttraction(response.data);
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
    <div>
      <h1>{attraction.name}</h1>
      <p>{attraction.description}</p>
    </div>
  );
}

export default AttractionDetail;
