//React imports
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import MarkDownConvert from "@Comp/MarkDownConvert";
import { useState, useRef, useEffect } from "react";

export default function Default({ infoObject }) {
  const [isDivVisible, setDivVisible] = useState(false);

  /*this is used to set the height of the div to animate it,
   *height: fit-content or height: auto doesn't work
   */
  const [height, setHeight] = useState(0);
  const divRef = useRef(null);

  // Animation keyframes
  const foldInAnimation = [
    { height: `${height}px`, display: "block", offset: 0 },
    { height: "0px", offset: 0.95 },
    { height: "0px", display: "none", offset: 1 },
  ];

  const foldOutAnimation = [
    { height: "0px", display: "none", offset: 0 },
    { display: "block", offset: 0.05 },
    { height: `${height}px`, display: "block", offset: 1 },
  ];

  const optionsAnimate = {
    duration: 200, // Animation duration in milliseconds
    easing: "ease-in-out", // Easing function
    fill: "forwards", // Determines what values are applied by the end of the animation
    iterations: 1, // Number of times the animation should repeat
  };

  useEffect(() => {
    setHeight(divRef.current.scrollHeight);
  }, []);

  return (
    <>
      <li className="rounded-lg border-2 border-black bg-neutral-900">
        <button
          aria-controls={`${infoObject.name}[${infoObject.tag_name}]-foldable`}
          aria-expanded={isDivVisible}
          className="group relative flex w-full items-center justify-center rounded-lg border-b-2 border-black bg-neutral-800 p-3"
          onClick={() =>
            setDivVisible((visible) => {
              if (visible)
                divRef.current.animate(foldInAnimation, optionsAnimate);
              else {
                divRef.current.animate(foldOutAnimation, optionsAnimate);
              }
              return !visible;
            })
          }
        >
          <h3 className="text-2xl font-bold transition-all group-hover:text-red-600 group-focus-visible:text-red-600">
            {infoObject.name}{" "}
            <span className="text-base font-normal text-neutral-400 transition-all group-focus-within:text-white group-hover:text-white">
              {infoObject.tag_name}
            </span>
          </h3>

          <p className="absolute right-[10px] text-sm text-neutral-400">
            {formatDistanceToNow(new Date(infoObject.published_at), {
              addSuffix: true,
            })}
          </p>
        </button>
        <div
          ref={divRef}
          id={`${infoObject.name}[${infoObject.tag_name}]-foldable`}
          aria-hidden={!isDivVisible}
          className={`h-0 w-full overflow-hidden px-3
          `}
        >
          <p className="my-2">
            Released:{" "}
            {new Date(infoObject.published_at).toLocaleDateString("en-US")}
          </p>
          <hr className="mx-auto border-neutral-700" />
          <div className="my-2">
            <MarkDownConvert
              mdText={infoObject.body}
              linkStyle="underline hover:text-blue-500 transition-all focus-within:text-blue-500"
              listStyle="text-base before:content-['-'] before:mr-2"
            />
          </div>
        </div>
      </li>
    </>
  );
}

Default.propTypes = {
  infoObject: PropTypes.object.isRequired,
};
