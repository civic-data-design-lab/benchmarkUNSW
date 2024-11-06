import React from "react";
import "../style/Footer.css"; // Make sure to create this CSS file
import logo1 from "../assets/Logo/lcau.svg";
import logo2 from "../assets/Logo/mit.png";
import logo3 from "../assets/Logo/nsw.png";
import logo4 from "../assets/Logo/unsw.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logos">
        <img src={logo1} alt="Logo 1" className="footer-logo" />
        <img src={logo2} alt="Logo 2" className="footer-logo" />
        <img src={logo3} alt="Logo 3" className="footer-logo" />
        <img src={logo4} alt="Logo 4" className="footer-logo" />
      </div>
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <p className="footer-text" style={{ margin: "0px" }}>
          Benchmark NSW is a collaboration between UNSW and MIT. {"  "}
          <a
            href="https://accessibility.mit.edu/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#FFEFF3",
              fontWeight: "500",
              padding: "0px",
              margin: "0px",
            }}
          >
            Accessibility
          </a>{" "}
          <br></br>This project has been funded by Transport for NSW through{" "}
          <a
            href="https://www.transport.nsw.gov.au/industry/cities-and-active-transport/cities-revitalisation-and-place/festival-of-place-0"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#FFEFF3",
              textDecoration: "underline",
              fontWeight: "500",
              margin: "0px",
            }}
          >
            the Safer Cities program.{" "}
          </a>
        </p>
        <p className="footer-text"></p>
      </div>
    </footer>
  );
}

export default Footer;
