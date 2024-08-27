import Container from 'react-bootstrap/Container'
import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"
import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import '../style/NavBar.css'
import '../style/Font.css'

function NavBar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="nova-mono-regular">
                <Navbar.Brand href="#home">
                    BenchMark NSW
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/aidata">AI Data</Nav.Link>
                        <Nav.Link as={Link} to="/surveydata">Survey Data</Nav.Link>
                        <NavDropdown title="About" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/about#project">Project</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about#data-analysis">Data Analysis Result</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about#bench-design">Bench Design</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about#dtpr">DTPR</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/about#team">Team</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Downloads" id="collasible-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/downloads#report">Report</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/downloads#guide-book">Guide Book</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}

export default NavBar
