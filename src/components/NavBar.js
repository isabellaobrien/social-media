import React from 'react'
import {Navbar, Nav} from 'react-bootstrap';
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
    ><i class="fa-solid fa-plus"></i> add post</NavLink>
  </>

  const loggedInIcons = <>
  <NavLink 
      to="/liked"
      className={styles.link} 
      activeClassName={styles.active}
    ><i class="fa-regular fa-heart"></i> liked</NavLink>

  <NavLink 
      to="/feed"
      className={styles.link} 
      activeClassName={styles.active}
    ><i class="fa-solid fa-newspaper"></i> feed</NavLink>
  
  <NavLink 
      to="/"
      onClick={handleSignOut}
      className={styles.link} 
    ><i class="fa-solid fa-right-from-bracket"></i> sign out</NavLink>

  <NavLink 
      to="/profiles/{currentUser?.profile_id}"
      className={styles.profile} 
    >
      <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40}/>
    </NavLink>

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
            ><i class="fa-solid fa-house"></i> home</NavLink>
            {currentUser? loggedInIcons:loggedOutIcons}
            </Nav>
        </Navbar.Collapse>
    </Navbar>

  )
}

export default NavBar