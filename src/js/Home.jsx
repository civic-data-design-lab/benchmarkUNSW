import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { TypeAnimation } from "react-type-animation";
import { debounce } from "lodash";

import img1 from "../assets/Home/INTRO CARD_1_updated.svg";
import img2 from "../assets/Home/INTRO CARD_2_updated.svg";
import img3 from "../assets/Home/INTRO CARD_3_updated.svg";
import logo from "../assets/Home/logo.gif";
import img4 from "../assets/Home/INTRO CARD_EXPLANATION_1.svg";
import img5 from "../assets/Home/INTRO CARD_EXPLANATION_2.svg";
import img6 from "../assets/Home/INTRO CARD_4.svg";

import "../style/Home.css";
import "../style/Main.css";
import "../style/Font.css";

function Home() {
  const [pauseCarousel, setPauseCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleSlide = async (selectedIndex, direction) => {
    if (currentIndex === 6 && direction === "next") {
      await navigate("/exploredata");
      return;
    }
    if (selectedIndex === 0 && direction === "next") {
      handleNextClick();
      return;
    }
    setCurrentIndex(selectedIndex);

    if (selectedIndex === 6 && direction === "next") {
      setPauseCarousel(true);
    } else {
      setPauseCarousel(false);
    }
  };

  const handleNextClick = useCallback(
    debounce(() => {
      handleSlide(currentIndex + 1, "next");
    }, 300),
    [currentIndex]
  );

  useEffect(() => {
    console.log("currentIndex", currentIndex);
  }, [currentIndex]);

  return (
    <div className="HomeCarousel">
      {currentIndex === 0 && (
        <div className="text-container">
          <TypeAnimation
            sequence={[
              `Benchmark NSW is an experimental project that uses street
furniture to measure the dynamics of public space`,
              1000,
              `Benchmark NSW is an experimental project that uses street
furniture to measure the dynamics of public space`,
            ]}
            wrapper="p"
            className="overlay-text nova-mono-regular"
            cursor={true}
            repeat={0}
          />
        </div>
      )}
      {currentIndex === 1 && (
        <div className="text-container">
          <TypeAnimation
            sequence={[
              `To understand how UNSW students, particularly women, girls and gender diverse people, interact with and move seating in public space`,
              1000,
              `To understand how UNSW students, particularly women, girls and gender diverse people, interact with and move seating in public space`,
            ]}
            wrapper="p"
            className="overlay-text nova-mono-regular"
            cursor={true}
            repeat={0}
          />
        </div>
      )}
      {currentIndex === 2 && (
        <div className="text-container">
          <TypeAnimation
            sequence={[
              `By intergrating co-design, sensor kit development, and data-driven analysis to evaluate the impact of a temporary activation on an open space on the UNSW Campus`,
              1000,
              `By intergrating co-design, sensor kit development, and data-driven analysis to evaluate the impact of a temporary activation on an open space on the UNSW Campus`,
            ]}
            wrapper="p"
            className="overlay-text nova-mono-regular"
            cursor={true}
            repeat={0}
          />
        </div>
      )}
      {currentIndex === 3 && (
        <div className="text-container">
          <div className="text-container">
            <TypeAnimation
              sequence={[
                `Based on the survey, 85% of women and girls surveryed said that the seating helped facilitate social activities`,
                1000,
                `Based on the survey, 85% of women and girls surveryed said that the seating helped facilitate social activities`,
              ]}
              wrapper="p"
              className="overlay-text nova-mono-regular"
              cursor={true}
              repeat={0}
            />
          </div>
        </div>
      )}
      {currentIndex === 4 && (
        <div className="text-container">
          <div className="text-container">
            <TypeAnimation
              sequence={[
                `Also, 73% of women respondents said that the seating made them feel more comfortable`,
                1000,
                `Also, 73% of women respondents said that the seating made them feel more comfortable`,
              ]}
              wrapper="p"
              className="overlay-text nova-mono-regular"
              cursor={true}
              repeat={0}
            />
          </div>
        </div>
      )}
      {currentIndex === 5 && (
        <div className="text-container">
          <div className="text-container">
            <TypeAnimation
              sequence={[
                `Based on the observations conducted by the team, the number of women and girls staying on site increased by 700%, from 0.1 to 0.8 per observation.`,
                1000,
                `Based on the observations conducted by the team, the number of women and girls staying on site increased by 700%, from 0.1 to 0.8 per observation.`,
              ]}
              wrapper="p"
              className="overlay-text nova-mono-regular"
              cursor={true}
              repeat={0}
            />
          </div>
        </div>
      )}
      {currentIndex === 6 && (
        <div className="text-container">
          <div className="text-container">
            <TypeAnimation
              sequence={[
                `Also, through vision ai, we found that people staying on site per day increased by 420% from 4.43 to 22.2 people per day. Click next to explore our data`,
                1000,
                `Also, through vision ai, we found that people staying on site per day increased by 420% from 4.43 to 22.2 people per day. Click next to explore our data`,
              ]}
              wrapper="p"
              className="overlay-text nova-mono-regular"
              cursor={true}
              repeat={0}
            />
          </div>
        </div>
      )}
      <Carousel
        activeIndex={currentIndex}
        onSelect={(selectedIndex, event) =>
          handleSlide(selectedIndex, event?.direction)
        }
        interval={pauseCarousel ? null : null}
        nextIcon={
          <span
            className="carousel-control-next-icon"
            onClick={handleNextClick}
            role="button"
            aria-hidden="true"
          />
        }
      >
        <Carousel.Item>
          <div className="carousel-item-container">
            <div>
              <img
                src={logo}
                className="HomeIntroCard"
                alt="Intro Card 1"
                style={{ borderRadius: "20px", border: "3px solid #FFDAE2" }}
              />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-container">
            <div>
              <img src={img4} className="HomeIntroCard" alt="Intro Card 1" />
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item-container">
            <img src={img5} className="HomeIntroCard" alt="Intro Card 1" />
          </div>
        </Carousel.Item>
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
        <Carousel.Item>
          <div className="carousel-item-container">
            <img src={img6} className="HomeIntroCard" alt="Intro Card 3" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
