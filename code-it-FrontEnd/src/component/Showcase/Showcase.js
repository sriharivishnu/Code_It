import React from "react";
import "./Showcase.scss";
import SearchBar from "../SearchBar/";
const Showcase = () => {
  return (
    <div className="showcase-background">
      <h1 className="showcase-title">
        Coder's Block?
        <br /> We'll get you through it. <br />
        It's time to <span className="text-highlight">Code-It.</span>
      </h1>
      <p className="showcase-description">
        Get the inspiration you need to create the projects of your dreams.
      </p>
      <SearchBar placeholder="Mobile App etc." />
    </div>
  );
};

export default Showcase;
