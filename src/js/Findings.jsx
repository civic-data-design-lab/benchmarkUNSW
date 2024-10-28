import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import "../style/Findings.css";
import "../style/Font.css";

import img1 from "../assets/Findings/1.svg";
import img2 from "../assets/Findings/2.svg";
import img3 from "../assets/Findings/3.svg";
import img4 from "../assets/Findings/4.svg";

import imga from "../assets/Findings/a.svg";
import imgb from "../assets/Findings/b.svg";
import imgc from "../assets/Findings/c.gif";
import imgd from "../assets/Findings/d.gif";

import ReactGA from "react-ga4";

function Findings() {
  const [focusSection, setFocusSection] = useState("visionAI");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleFocus = (section) => {
    setFocusSection(focusSection === section ? null : section);
    setIsFirstLoad(false); // Set to false after the first load
  };

  const ToggleableText = ({ title, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <p>
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          animate={{ scale: 1.2, color: "#fff" }}
          transition={{ duration: 0.5 }}
          className="findings-button"
        >
          {title}
        </motion.button>{" "}
        {isVisible && <p>{children}</p>}
      </p>
    );
  };

  const baseDelay = 0.2;
  const delayIncrement = 0.2;

  const measures = [
    {
      title: "Daily Journeys",
      description:
        "The project recorded the locations of moveable benches to test the effects of urban furniture placement on how people use and enjoy public spaces.",
      img: img1,
    },
    {
      title: "Seating Hotspots",
      description:
        "The project estimated and categorised people's postures (sitting or standing) to determine where they are most likely to sit and how long they remain seated.",
      img: img2,
    },
    {
      title: "Social interaction",
      description:
        "The project tracked people's locations every 5 seconds using vision AI, mapping them into coordinates. This allows for a highly detailed analysis of social interactions.",
      img: img3,
    },
    {
      title: "Space Activation",
      description:
        "The project counted the number of people who stayed in the space and measured their dwell time to understand how public space is activated.",
      img: img4,
    },
  ];

  const insights = [
    {
      title: "Vision AI",
      img: imga,
      img2: imgb,
      img3: imgc,
      img4: imgd,
    },
  ];

  const downloads = [
    { title: "Report", description: "Download the full report", type: "pdf" },
    { title: "Guidebook", description: "Access the guidebook", type: "pdf" },
    {
      title: "Bench Fabrication",
      description: "Access the CAD files",
      type: "zip",
    },
  ];

  return (
    <div className="findings-page nova-mono-regular">
      {/* Title Section */}
      <motion.div
        className="findings-head light-bg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="findings-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: baseDelay, duration: 0.5 }}
          style={{ display: "inline-block" }} // Add this line
        >
          Measures
        </motion.p>

        {measures.map((item, index) => {
          const isReversed =
            item.title === "Seating Hotspots" ||
            item.title === "Space Activation";
          return (
            <React.Fragment key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: isReversed ? "flex-end" : "flex-start",
                }}
              >
                <motion.p
                  className="findings-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: baseDelay + (index * 2 + 1) * delayIncrement,
                    duration: 0.5,
                  }}
                  style={{
                    display: "inline-block",
                    textAlign: isReversed ? "left" : "inherit",
                  }}
                >
                  {item.title}
                </motion.p>
              </div>
              <motion.div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: isReversed ? "row-reverse" : "row",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: baseDelay + (index * 2 + 2) * delayIncrement,
                  duration: 0.5,
                }}
              >
                <motion.p
                  className="findings-description"
                  style={{
                    flex: 7,
                    textAlign: isReversed ? "right" : "inherit",
                  }}
                >
                  {item.description}
                </motion.p>
                <div
                  style={{
                    backgroundColor: "none",
                    height: "170px",
                    margin: "0rem 0.5rem",
                    flex: 5,
                    backgroundImage: `url(${item.img})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
              </motion.div>
            </React.Fragment>
          );
        })}

        <motion.p
          className="findings-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: baseDelay + (measures.length * 2 + 1) * delayIncrement,
            duration: 0.5,
          }}
        >
          Insights
        </motion.p>

        <React.Fragment>
          <motion.div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "2rem",
              backgroundColor: "#FFEFF3",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: baseDelay + (measures.length * 2 + 3) * delayIncrement,
              duration: 0.5,
            }}
            className="findings-img-container"
          >
            {/* Left Long Image */}
            <div style={{ flex: 1, marginRight: "0rem" }}>
              <img
                src={insights[0].img}
                alt="Insight 1"
                style={{ width: "100%", height: "auto" }}
              />
            </div>

            {/* Right Section */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              {/* Right Top Chart Image */}
              <div style={{ marginBottom: "1rem", marginLeft: "1rem" }}>
                <img
                  src={insights[0].img2}
                  alt="Insight 2"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              {/* Right Bottom Text */}
              <div>
                <p
                  style={{
                    margin: "0rem 1rem",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                  }}
                >
                  Daily average number of people{" "}
                  <span className="underlined">staying</span> on site grew five
                  times
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: baseDelay + (measures.length * 2 + 5) * delayIncrement,
              duration: 0.5,
            }}
          >
            <div>
              <p
                style={{
                  padding: "1rem",
                  margin: "0",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  backgroundColor: "#FFEFF3",
                }}
              >
                The average number of people{" "}
                <span className="underlined">sitting</span> per day grew
                fourteen times after installing benches.
              </p>
            </div>
            <img
              src={insights[0].img4}
              alt="Insight 3"
              style={{ width: "100%", height: "auto", marginBottom: "2rem" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: baseDelay + (measures.length * 2 + 6) * delayIncrement,
              duration: 0.5,
            }}
          >
            <div>
              <p
                style={{
                  padding: "1rem",
                  margin: "0",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  backgroundColor: "#FFEFF3",
                }}
              >
                <span className="underlined">Socialising</span> jumped from zero
                to nine people per day after benches were installed
              </p>
            </div>
            <img
              src={insights[0].img3}
              alt="Insight 2"
              style={{ width: "100%", height: "auto", marginBottom: "1rem" }}
            />
          </motion.div>
        </React.Fragment>

        <motion.p
          className="findings-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay:
              baseDelay +
              (measures.length * 2 + insights.length * 2 + 2) * delayIncrement,
            duration: 0.5,
          }}
        >
          Download
        </motion.p>

        {downloads.map((item, index) => (
          <React.Fragment key={index}>
            <div>
              <motion.p
                className="findings-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay:
                    baseDelay +
                    (measures.length * 2 +
                      insights.length * 2 +
                      3 +
                      index * 2) *
                      delayIncrement,
                  duration: 0.5,
                }}
                style={{ display: "inline-block" }}
              >
                <a
                  href={`/data/${item.title.toLowerCase().replace(" ", "")}.${
                    item.type
                  }`}
                  onClick={() => {
                    ReactGA.event({
                      category: "Download",
                      action: `${item.title}_downloaded`,
                      label: item.title,
                    });
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={item.type === "zip"}
                >
                  {item.title}
                </a>
              </motion.p>
            </div>
            <motion.p
              className="findings-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay:
                  baseDelay +
                  (measures.length * 2 + insights.length * 2 + 4 + index * 2) *
                    delayIncrement,
                duration: 0.5,
              }}
            >
              {item.description}
            </motion.p>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default Findings;
