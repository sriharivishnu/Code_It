import React, { useEffect } from "react";
import Showcase from "../component/Showcase/Showcase";
import SearchBar from "../component/SearchBar";
import "./css/Home.scss";
const Home = ({ setPadding }) => {
  useEffect(() => {
    setPadding(false);
  }, [setPadding]);
  return (
    <div className="home-page" style={{ textAlign: "center" }}>
      <Showcase />
      <SearchBar className="home searchbar" placeholder="TensorFlow, Mobile App etc." />
    </div>
  );
};

export default Home;
