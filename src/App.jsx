import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./style/App.css";
import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./js/Home";
import ExploreData from "./js/ExploreData";
import About from "./js/About";
import Findings from "./js/Findings";

import React, { useEffect } from "react";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-XWRNLMFGEM"; // Replace with your Google Analytics ID
ReactGA.initialize(TRACKING_ID);

function App() {
  const location = useLocation();

  useEffect(() => {
    // Send page view to Google Analytics when the location changes
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#FF2551", // Or your preferred color
      }}
    >
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exploredata" element={<ExploreData />} />
          <Route path="/about" element={<About />} />
          <Route path="/findings" element={<Findings />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
