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
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{ display: "inline-block" }} // Add this line
        >
          Findings
        </motion.p>
        <motion.p
          className="findings-description" // Add a new class for styling if needed
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }} // Adjust delay for order
        >
          Movable benches have breathed new life into the area, making it more
          vibrant, welcoming, and socially dynamic—especially for women. These
          benches inspire longer stays, spark social interactions, and draw more
          people in. Nighttime activity has surged, transforming the space into
          a safer, more inviting destination after dark. Women and girls are
          staying longer, and surveys show that the benches boost comfort and
          create a lively, engaging environment. Overall, the benches have
          turned the area into a buzzing hub of energy, day and night.
        </motion.p>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="findings-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }} // Adjust delay for order
      >
        <div className="sub-button-container">
          <button
            onClick={() => handleFocus("visionAI")}
            className={`sub-button ${
              focusSection === "visionAI" ? "active" : ""
            }`}
          >
            Vision AI
          </button>
          <button
            onClick={() => handleFocus("survey")}
            className={`sub-button ${
              focusSection === "survey" ? "active" : ""
            }`}
          >
            Survey
          </button>
          <button
            onClick={() => handleFocus("observation")}
            className={`sub-button ${
              focusSection === "observation" ? "active" : ""
            }`}
          >
            Observation
          </button>{" "}
        </div>

        {/* Vision AI Section */}
        {focusSection === "visionAI" && (
          <motion.div
            className="vision-ai"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: isFirstLoad ? 2 : 0,
              duration: isFirstLoad ? 0.5 : 0.2,
            }} // Adjust delay and duration for order
          >
            <ToggleableText title="Visitor Increase">
              The number of people visiting the area increased by 9.73% per hour
              and 14.63% per day, suggesting that movable benches have made the
              area more attractive to visitors.
            </ToggleableText>
            <ToggleableText title="Nighttime Activity Growth">
              Nighttime visitors increased by 12.18%, while those staying grew
              by 583.58% and total dwell time rose by 7,072%, indicating that
              the benches made the area more inviting and safer at night.
            </ToggleableText>
          </motion.div>
        )}

        {/* Survey Section */}
        {focusSection === "survey" && (
          <motion.div
            className="survey"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: isFirstLoad ? 2.5 : 0,
              duration: isFirstLoad ? 0.8 : 0.2,
              staggerChildren: 0.3,
            }} // Adjust delay and duration for order
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="result-text">
                <ToggleableText title="Socializing Motivation">
                  18.5% of women reported socializing as their primary reason
                  for visiting, indicating that the benches are fostering a
                  social environment.
                </ToggleableText>
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="result-text">
                <ToggleableText title="Encouraging Longer Stays">
                  77.8% of women noted that seating encouraged them to stay
                  longer, highlighting the benches' role in creating a more
                  inviting space.
                </ToggleableText>
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Observation Section */}
        {focusSection === "observation" && (
          <motion.div
            className="observation"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: isFirstLoad ? 3 : 0,
              duration: isFirstLoad ? 0.5 : 0.2,
            }} // Adjust delay and duration for order
          >
            {/* <h3>Observation</h3> */}
            <p className="result-text">
              <ToggleableText title="Increased Presence">
                The average observation count for women and girls rose from 0.9
                to 2.0, a 122% increase, indicating that the benches made the
                space more attractive to female visitors.
              </ToggleableText>
            </p>
            <p className="result-text">
              <ToggleableText title="Surge in Staying">
                The average observation count of women and girls staying
                increased from 0.1 to 0.8, representing a 700% surge, showing
                that the benches played a key role in encouraging longer stays.
              </ToggleableText>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Findings;
