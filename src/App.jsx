import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './style/App.css'
import NavBar from './component/NavBar';
import Home from './js/Home';
import AiData from './js/AiData';
import SurveyData from './js/SurveyData';
import About from './js/About';
import Downloads from './js/Downloads';

function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/aidata" element={<AiData />} />
                    <Route path="/surveydata" element={<SurveyData />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/downloads" element={<Downloads />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
