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

  function handleDeIDVideoClick() {
    setOpenSections((prev) => ({
      ...prev,
      deIDvideo: !prev.deIDvideo,
    }));
  }

  function handlePersonDetectionClick() {
    setOpenSections((prev) => ({
      ...prev,
      personDetection: !prev.personDetection,
    }));
  }

  function handleMotionDetectionClick() {
    setOpenSections((prev) => ({
      ...prev,
      motionDetection: !prev.motionDetection,
    }));
  }

  function handlePlanningClick() {
    setOpenSections((prev) => ({
      ...prev,
      planning: !prev.planning,
    }));
  }

  function handleResearchClick() {
    setOpenSections((prev) => ({
      ...prev,
      research: !prev.research,
    }));
  }

  function handleAIClick() {
    setOpenSections((prev) => ({
      ...prev,
      ai: !prev.ai,
    }));
  }

  function handleReviewedClick() {
    setOpenSections((prev) => ({
      ...prev,
      reviewed: !prev.reviewed,
    }));
  }

  function handleCloudStorageClick() {
    setOpenSections((prev) => ({
      ...prev,
      cloudStorage: !prev.cloudStorage,
    }));
  }

  function handleEncryptedClick() {
    setOpenSections((prev) => ({
      ...prev,
      encrypted: !prev.encrypted,
    }));
  }

  function handleAccessClick() {
    setOpenSections((prev) => ({
      ...prev,
      access: !prev.access,
    }));
  }

  return (
    <div className="about-page">
      {/*Section 1*/}
      <section
        id="project"
        className="nova-mono-regular"
        style={{
          backgroundColor: "#FB718D",
          paddingTop: "7rem",
          fontSize: "1.3rem",
        }}
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
              temporary seating, coupled with smart technology and data to
              better understand how UNSW students, particularly women, girls and
              gender diverse people, use public spaces.
            </p>
            <p className="about-txt font-white">
              The project employs a multi-phase methodology that combines
              co-design, technology development, and data-driven analysis. The
              project evaluated the impact of the temporary seating activation
              seating coupled with smart technology and AI on an{" "}
              <a
                href="https://www.bing.com/maps?cp=-33.917818%7E151.228585&lvl=20.8&style=h"
                style={{ color: "#FFFFFF " }}
                target="_blank"
              >
                {" "}
                open space at the UNSW Kensington Campus
              </a>
              . Funded by Transport for NSW through{" "}
              <a
                href="https://www.transport.nsw.gov.au/industry/cities-and-active-transport/cities-revitalisation-and-place/festival-of-place-0"
                style={{ color: "#FFFFFF " }}
                target="_blank"
              >
                the Safer Cities program
              </a>
              , the project commenced in April 2024 and concluded in October
              2024.
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
              <strong>The sensor kit</strong>, comprising both hardware and
              software, was developed by MIT LCAU with a focus on{" "}
              <strong>
                customisability, scalability, transparency, and privacy
              </strong>
              . Leveraging advancements in Vision AI technology and open-source
              development over recent years, this sensor kit is capable of
              categorising postures into sitting or standing, analysing usage
              patterns, detecting custom-designed bench locations, and
              monitoring human behaviour continuously, providing insights into
              the impact of the benches and guiding future urban designs.
            </p>
            <p className="about-txt">
              <strong>The scalability</strong> aspect of the project is
              documented in a comprehensive do-it-yourself Benchmark NSW
              Guidebook, enabling place managers, researchers and other
              interested parties to conduct their own public space research.
              This open-source guidebook is available for urban planners,
              community organisations, and researchers, offering refined
              methodologies that empower others to start similar projects and
              contribute to data-driven urban planning initiatives.
            </p>
            <p className="about-txt">
              <strong>Transparency and privacy</strong> are central to this
              project, as we are working within real-world public spaces. A key
              feature of our software is that{" "}
              <strong>no video or images are stored</strong>, distinguishing our
              approach to protect privacy. Additionally, the project
              incorporates{" "}
              <a href="https://dtpr.io/" target="_blank">
                the Digital Trust for Places & Routines (DTPR)
              </a>
              , an open-source communication standard designed to enhance
              transparency and accountability in the use of digital technologies
              in public spaces. This commitment to privacy and transparency
              ensures the project aligns with ethical standards while providing
              valuable urban insights.
            </p>
          </div>
        </div>
      </section>

      {/*Section 3*/}
      <section
        id="bench-design"
        className="nova-mono-regular"
        style={{ paddingTop: "5rem", backgroundColor: "#FB718D" }}
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
              <strong>Co-design workshops</strong> were held with women
              Industrial Design students from UNSW, who played a pivotal role in
              the development of modular seating units. These workshops brought
              valuable women-led expertise, focusing on the specific needs of
              women and gender-diverse individuals in public spaces. The
              resulting seating units, made from 100% recycled HDPE plastic,
              featured motion-activated LED lighting to enhance visibility and
              comfort, ensuring the design was both functional and responsive to
              real-world user experiences.
            </p>
            <p className="about-txt font-white">
              The design process emphasised{" "}
              <strong>collaboration and inclusivity</strong>, involving multiple
              stages from concept development to final fabrication. It was a
              partnership between UNSW Industrial Design students, staff, and
              MIT urbanism experts. This iterative process prioritised
              flexibility, sustainability, and smart technology integration,
              ensuring the public seating was not only practical but also
              aesthetically engaging. Each design decision was carefully crafted
              to meet the goals of creating safe, inclusive spaces while
              addressing environmental responsibility.
            </p>
            <p className="about-txt font-white">
              <strong>The final product</strong>
              {""} showcases a blend of functionality, aesthetics, and
              sustainability. The modular seating, with its scalloped edges and
              light pink colour scheme accented by red, offers users the
              flexibility to rearrange units for social interaction or privacy.
              Motion-activated LED lights enhance safety, while the use of
              Post-Consumer Recycled Plastic (PCRP) ensures durability and
              weather resistance. The fabrication involved advanced techniques
              like CNC cutting and plastic welding, resulting in a design that
              promotes inclusivity, safety, and environmental consciousness in
              public spaces.
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
          <p
            style={{
              padding: "1rem 2rem 0rem 2rem",
            }}
          >
            Benchmark NSW utilised{" "}
            <a href="https://dtpr.io/" target="_blank">
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
              <p className="about-subtxt" onClick={handleDeIDVideoClick}>
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
              <p className="about-subtxt" onClick={handlePersonDetectionClick}>
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
              <p className="about-subtxt" onClick={handleMotionDetectionClick}>
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
              <p className="about-subtxt" onClick={handlePlanningClick}>
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
              <p className="about-subtxt" onClick={handleResearchClick}>
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
              <p className="about-subtxt" onClick={handleAIClick}>
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
              <p className="about-subtxt" onClick={handleReviewedClick}>
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
              <p className="about-subtxt" onClick={handleCloudStorageClick}>
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
              <p className="about-subtxt" onClick={handleEncryptedClick}>
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
              <p className="about-subtxt" onClick={handleAccessClick}>
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
              fontSize: "0.6rem",
              padding: "0rem 2rem 3rem 2rem",
              color: "ffdae2",
              textAlign: "center",
              margin: "0rem",
              fontFamily: "ibm-plex-sans, sans-serif",
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
        className="nova-mono-regular"
        style={{ paddingTop: "5rem", backgroundColor: "#FB718D" }}
      >
        <div className="about-head">
          <p className="about-title bg-white">Team</p>
        </div>
        <div className="about-p">
          <p className="about-txt font-white">
            <a
              href="https://lcau.mit.edu/"
              style={{ color: "#FFFFFF" }}
              target="_blank"
            >
              MIT LCAU
            </a>{" "}
            |{" "}
            <a
              href="https://civicdatadesignlab.mit.edu/"
              style={{ color: "#FFFFFF" }}
              target="_blank"
            >
              CDDL
            </a>
            <br></br> Sarah Williams, Minwook Kang, Hannah Shumway, Sebastian
            Ives, Maria Gabriela Carucci, Karen Kuo, Clay Anderson, Mercy
            Olagunju
          </p>
          <p className="about-txt font-white">
            <strong>UNSW</strong> <br></br> Gonzalo Portas, Mariano Ramirez,
            Rina Bernabei, Eugenia Cheung, Grace Wong, Eleanor Tang, Christina
            Chen
          </p>
          <p className="about-txt font-white">
            <strong>Transport for NSW</strong>
          </p>
        </div>
      </section>
    </div>
  );
}

export default About;
