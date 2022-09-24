import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
      {/* App is now our children to access the States of the application anywhere for AuthContext Api */}
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
