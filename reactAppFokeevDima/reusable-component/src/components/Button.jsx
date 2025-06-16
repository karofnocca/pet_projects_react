import PropTypes from "prop-types";


export default function Button({
  size = "medium", 
  variant = "primary", 
  fullWidth = false, 
  isDisabled = false, 
  onClick, 
  children, 
}) {
  return (
    <button
      className={`button ${variant} ${size} ${isDisabled ? "disabled" : ""} ${
        fullWidth ? "full-width" : ""
      }`}
      onClick={onClick} 
    >
      {children} 
    </button>
  );
}


Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string, 
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.string, 
  fullWidth: PropTypes.bool, 
  isDisabled: PropTypes.bool, 
  onClick: PropTypes.func, 
};

