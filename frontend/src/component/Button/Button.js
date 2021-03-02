import React from "react";
import "./Button.scss";

const STYLES = ["btn--primary", "btn--outline", "btn--text"];

const SIZES = ["btn--medium", "btn--large"];

const Button = ({ children, type, onClick, buttonStyle, buttonSize, className }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const checkClassName = className || "";
  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkClassName}`}
      onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
