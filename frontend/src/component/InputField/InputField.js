import "./InputField.scss";
const InputField = ({ placeholder, onChange, className, size, type, error }) => {
  const SIZES = ["small", "medium", "large"];
  const SIZE = size ? size : SIZES[1];
  return (
    <>
      <input
        className={`inputText ${error ? "error" : ""} ${className} ${SIZE}`}
        placeholder={placeholder}
        type={type}
        onChange={onChange}></input>
      {error ? <div className="error-msg">{error}</div> : null}
    </>
  );
};

export default InputField;
