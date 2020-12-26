import React, { StyleSheet } from "react";
import logo from "../../img/logo.png";

const MenuBar = () => {
  return (
    <div class="menu-background">
      <div id="menu-logo">
        <img src={logo} style={style} alt="Logo" id="logo-image"></img>
      </div>
    </div>
  );
};
const style = {
  height: "10vh",
};

export default MenuBar;
