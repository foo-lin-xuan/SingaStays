import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./Components/UserContextProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </StrictMode>
);
