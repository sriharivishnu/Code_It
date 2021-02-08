import React from "react";
import Button from "../Button/Button";
import "./SearchBar.scss";
const SearchBar = ({ placeholder, className }) => {
  return (
    <div className={`searchbar-style`}>
      <input className={`searchbar-input ${className}`} placeholder={placeholder}></input>
      <Button buttonSize="btn--medium" buttonStyle="btn--primary" className="search_button">
        Search
      </Button>
    </div>
  );
};
export default SearchBar;
