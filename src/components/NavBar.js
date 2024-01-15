import React from 'react'
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();

  const loggedInIcons = <>{currentUser?.username}
  <NavDropdown title="More" id="basic-nav-dropdown">
    <NavDropdown.Item>Action</NavDropdown.Item>
    <NavDropdown.Item>Another action</NavDropdown.Item>
    <NavDropdown.Item>Something</NavDropdown.Item>
    <NavDropdown.Item>Separated link</NavDropdown.Item>
  </NavDropdown>
  </>

  const loggedOutIcons = <>
    <NavLink 
      to="/sign-in" 
      className={styles.link} 
      activeClassName={styles.active}
    >sign in</NavLink>
    <NavLink 
      to="/sign-up" 
      className={styles.link} 
      activeClassName={styles.active}
    >sign up</NavLink>
  </>
  return (
    <Navbar className={styles.NavBar} expand="lg">
        <Container>
            <NavLink to="/">
              <Navbar.Brand className={styles.logo}>Logo</Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <NavLink 
                  exact 
                  to="/" 
                  className={styles.link} 
                  activeClassName={styles.active}
                >Home</NavLink>
                {currentUser? loggedInIcons:loggedOutIcons}
                </Nav>
                {/* <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar