// Icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faXTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

// React imports
import { Link } from "react-router-dom";

export default function Default() {
  return (
    <footer
      className={`peer-aria-expanded/header:ml-custom_header flex flex-shrink-0 flex-col gap-1 bg-stone-900 px-5 pb-5 pt-2 transition-all`}
    >
      <div className="flex items-center [@media(max-width:700px)]:flex-col">
        <div className="flex-[0.5]">
          <p className="font-mono text-lg font-bold">Follow Us</p>
          <ul className="flex gap-1">
            <li title="Instagram">
              <a href="">
                <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
              </a>
            </li>
            <li title="Twitter">
              <a href="">
                <FontAwesomeIcon icon={faXTwitter} className="text-2xl" />
              </a>
            </li>
            <li title="Github">
              <a href="">
                <FontAwesomeIcon icon={faGithub} className="text-2xl" />
              </a>
            </li>
          </ul>
        </div>
        <nav className="flex flex-1 justify-center p-2">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/database">Database</Link>
            </li>
          </ul>
        </nav>
        <div className="flex-[0.5] [@media(max-width:850px)]:hidden" />
      </div>
      <div className="text-center">
        <p>
          <span>&copy; 2023, </span>
          <a
            href="http://www.veltaproject.com"
            className="text-blue-600 underline"
          >
            VeltaProject
          </a>
          <span>
            . All rights reserved. AIWorld is a trademark of VeltaProject.
          </span>
        </p>
      </div>
    </footer>
  );
}
