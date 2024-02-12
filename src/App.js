// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

const App = () => {
  console.log({ version: "0.0.1" });
  return (
    <Router>
      <div className="App">
        <PublicRoutes />
        <ProtectedRoutes />
      </div>
    </Router>
  );
};

export default App;
