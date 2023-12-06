// Icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// React imports
import PropTypes from "prop-types";

export default function Default({
  text,
  textSize = "text-4xl",
  iconSize = "text-6xl",
}) {
  return (
    <div className="flex items-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className={`animate-[spin_1.5s_linear_infinite] ${iconSize}`}
      />
      <span className={`font-mono ${textSize} pl-2`}>{text}</span>
    </div>
  );
}

Default.propTypes = {
  textSize: PropTypes.string,
  text: PropTypes.string.isRequired,
  iconSize: PropTypes.string,
};
