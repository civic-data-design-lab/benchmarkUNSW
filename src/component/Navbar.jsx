import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/NavBar.css";
import "../style/Font.css";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation(); // Get the current route
  const navRef = useRef(null);

  const handleToggle = () => setExpanded(!expanded);
  const handleLinkClick = () => setExpanded(false);

  // Set different styles based on the current route
  const navBarStyle =
    location.pathname === "/exploredata" ? "NavBarTitleAidata" : "NavBarTitle";
  const icon =
    location.pathname === "/exploredata"
      ? "navbar-toggler-icon-aidata"
      : "navbar-toggler-icon-default";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  return (
    <>
      <div className="NavBarHeight">
        <Navbar
          ref={navRef}
          collapseOnSelect
          expand={false}
          className="nova-mono-regular Navbar"
          fixed="top"
          expanded={expanded}
          style={{
            backgroundColor:
              location.pathname === "/exploredata" ? "#FDB5C5" : "#FF2551",
          }}
        >
          <Navbar.Brand href="/" className={navBarStyle}>
            Benchmark NSW
          </Navbar.Brand>
          <Navbar.Toggle onClick={handleToggle} className={icon} />
          <Navbar.Collapse className="responsive-navbar-nav">
            <Nav>
              <Nav.Link as={Link} to="/" onClick={handleLinkClick}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/exploredata" onClick={handleLinkClick}>
                Explore Data
              </Nav.Link>

              <Nav.Link as={Link} to="/findings" onClick={handleLinkClick}>
                Findings
              </Nav.Link>
              <NavDropdown
                title="About"
                className="custom-nav-dropdown-container"
                id="about-nav-dropdown"
              >
                {[
                  { to: "/about#project", label: "Project" },
                  { to: "/about#technology", label: "Technology" },
                  { to: "/about#bench-design", label: "Design" },
                  { to: "/about#dtpr", label: "DTPR" },
                  { to: "/about#team", label: "Team" },
                ].map((item) => (
                  <NavDropdown.Item
                    key={item.to}
                    as={HashLink}
                    to={item.to}
                    onClick={handleLinkClick}
                    className="custom-nav-dropdown-item"
                  >
                    {item.label}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
}

export default NavBar;
