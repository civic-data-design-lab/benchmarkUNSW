import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Carousel from "react-bootstrap/Carousel";

import img1 from "../assets/Home/INTRO CARD_1_updated.svg";
import img2 from "../assets/Home/INTRO CARD_2_updated.svg";
import img3 from "../assets/Home/INTRO CARD_3_updated.svg";
import "../style/Home.css";
import "../style/Main.css";
import "../style/Font.css";

function Home() {
  const [pauseCarousel, setPauseCarousel] = useState(false); // Track if the carousel should pause
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current active slide
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSlide = (selectedIndex, direction) => {
    setCurrentIndex(selectedIndex); // Update the current index

    if (selectedIndex === 2 && direction === "next") {
      // When the user reaches the last slide
      setPauseCarousel(true); // Pause carousel on last slide
    } else {
      setPauseCarousel(false); // Resume automatic sliding for other slides
    }
  };

  const handleNextClick = () => {
    if (currentIndex === 2) {
      // If the user is on the last slide and clicks next
      navigate("/aidata"); // Navigate to /aidata
    }
  };

  return (
    <div className="HomeCarousel">
      <Carousel
        activeIndex={currentIndex}
        onSelect={(selectedIndex, event) =>
          handleSlide(selectedIndex, event?.direction)
        }
        interval={pauseCarousel ? null : 3000} // Set interval to null when the last slide is active
        nextIcon={
          <span
            className="carousel-control-next-icon"
            onClick={handleNextClick} // Handle the "next" button click
            role="button"
            aria-hidden="true"
          />
        }
      >
        <Carousel.Item>
          <div className="carousel-item-container">
            <img src={img1} className="HomeIntroCard" alt="Intro Card 1" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-container">
            <img src={img2} className="HomeIntroCard" alt="Intro Card 2" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-container">
            <img src={img3} className="HomeIntroCard" alt="Intro Card 3" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
