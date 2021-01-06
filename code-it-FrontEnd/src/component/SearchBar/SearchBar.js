import React from "react";
import Button from "../Button/Button";
import "./SearchBar.css";
const SearchBar = ({ placeholder }) => {
  return (
    <div className="searchbar-style">
      <input className="searchbar-input" placeholder={placeholder}></input>
      <Button buttonSize="btn--medium" buttonStyle="btn--primary">
        Search
      </Button>
    </div>
  );
};
export default SearchBar;