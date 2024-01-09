// React Inports
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

export default function Default({ children, className }) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const ulRef = useRef(null);

  function mouseDownScrollHandler() {
    setIsMouseDown(true);
  }
  function mouseMoveHandler() {
    if (!isMouseDown) return;

    console.log("mouse move");
  }

  useEffect(() => {
    function mouseUpHandler() {
      //if mouse is not down, return, to prevent setting state when not needed
      if (!isMouseDown) return;
      setIsMouseDown(false);
    }
    window.addEventListener("mouseup", mouseUpHandler);

    return () => {
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [isMouseDown]);

  return (
    <ul
      ref={ulRef}
      className={`${className} select-none overflow-scroll scroll-no-style`}
      onMouseDown={mouseDownScrollHandler}
      onMouseMove={mouseMoveHandler}
    >
      {children}
    </ul>
  );
}

Default.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
};
