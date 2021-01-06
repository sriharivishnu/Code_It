import React, { useState } from "react";
import logo from "../../img/logo.png";
import { MenuItems } from "./NavBarItems/MenuBarItems";
import Button from "../Button/";
import ModalLogin from "../ModalLogin";
import "./NavBar.css";
const NavBar = () => {
  const [clicked, setClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  function handleClick() {
    setClicked(!clicked);
  }
  const openLogin = () => {
    console.log(showModal);
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <nav className="NavBarItems">
        <a className="navbar-logo" href="/">
          Code-It<i className="fab fa-react"></i>
        </a>
        <div className="menu-icon" onClick={handleClick}>
          <i className="fas fa-bars"></i>
        </div>
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          <i className="fas fa-times close-drawer" onClick={handleClick}></i>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <b>
                  <a className={item.cName} href={item.url}>
                    {item.title}
                  </a>
                </b>
              </li>
            );
          })}
        </ul>
        <div className="account-status">
          <Button buttonStyle="btn--outline" onClick={openLogin}>
            <b>Sign In</b>
          </Button>
          <Button onClick={openLogin}>
            <b>Sign Up</b>
          </Button>
        </div>
      </nav>
      {/* <ModalLogin showModal={showModal} setShowModal={setShowModal} /> */}
    </>
  );
};

export default NavBar;
