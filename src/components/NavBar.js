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
    > add post</NavLink>
  </>

  const loggedInIcons = <>
  <NavLink 
      to="/liked"
      className={styles.link} 
      activeClassName={styles.active}
    > liked</NavLink>

  <NavLink 
      to="/feed"
      className={styles.link} 
      activeClassName={styles.active}
    > feed</NavLink>
  
  <NavLink 
      to="/"
      onClick={handleSignOut}
      className={styles.link} 
    > sign out</NavLink>

  <NavLink 
      to={`/profiles/${currentUser?.profile_id}`}
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
    <Navbar className={styles.NavBar} expand="xl">
        <NavLink to="/">
          <Navbar.Brand className={styles.logo}>share.</Navbar.Brand>
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
            > home</NavLink>
            {currentUser? loggedInIcons:loggedOutIcons}
            </Nav>
        </Navbar.Collapse>
    </Navbar>

  )
}

export default NavBar