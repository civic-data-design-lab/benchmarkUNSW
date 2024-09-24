import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./style/App.css";
import NavBar from "./component/NavBar";
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
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exploredata" element={<ExploreData />} />
          <Route path="/about" element={<About />} />
          <Route path="/findings" element={<Findings />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
