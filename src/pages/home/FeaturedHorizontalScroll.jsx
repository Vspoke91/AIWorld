// Icons Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

// React Imports
import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";

export default function Default({ children }) {
  //React Hooks
  const [childrenRender, setChildrenRender] = useState(null);
  const scrollHolderRef = useRef(null);
  const holderRef = useRef(null);
  const controlsRef = useRef({ left: null, right: null });

  //create li elements from children
  useEffect(() => {
    //create li elements
    if (children && Array.isArray(children)) {
      const elementChildrenArray = [];

      children.map((childElement, index) =>
        elementChildrenArray.push(createLiElement(index, childElement)),
      );
      setChildrenRender(elementChildrenArray);
    } else {
      setChildrenRender(createLiElement(0, children, "my-auto"));
    }

    function createLiElement(
      index,
      element,
      Styles = "h-inherit shrink-0 snap-start bg-neutral-900",
    ) {
      return (
        <li key={index} className={Styles}>
          {element}
        </li>
      );
    }
  }, [children]);

  //add resize obcerver to scrollHolderRef
  useEffect(() => {
    //keeping a reference to the current scrollHolderRef
    const currentScrollHolderRef = scrollHolderRef.current;

    const resizeObserver = new ResizeObserver(() => {
      const scrollWidth = currentScrollHolderRef.clientWidth;
      const contentWidth = currentScrollHolderRef.scrollWidth;

      const styleGroup = "group/holder";

      if (contentWidth > scrollWidth) {
        holderRef.current.classList.add(styleGroup);
      } else {
        holderRef.current.classList.remove(styleGroup);
      }
    });
    resizeObserver.observe(currentScrollHolderRef);
    return () => {
      resizeObserver.unobserve(currentScrollHolderRef);
    };
  }, []);

  function updateScrollControlsVisibility(scrollElement, controlsElementRef) {
    //position is on the left of scroll and equals 0 in the start
    const scrollPosition = scrollElement.scrollLeft;
    const scrollWidth = scrollElement.clientWidth;
    const contentWidth = scrollElement.scrollWidth;

    const style = "group-hover/holder:translate-x-0";

    //scroll is at the start
    if (scrollPosition <= 0) {
      controlsElementRef.left.classList.remove(style);
    } else {
      controlsElementRef.left.classList.add(style);
    }
    //scroll is at the end
    if (Math.ceil(scrollPosition) + scrollWidth >= contentWidth) {
      controlsElementRef.right.classList.remove(style);
    } else {
      controlsElementRef.right.classList.add(style);
    }
  }

  return (
    <div
      className="grid h-[150px] grid-cols-1 grid-rows-1 overflow-hidden border-y-2 border-black bg-neutral-800 shadow-[0_0_4px_5px_#3f3f3f]"
      ref={holderRef}
      onMouseEnter={() => {
        if (
          scrollHolderRef.current.scrollWidth >
          scrollHolderRef.current.clientWidth
        ) {
          holderRef.current.classList.add("group/holder");
        }
        updateScrollControlsVisibility(
          scrollHolderRef.current,
          controlsRef.current,
        );
      }}
      onMouseLeave={() => {
        holderRef.current.classList.remove("group/holder");
      }}
    >
      <Controls myRef={controlsRef} scrollHolder={scrollHolderRef}>
        <ul
          className="scroll-no-style z-[0] col-[1] row-[1] flex h-inherit select-none snap-x snap-mandatory scroll-p-4 gap-4 overflow-x-auto scroll-smooth px-4"
          ref={scrollHolderRef}
          onScroll={(e) => {
            updateScrollControlsVisibility(e.target, controlsRef.current);
          }}
        >
          {childrenRender}
        </ul>
      </Controls>
    </div>
  );
}
Default.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  controlsClassName: PropTypes.string,
  onClick: PropTypes.func,
};

function Controls({ children, scrollHolder, myRef }) {
  const controlsStyle =
    "group/control outline-none text-4xl px-2 col-[1] row-[1] z-[1] self-center bg-[#00000050] h-full hover:bg-[#00000090] transition-all";

  return (
    <>
      <button
        tabIndex="-1"
        ref={(ref) => (myRef.current.left = ref)}
        className={`${controlsStyle} -translate-x-full place-self-start`}
        onClick={() => {
          scrollHolder.current.scrollBy(-1, 0);
        }}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="transition-all group-hover/control:scale-125 [&>*]:text-white"
        />
      </button>
      {children}
      <button
        tabIndex="-1"
        ref={(ref) => (myRef.current.right = ref)}
        className={`${controlsStyle} translate-x-full place-self-end group-hover/holder:translate-x-0`}
        onClick={() => {
          scrollHolder.current.scrollBy(1, 0);
        }}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="transition-all group-hover/control:scale-125 [&>*]:text-white"
        />
      </button>
    </>
  );
}

Controls.propTypes = {
  children: PropTypes.element,
  scrollHolder: PropTypes.object,
  myRef: PropTypes.object,
};
