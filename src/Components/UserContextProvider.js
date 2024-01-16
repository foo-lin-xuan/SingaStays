// UserContext.js

import React, { createContext, useState } from "react";

export const UserContext = createContext({
    names: [],
    setNameHandler: () => {},
});

export function UserContextProvider({ children }) {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [names, setName] = useState([]);

  //const toggleLogin = () => {
 //   setIsLoggedIn((prev) => !prev);
 // };

  const setNameHandler = (name) => {
    console.log("Saving attraction:", name);
    setName((prev) => {
        return [...prev, name];
    });
  };

  const context = {
    names: names,
    setNameHandler: setNameHandler

  }

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}
