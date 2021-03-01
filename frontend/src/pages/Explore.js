import React, { useEffect } from "react";

const Explore = ({ setPadding }) => {
  useEffect(() => {
    setPadding(true);
  }, [setPadding]);
  return <div>EXPLORE</div>;
};

export default Explore;
