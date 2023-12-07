// Icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

// React imports
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Default() {
  // React Variables
  const [ariaExpanded, setAriaExpanded] = useState(true);

  return (
    <div
      className={`group/header peer/header fixed z-[2] h-full w-custom_header -translate-x-full transition-all aria-expanded:translate-x-0`}
      aria-expanded={ariaExpanded}
    >
      <header className="fixed z-[2] flex h-[inherit] w-[inherit] flex-col bg-neutral-800 shadow-[10px_0_5px_#000] group-aria-expanded/header:shadow-[2px_0_5px_#000]">
        <Link
          to="/"
          className="list-button group flex flex-col items-center px-0 pb-0 pt-2 font-medium"
          title="Go to Home Page"
        >
          <img
            className="h-[75px] w-[75px]"
            src="/img/logos/AI-World-Small.png"
          />
          <span className="gradient-text group-hover:gradient-white_orange-stripes group-focus-visible:gradient-white_orange-stripes bg-white bg-50 font-Bruno_Ace_SC text-2xl group-hover:animate-[sliderbg_2s_linear_infinite_reverse] group-focus-visible:animate-[sliderbg_2s_linear_infinite_reverse]">
            AI World
          </span>
        </Link>

        <nav className="mt-[30px] flex flex-col items-center">
          <Link
            className="list-button palet-gray_dark! pl-[10%] text-lg font-semibold text-inherit"
            to="/search"
          >
            Search
          </Link>
          <Link
            className="list-button palet-gray_dark! pl-[10%] text-lg font-semibold text-inherit"
            to="/feedback"
          >
            Feedback
          </Link>
          <Link
            className="list-button palet-gray_dark! pl-[10%] text-lg font-semibold text-inherit"
            to="/about"
          >
            About
          </Link>
        </nav>

        <blockquote
          className="mt-auto p-2 pb-3 text-center [@media(max-height:475px)]:hidden"
          cite="https://www.vox.com/future-perfect/2023/5/24/23735698/openai-sam-altman-ai-safety-legislation-risks-development-regulation"
        >
          <q>
            AI will probably most likely lead to the end of the world, but in
            the meantime, there&apos;ll be great companies
          </q>
          <cite className="block">- Sam Altman</cite>
        </blockquote>
      </header>
      <button
        title="Toggle Menu"
        className="palet-gray! absolute right-0 top-[50px] z-[3] flex translate-x-full rounded-r-md outline-none transition-all
        focus-visible:bg-custom_colors_highlight group-aria-expanded/header:z-[1] group-aria-expanded/header:translate-x-0 
        group-aria-expanded/header:focus-visible:translate-x-full group-aria-expanded/header:group-hover/header:translate-x-full"
        onClick={() => {
          setAriaExpanded((prev) => !prev);
        }}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="y-1 mx-2 my-1 text-center text-2xl transition-all delay-200 duration-500 ease-in-out group-aria-expanded/header:rotate-y-180 [&>path]:fill-white"
        />
      </button>
    </div>
  );
}
