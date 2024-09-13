import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../assets/Home/INTRO CARD_1_updated.svg";
import img2 from "../assets/Home/INTRO CARD_2_updated.svg";
import img3 from "../assets/Home/INTRO CARD_3_updated.svg";
import "../style/Home.css";
import "../style/Main.css";

function Home() {
  return (
    <div className="HomeCarousel">
      <Carousel>
        <Carousel.Item>
          <div class="text-center">
            <img src={img1} className="HomeIntroCard" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="text-center">
            <img src={img2} className="HomeIntroCard" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div class="text-center">
            <img src={img3} className="HomeIntroCard" />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
