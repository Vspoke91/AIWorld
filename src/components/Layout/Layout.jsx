import { Outlet, Link, useLocation } from "react-router-dom";
import { ArrowSVG, BurgerLineSVG } from "../../assets/CustomIcons";
import { useState } from "react";
import { useRef } from "react";

const Layout = () => {
  const title = Array.from("AI World");
  let alphabetArray = Array.from("abcdefghijklmnopqrstuvwxyz");

  //START OF TODO: this need better performance. crashes if do too fast
  let interval = null;
  let [titleChanger, setTitleChanger] = useState(title);

  let tittleAnimation = () => {
    let interations = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      setTitleChanger(
        title.map((letter, index) => {
          if (index < interations) {
            return title[index];
          }

          return alphabetArray[Math.floor(Math.random() * 26)];
        }),
      );

      if (interations >= title.length) clearInterval(interval);

      interations += 1 / 4;
    }, 30);
  };
  //END OF TODO

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
    <>
      <div ref={headerRef} aria-expanded={ariaHandler()} id="header-holder">
        <header className="qs__flex_column">
          <Link
            to="/"
            className="logo qs__flex_column __flex_center"
            onMouseEnter={tittleAnimation}
          >
            <img src="/img/logos/AI-World-Small.png" />
            <span className="title">{titleChanger}</span>
          </Link>

          <nav className="qs__flex_column __flex_center">
            <Link to="/search">Search</Link>
            <Link to="/feedback">Feedback</Link>
            <Link to="/about">About</Link>
          </nav>

          <div className="quote-div">
            <p>
              Artificial intelligence is the next stage in the evolution of
              human beings
            </p>
            <span>Stephen Hawking</span>
          </div>
        </header>
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

      <div className="qs__sidebar_spacing qs__flex_column qs__height_full_percent qs_scroll_y qs_animation">
        <main>
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
          <Outlet />
        </main>

        <footer>
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
    </>
  );
};

export default Layout;
