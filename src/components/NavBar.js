import React from 'react'
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from './Avatar';
import axios from 'axios';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleSignOut = async() => {
    try{
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    }catch (err){
      console.log(err)
    }
  }

  const addPostIcon = <>
    <NavLink 
      to="/posts/add"
      className={styles.link} 
      activeClassName={styles.active}
    ><i class="fa-solid fa-plus"></i>add post</NavLink>
  </>

  const loggedInIcons = <>
  <NavLink 
      to="/liked"
      className={styles.link} 
      activeClassName={styles.active}
    ><i class="fa-solid fa-heart"></i>liked</NavLink>

  <NavLink 
      to="/feed"
      className={styles.link} 
      activeClassName={styles.active}
    >feed</NavLink>
  
  <NavLink 
      to="/"
      onClick={handleSignOut}
      className={styles.link} 
    >sign out</NavLink>

  <NavLink 
      to="/profiles/{currentUser?.profile_id}"
      className={styles.link} 
    >
      <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40}/>
    </NavLink>
  
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
                {currentUser && addPostIcon}
                <NavLink 
                  exact 
                  to="/" 
                  className={styles.link} 
                  activeClassName={styles.active}
                >Home</NavLink>
                {currentUser? loggedInIcons:loggedOutIcons}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default NavBar