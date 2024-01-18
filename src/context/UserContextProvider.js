// UserContext.js

import React, { createContext, useState } from "react";

export const UserContext = createContext({
  names: [],
  setNameHandler: () => {},
  savedAttractions: {},
  setSavedAttractions: () => {},
});

export function UserContextProvider({ children }) {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [names, setName] = useState([]);
  const [savedAttractions, setSavedAttractions] = useState({});
  // const [savedAttractions, setSavedAttractions] = useState([]);

  //const toggleLogin = () => {
  //   setIsLoggedIn((prev) => !prev);
  // };

  // const setNameHandler = (name) => {
  //   console.log("Saving attraction:", name);
  //   setName((prev) => {
  //     return [...prev, name];
  //   }); 
  // };

  const setNameHandler = (name) => {
    setName((prevNames) => {
      // Check if the name is already in the list
      const nameIndex = prevNames.indexOf(name);

      if (nameIndex !== -1) {
        // If the name is already in the list, remove it
        console.log("Removing " + name);
        return [...prevNames.slice(0, nameIndex), ...prevNames.slice(nameIndex + 1)];
      } else {
        // If the name is not in the list, add it
        console.log("Adding " + name);
        setSavedAttractions((prev) => {
          return { ...prev, [name]: !prev[name] };
        });
        return [...prevNames, name];
      }
    });
  };

  const context = {
    names: names,
    setNameHandler: setNameHandler,
    savedAttractions: savedAttractions,
    setSavedAttractions: setSavedAttractions,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
