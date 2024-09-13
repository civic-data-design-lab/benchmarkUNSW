import React from "react";
import "../style/Footer.css"; // Make sure to create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          © 2024 BenchMark NSW. All rights reserved.
        </p>
        {/* <ul className="footer-links">
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/downloads">Downloads</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul> */}
      </div>
    </footer>
  );
}

export default Footer;
