// Icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// React imports
import PropTypes from "prop-types";

export default function Default({ textSize = "text-4xl" }) {
  return (
    <FontAwesomeIcon
      icon={faSpinner}
      className={`animate-[spin_1.5s_linear_infinite] text-4xl ${textSize}`}
    />
  );
}

Default.propTypes = {
  textSize: PropTypes.string,
};
