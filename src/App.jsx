import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style/App.css";
import NavBar from "./component/Navbar";
import Footer from "./component/Footer";
import Home from "./js/Home";
import ExploreData from "./js/ExploreData";
import SurveyData from "./js/SurveyData";
import About from "./js/About";
import Findings from "./js/Findings";

function App() {
  return (
    <>
      <Router>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // backgroundColor: "#FFEFF3",
            backgroundColor: "#FF2551",
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
      </Router>
    </>
  );
}

export default App;
