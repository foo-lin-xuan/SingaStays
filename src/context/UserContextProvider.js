// UserContext.js

import React, { createContext, useState } from "react";

export const UserContext = createContext({
  fav: [],
  setFavHandler: () => {},
  savedAttractions: {},
  setSavedAttractions: () => {},
});

export function UserContextProvider({ children }) {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fav, setFav] = useState([]);
  const [savedAttractions, setSavedAttractions] = useState({});
  // const [savedAttractions, setSavedAttractions] = useState([]);

  //const toggleLogin = () => {
  //   setIsLoggedIn((prev) => !prev);
  // };

  // const setFavHandler = (name) => {
  //   console.log("Saving attraction:", name);
  //   setFav((prev) => {
  //     return [...prev, name];
  //   });
  // };

  const setFavHandler = (id, name) => {
    setFav((prevNames) => {
      // Check if the name is already in the list
      const attractionIndex = prevNames.findIndex(
        (attraction) => attraction.id === id
      );

      if (attractionIndex !== -1) {
        // If the name is already in the list, remove it
        console.log("Removing " + name);
        return [
          ...prevNames.slice(0, attractionIndex),
          ...prevNames.slice(attractionIndex + 1),
        ];
      } else {
        // If the name is not in the list, add it
        console.log("Adding " + name);
        setSavedAttractions((prev) => {
          return { ...prev, [name]: !prev[name] };
        });
        return [...prevNames, { id, name }];
      }
    });
  };

  const context = {
    fav: fav,
    setFavHandler: setFavHandler,
    savedAttractions: savedAttractions,
    setSavedAttractions: setSavedAttractions,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
