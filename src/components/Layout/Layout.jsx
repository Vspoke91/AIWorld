import { Outlet, Link, useLocation } from "react-router-dom";
import { ArrowSVG, BurgerLineSVG } from "../../assets/CustomIcons";
import { useState } from "react";
import { useRef } from "react";

const Layout = () => {
  const ariaHandler = () => {
    if (window.innerWidth > 1000) {
      return true;
    }
    return false;
  };

  const headerRef = useRef(null);
  const headerMobileRef = useRef(null);
  const [headerExpandedMobile, setHeaderExpandedMobile] = useState(true);

  const useLocationPath = () => {
    let newPathName = useLocation().pathname.slice(1);

    newPathName = newPathName === "" ? "home" : newPathName;

    newPathName =
      newPathName.charAt(0).toLocaleUpperCase() + newPathName.slice(1);

    return newPathName;
  };

  return (
    <div className="ml-[188px] flex h-screen flex-col">
      <header
        className="fixed inset-y-0 left-0 flex w-[188px] flex-col bg-neutral-800 shadow-[2px_0_5px_#000] 
        after:absolute after:left-[180px] after:top-[20%] after:z-[-1] after:h-fit after:w-[30px] after:rounded-r-lg after:bg-neutral-600 after:text-center after:font-fontawesome after:text-2xl after:content-['\f053']"
      >
        <Link
          to="/"
          className="list-button group flex flex-col items-center px-0 pb-0 pt-2 font-medium"
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
          className="mt-auto p-2 pb-3 text-center"
          cite="https://www.vox.com/future-perfect/2023/5/24/23735698/openai-sam-altman-ai-safety-legislation-risks-development-regulation"
        >
          <q>
            AI will probably most likely lead to the end of the world, but in
            the meantime, there&apos;ll be great companies
          </q>
          <cite className="block">- Sam Altman</cite>
        </blockquote>

        <div
          ref={headerRef}
          aria-expanded={ariaHandler()}
          id="header-holder"
          hidden
        >
          <div
            className="slider-control"
            onClick={() => {
              headerRef.current.setAttribute(
                "aria-expanded",
                headerRef.current.getAttribute("aria-expanded") !== "true",
              );
            }}
          >
            <ArrowSVG />
          </div>
        </div>
      </header>
      <main className="flex-grow">
        {/*
          <div
            ref={headerMobileRef}
            className="mobile-menu"
            aria-expanded="false"
          >
            <div className="menuHolder qs__flex_row qs__inherit_height">
              <Link to="/" className="logo">
                <img src="/img/logos/AI-World-Small.png" />
              </Link>

              <div
                className="slider-control"
                onClick={() => {
                  headerMobileRef.current.setAttribute(
                    "aria-expanded",
                    headerMobileRef.current.getAttribute("aria-expanded") !==
                      "true",
                  );
                  setHeaderExpandedMobile(
                    headerMobileRef.current.getAttribute("aria-expanded") !==
                      "true",
                  );
                }}
              >
                <BurgerLineSVG expanded={headerExpandedMobile} />{" "}
                <span>{useLocationPath()}</span>
              </div>
            </div>
            <div className="mobile-nav">
              <Link to="/">Home</Link>
              <Link to="/search">Search</Link>
              <Link to="/feedback">Feedback</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
           */}
        {/* TODO: outlet was here <Outlet />*/}
      </main>
      <footer className="h-[100px] w-full flex-shrink-0">
        <div className="opensource-div">
          <div>
            <p>Open Source Code</p>
            <a href="https://github.com/Vspoke91/AIWorld/blob/master/README.md">
              <img src="/img/logos/GitHub.svg" alt="Github Logo" />
            </a>
          </div>
        </div>
        <div className="velta-logo-div">
          <a href="https://www.veltaproject.com">
            <img
              src="https://veltaproject.com/VeltaLogo.png"
              alt="Velta Logo"
            />
          </a>
        </div>
        <div className="copyright-div">
          <p>© 2023 AI World, VeltaProject</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
