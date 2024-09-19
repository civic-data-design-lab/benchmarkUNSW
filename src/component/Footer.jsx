import React from "react";
import "../style/Footer.css"; // Make sure to create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          © 2024 BenchMark NSW. All rights reserved.<br></br>Funded by Transport
          for NSW through the Safer Cities program.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
