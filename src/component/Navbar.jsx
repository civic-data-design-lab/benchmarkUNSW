// NavBar.jsx
import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import "bootstrap/dist/css/bootstrap.min.css";
import '../style/NavBar.css';
import '../style/Font.css';

function NavBar() {
    const [expanded, setExpanded] = useState(false);
    const handleToggle = () => setExpanded(!expanded);
    const handleLinkClick = () => setExpanded(false);

    return (
        <>
            <div className="NavBarHeight">
                <Navbar collapseOnSelect expand="lg" className="nova-mono-regular Navbar" fixed="top" expanded={expanded}>
                    <Navbar.Brand href="#home" className="NavBarTitle">
                        BenchMark NSW
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
                    <Navbar.Collapse className="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/aidata" onClick={handleLinkClick}>AI Data</Nav.Link>
                            <Nav.Link as={Link} to="/surveydata" onClick={handleLinkClick}>Survey Data</Nav.Link>
                            <NavDropdown title="About" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={HashLink} to="/about#project" onClick={handleLinkClick}>Project</NavDropdown.Item>
                                <NavDropdown.Item as={HashLink} to="/about#data-analysis" onClick={handleLinkClick}>Data Analysis Result</NavDropdown.Item>
                                <NavDropdown.Item as={HashLink} to="/about#bench-design" onClick={handleLinkClick}>Bench Design</NavDropdown.Item>
                                <NavDropdown.Item as={HashLink} to="/about#dtpr" onClick={handleLinkClick}>DTPR</NavDropdown.Item>
                                <NavDropdown.Item as={HashLink} to="/about#team" onClick={handleLinkClick}>Team</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Downloads" id="collasible-nav-dropdown">
                                <NavDropdown.Item as={HashLink} to="/downloads#report" onClick={handleLinkClick}>Report</NavDropdown.Item>
                                <NavDropdown.Item as={HashLink} to="/downloads#guide-book" onClick={handleLinkClick}>Guide Book</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </>
    );
}

export default NavBar;
