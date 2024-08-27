import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/Home/INTRO CARD_1.svg';
import img2 from '../assets/Home/INTRO CARD_1.svg';
import img3 from '../assets/Home/INTRO CARD_1.svg';
import '../style/Home.css';
function Home() {

    return (
        <Carousel>
            <Carousel.Item>
                <div class="text-center">
                    <img src={img1} className="HomeIntroCard" />
                </div>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div class="text-center">
                    <img src={img2} className="HomeIntroCard" />
                </div>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div class="text-center">
                    <img src={img3} className="HomeIntroCard" />
                </div>
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Home;
