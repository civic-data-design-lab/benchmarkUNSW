import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import framer-motion for animations
import "../style/Findings.css";
import "../style/Font.css";

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
        "The project records the locations of moveable benches to test the effects of urban furniture placement on how people use and enjoy public spaces.",
    },
    {
      title: "Seating Hotspots",
      description:
        "The project estimates and categorizes people's postures (sitting or standing) to determine where they are most likely to sit and how long they remain seated.",
    },
    {
      title: "Social interaction",
      description:
        "The project counts the number of people staying in the space and measures their dwell time to understand how the public space is activated.",
    },
    {
      title: "Activation of Public Space",
      description:
        "The project counts the number of people who stay in the space and measures their dwell time to understand how public space is activated.",
    },
  ];

  const insights = [{ title: "result graphic", description: "Description." }];

  const downloads = [
    { title: "Report", description: "Download the full report" },
    { title: "Guidebook ", description: "Access the guide book" },
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

        {measures.map((item, index) => (
          <React.Fragment key={index}>
            <div>
              <motion.p
                className="findings-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: baseDelay + (index * 2 + 1) * delayIncrement,
                  duration: 0.5,
                }}
                style={{ display: "inline-block" }}
              >
                {item.title}
              </motion.p>
            </div>
            <motion.p
              className="findings-description" // Add a new class for styling if needed
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: baseDelay + (index * 2 + 2) * delayIncrement,
                duration: 0.5,
              }} // Adjust delay for order
            >
              {item.description}
            </motion.p>
          </React.Fragment>
        ))}

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

        {insights.map((item, index) => (
          <React.Fragment key={index}>
            <div>
              <motion.p
                className="findings-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay:
                    baseDelay +
                    (measures.length * 2 + 2 + index * 2) * delayIncrement,
                  duration: 0.5,
                }}
                style={{ display: "inline-block" }}
              >
                {item.title}
              </motion.p>
            </div>
            <motion.p
              className="findings-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay:
                  baseDelay +
                  (measures.length * 2 + 3 + index * 2) * delayIncrement,
                duration: 0.5,
              }}
            >
              {item.description}
            </motion.p>
          </React.Fragment>
        ))}

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
                {item.title}
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
