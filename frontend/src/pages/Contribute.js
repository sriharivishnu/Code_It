import React, { useEffect, useState } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import "./css/Contribute.scss";
require("codemirror/mode/javascript/javascript");

const Contribute = ({ setPadding }) => {
  const [value, setValue] = useState('console.log("Hello World ")');
  const options = {
    mode: "javascript",
    theme: "material-darker",
    lineNumbers: true,
  };
  useEffect(() => {
    setPadding(true);
  }, [setPadding]);
  return (
    <div className="contribute">
      <h1 className="title text-medium">Contribute to Code-It!</h1>
      <CodeMirror
        className="contribute code-box"
        value={value}
        options={options}
        onBeforeChange={(editor, data, value) => {
          setValue(value);
        }}
        onChange={(editor, data, value) => {
          console.log(value);
        }}
      />
    </div>
  );
};

export default Contribute;
