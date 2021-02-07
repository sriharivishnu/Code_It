import React, { useState } from "react";
// import logo from "../../img/logo.png";
import { MenuItems } from "./NavBarItems/MenuBarItems";
import Button from "../Button/";
import "./NavBar.scss";
const NavBar = ({ onClickSignUp, onClickLogin }) => {
  const [clicked, setClicked] = useState(false);
  function handleClick() {
    setClicked(!clicked);
  }

  return (
    <>
      <nav className="NavBarItems transparent">
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
          <Button buttonStyle="btn--outline" onClick={onClickLogin}>
            <b>Sign In</b>
          </Button>
          <Button onClick={onClickSignUp}>
            <b>Sign Up</b>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
