import "./InputField.scss";
const InputField = ({ placeholder, onChange, className, size, type }) => {
  const SIZES = ["small", "medium", "large"];
  const SIZE = size ? size : SIZES[1];
  return (
    <input
      className={`inputText ${className} ${SIZE}`}
      placeholder={placeholder}
      type={type}
      onChange={onChange}></input>
  );
};

export default InputField;
