import React, { useState } from "react";
import "../style/Font.css";
import "../style/About.css";
import "../style/Main.css";
import deIDvideoIcon from "../assets/Symbols/De-identified vedio.svg";
import personDetectionIcon from "../assets/Symbols/Person detection.svg";
import encryptedIcon from "../assets/Symbols/Encrypted.svg";
import accessIcon from "../assets/Symbols/Access.svg";
import aiIcon from "../assets/Symbols/Artificial Intelligent.svg";
import motionDetectionIcon from "../assets/Symbols/Motion detector.svg";
import planningIcon from "../assets/Symbols/Planning & Decision-making.svg";
import RandDIcon from "../assets/Symbols/Research & Development.svg";
import reviewedInternallyIcon from "../assets/Symbols/Reviewed internally.svg";
import cloudStorageIcon from "../assets/Symbols/CloudStorage.svg";

import Carousel from "react-bootstrap/Carousel";
import img1 from "../assets/About/colorized/1.jpg";
import img2 from "../assets/About/colorized/2.jpg";
import img3 from "../assets/About/colorized/3.jpg";
import img4 from "../assets/About/colorized/4.jpg";

import img5 from "../assets/About/colorized/a.jpg";
import img6 from "../assets/About/colorized/b.jpg";
import img7 from "../assets/About/colorized/c.jpg";
import img8 from "../assets/About/colorized/d.jpg";

import img9 from "../assets/About/colorized/5.jpg";
import img10 from "../assets/About/colorized/6.jpg";
import img11 from "../assets/About/colorized/7.jpg";
import img12 from "../assets/About/colorized/8.jpg";

function About() {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="about-page">
      {/*Section 1*/}
      <section
        id="project"
        className="nova-mono-regular"
        style={{ backgroundColor: "#FF2551", paddingTop: "7rem" }}
      >
        <div className="about-head">
          <p className="about-title bg-white">Project</p>
        </div>
        <div className="about-p ">
          <div className="AboutCarousel">
            <Carousel indicators={false} controls={false}>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img1} className="carousel-img" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img2} className="carousel-img" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img3} className="carousel-img" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img4} className="carousel-img" />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="custom-scrollbar">
            <p className="about-txt font-white">
              <strong>Benchmark NSW</strong> is a pilot project that uses
              temporary movable benches coupled with smart technology and data
              to better understand how women, girls and gender diverse people
              use public spaces. The project was delivered through a
              collaboration between the University of New South Wales (UNSW),
              Massachusetts Institute of Technology (MIT) and Smart Places,
              Transport for NSW.
            </p>
            <p className="about-txt font-white">
              <strong>The methodology</strong> for the Benchmark NSW project
              involved a multi-phase approach, integrating co-design, technology
              development, and data-driven analysis to evaluate the impact of a
              temporary activation on an open space on the UNSW Kensington
              Campus.
            </p>{" "}
          </div>
        </div>
      </section>

      {/*Section 2*/}
      <section
        id="technology"
        className="nova-mono-regular"
        style={{ backgroundColor: "#FFDAE2", paddingTop: "5rem" }}
      >
        <div className="about-head">
          <p className="about-title bg-red text-white">Technology</p>
        </div>
        <div className="about-p">
          <div className="AboutCarousel">
            <Carousel indicators={false} controls={false}>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img5} className="carousel-img" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img6} className="carousel-img" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img7} className="carousel-img" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img8} className="carousel-img" />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="custom-scrollbar">
            <p className="about-txt">
              <strong>Vision AI sensor kit</strong>, developed by MIT’s Norman
              B. Leventhal Center for Advanced Urbanism, captured real-time data
              on seating usage patterns, pedestrian behaviours, and bench
              location within the site area. Measurements focus on social
              interaction, pedestrian flows, and dwell time analysis to measure
              the impact of the benches and also can inform future urban
              designs.
            </p>
            <p className="about-txt">
              <strong>Data privacy</strong> is a critical aspect of the project,
              ensured by the AI’s design, which processes imagery without
              storing personal data. This real-time abstract processing balances
              the need for detailed usage data against privacy concerns. The
              project utilizes{" "}
              <a href="https://dtpr.io/">
                Digital Trust for Places & Routines (DTPR)
              </a>
              , an open-source communication standard that seeks to increase
              transparency and accountability for digital technology in public
              spaces.
            </p>
          </div>
        </div>
      </section>

      {/*Section 3*/}
      <section
        id="bench-design"
        className="nova-mono-regular bg-red"
        style={{ paddingTop: "5rem" }}
      >
        <div className="about-head">
          <p className="about-title bg-white">Design</p>
        </div>
        <div className="about-p">
          <div className="AboutCarousel">
            <Carousel indicators={false} controls={false}>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img9} className="carousel-img" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img10} className="carousel-img" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img11} className="carousel-img" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="image-container">
                  <img src={img12} className="carousel-img" />
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="custom-scrollbar">
            <p className="about-txt font-white">
              <strong>Co-design</strong> workshops engaging women Industrial
              Design students from UNSW, who contributed to the creation of
              modular seating units. These units were fabricated from 100%
              recycled HDPE plastic and featured motion-activated LED lighting
              to improve visibility and user comfort.
            </p>
          </div>
        </div>
      </section>

      {/*Section 5*/}
      <section id="dtpr" className="nova-mono-regular">
        <div className="medium-bg about-dtpr">
          <div className="about-head dark-bg">
            <p className="about-title" style={{ color: "white" }}>
              DTPR Benchmark NSW
            </p>
          </div>
          <p style={{ padding: "1rem 2rem 0rem 2rem", fontSize: "0.8rem" }}>
            Benchmark NSW utilises{" "}
            <a href="https://dtpr.io/">
              Digital Trust for Places & Routines (DTPR)
            </a>
            , an open-source communication standard that seeks to increase
            transparency and accountability for digital technology in public
            spaces.
          </p>

          <div className="about-p5">
            <p className="about-subtitle-2">What type of technology is this?</p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
              <p
                className="about-subtxt"
                onClick={() => toggleSection("deIDvideo")}
              >
                <img
                  src={deIDvideoIcon}
                  alt="Deidentified Video"
                  className="svg-icon2"
                />
                De-Identified Video
              </p>
              {openSections.deIDvideo && (
                <p className="about-desc about-dtpr-desc">
                  Collects video footage of a sufficient resolution where
                  individuals can be identified, for example by capturing images
                  of faces or unique numbers such as vehicle license plates.
                  However, the video is processed in a way that removes
                  identifying characteristics before it is used or stored (known
                  as de-identified before first use or de-identified on device),
                  for example by blurring faces using computer vision.
                </p>
              )}
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p
                className="about-subtxt"
                onClick={() => toggleSection("personDetection")}
              >
                <img
                  src={personDetectionIcon}
                  alt="Person Detection"
                  className="svg-icon2"
                />
                Person Detection
              </p>
              {openSections.personDetection && (
                <p className="about-desc about-dtpr-desc">
                  Refers to a system that can detect the presence of humans in
                  images or videos, and identify where they are located or how
                  many there are in an image, but does not identify individuals.
                  The technology does not retain or use any personally
                  identifiable information.
                </p>
              )}
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p
                className="about-subtxt"
                onClick={() => toggleSection("motionDetection")}
              >
                <img
                  src={motionDetectionIcon}
                  alt="Motion Detection"
                  className="svg-icon2"
                />
                Motion Detector
              </p>
              {openSections.motionDetection && (
                <p className="about-desc about-dtpr-desc">
                  Is a sensor that detects the movement of nearby objects. This
                  project uses motion detection only for lighting and does not
                  capture data.
                </p>
              )}
            </div>
          </div>
          <div className="about-p5">
            <p className="about-subtitle-2">
              What is the purpose of this technology?
            </p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
              <p
                className="about-subtxt"
                onClick={() => toggleSection("planning")}
              >
                <img src={planningIcon} alt="Planning" className="svg-icon2" />
                Planning & Decision-making
              </p>
              {openSections.planning && (
                <p className="about-desc about-dtpr-desc">
                  Supports the development of future plans; or to enable or
                  measure the impact of a decision. Examples include urban
                  planning.
                </p>
              )}
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p
                className="about-subtxt"
                onClick={() => toggleSection("research")}
              >
                <img src={RandDIcon} alt="R & D" className="svg-icon2" />
                Research & Development
              </p>
              {openSections.research && (
                <p className="about-desc about-dtpr-desc">
                  Supports exploratory research and testing.
                </p>
              )}
            </div>
          </div>
          <div className="about-p5">
            <p className="about-subtitle-2">How will this data be processed?</p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
              <p className="about-subtxt" onClick={() => toggleSection("ai")}>
                <img
                  src={aiIcon}
                  alt="Artificial Intelligence"
                  className="svg-icon2"
                />
                Artificial Intelligence
              </p>
              {openSections.ai && (
                <p className="about-desc about-dtpr-desc">
                  Data that is processed by artificial intelligence systems to
                  derive a new result or data point. Specifically, we use
                  computer vision, which refers to computer science
                  methodologies that enable computers to derive data from
                  digital images or video. We process our de-identified video
                  with the YOLOv8 algorithm.
                </p>
              )}
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p
                className="about-subtxt"
                onClick={() => toggleSection("reviewed")}
              >
                <img
                  src={reviewedInternallyIcon}
                  alt="Reviewed Internally"
                  className="svg-icon2"
                />
                Reviewed Internally
              </p>
              {openSections.reviewed && (
                <p className="about-desc about-dtpr-desc">
                  The NSW Government has review processes that consider the
                  potential benefits, risks and implications for privacy and
                  harm for new technologies or data collection activities. The
                  NSW Gov Artificial Intelligence Assurance Framework was
                  completed and the team constantly assesses the data for
                  accuracy and inconsistencies.
                </p>
              )}
            </div>
          </div>
          <div className="about-p5">
            <p className="about-subtitle-2">How is the data stored?</p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
              <p
                className="about-subtxt"
                onClick={() => toggleSection("cloudStorage")}
              >
                <img
                  src={cloudStorageIcon}
                  alt="Cloud Storage"
                  className="svg-icon2"
                />
                Cloud Storage
              </p>
              {openSections.cloudStorage && (
                <p className="about-desc about-dtpr-desc">
                  Anonymized data is stored on behalf of the organization or the
                  data collector in an off-site data centre.
                </p>
              )}
            </div>
            <hr className="about-hr"></hr>
            <div className="about-p7 about-dtpr-sub">
              <p
                className="about-subtxt"
                onClick={() => toggleSection("encrypted")}
              >
                <img
                  src={encryptedIcon}
                  alt="Encrypted"
                  className="svg-icon2"
                />
                Encrypted
              </p>
              {openSections.encrypted && (
                <p className="about-desc about-dtpr-desc">
                  Data has been encoded so that only authorized parties can
                  access it, which can reduce risk related to handling private
                  or sensitive information.
                </p>
              )}
            </div>
          </div>
          <div className="about-p5">
            <p className="about-subtitle-2">Who can access this data?</p>
          </div>
          <div className="about-p6 light-bg">
            <div className="about-p7 about-dtpr-sub">
              <p
                className="about-subtxt"
                onClick={() => toggleSection("access")}
              >
                <img src={accessIcon} alt="Data Access" className="svg-icon2" />
                Data
              </p>
              {openSections.access && (
                <p className="about-desc about-dtpr-desc">
                  Data is available to the accountable organisation - University
                  of NSW. It is also available to Transport for NSWs as well as
                  to the data collection technology vendors and partners - MIT
                  Leventhal Center for Advanced Urbanism and VivaCity.
                </p>
              )}
            </div>
          </div>
          <p
            style={{
              fontSize: "0.7rem",
              padding: "0rem 2rem 3rem 2rem",
              color: "ffdae2",
              textAlign: "center",
              margin: "0rem",
            }}
          >
            The DTPR Icons Design Guide and Taxonomy are licensed by the Digital
            Trust for Places & Routes contributors under Creative Common
            Attribution 4.0 International (CC BY 4.0). This DTPR Guide App is
            made by Helpful Places
          </p>
        </div>
      </section>

      {/*Section 4*/}
      <section
        id="team"
        className="nova-mono-regular bg-red"
        style={{ paddingTop: "5rem" }}
      >
        <div className="about-head">
          <p className="about-title bg-white">Team</p>
        </div>
        <div className="about-p">
          <p className="about-txt font-white">
            <strong>MIT</strong> <br></br> Sarah Williams, Minwook Kang, Hannah
            Shumway, Sebastian Ives, Maria Gabriela Carucci, Karen Kuo, Clay
            Anderson, Mercy Olagunju
          </p>
          <p className="about-txt font-white">
            <strong>UNSW</strong> <br></br> Gonzalo Portas, Mariano Ramirez
          </p>
          <p className="about-txt font-white">
            <strong>TfNSW</strong>
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
