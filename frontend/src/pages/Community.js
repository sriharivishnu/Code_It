import React, { useEffect } from "react";

const Community = ({ setPadding }) => {
  useEffect(() => {
    setPadding(true);
  }, [setPadding]);
  return (
    <div>
      <h1>HELLO COMMUNITY</h1>
    </div>
  );
};

export default Community;
