// Icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faXTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

// React imports
import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <div className="mx-auto mt-[50px] max-w-[800px] px-4">
        <a
          title="Go to Velta Project"
          className="group mx-auto grid h-[250px] w-[250px] grid-cols-1 grid-rows-1"
          href="https://veltaproject.com/"
        >
          <img
            src="/img/logos/AI-World-Large.png"
            className="h-inherit rounded-full shadow-[0_0_11px_black] transition-all delay-200 
            duration-200 ease-linear rotate-y-0 group-hover:delay-0 group-hover:rotate-y-90
            group-focus-visible:delay-0 group-focus-visible:rotate-y-90"
          />
          <img
            src="https://veltaproject.com/VeltaLogo.png"
            className="h-inherit rounded-full bg-black shadow-[0_0_11px_black] transition-all delay-0 
            duration-200 ease-linear rotate-y-90 group-hover:delay-200 group-hover:rotate-y-0
            group-focus-visible:delay-200 group-focus-visible:rotate-y-0"
          />
        </a>
        <h1 className="mt-4 text-center font-mono text-2xl">
          Stay Connected with AI!
        </h1>
        <p className="mt-2">
          At AIWorld, we believe that&nbsp;
          <strong>
            artificial intelligence can make your life easier, smarter, and more
            fun.
          </strong>
          &nbsp;That&apos;s why we created a platform that connects you with the
          best AI-powered websites for your personal, academic, and professional
          needs. Whether you want to find a new recipe, write an essay, or
          design a logo, <strong>we have the right AI tool for you.</strong>
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-[800px] px-4 [@media(max-width:700px)]:flex-col [@media(max-width:700px)]:gap-2">
        <div className="flex-1">
          <h2 className="mb-1 text-lg font-bold">Check our latest news!</h2>
          <ul className="flex">
            <li title="Instagram">
              <a href="https://www.instagram.com/veltaproject/">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-4xl transition-all hover:scale-110"
                />
              </a>
            </li>
            <li title="Twitter">
              <a href="https://twitter.com/veltaproject">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="text-4xl transition-all hover:scale-110"
                />
              </a>
            </li>
            <li title="Github">
              <a href="https://github.com/veltaproject">
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-4xl transition-all hover:scale-110"
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold">Open Source</h2>
          <p className="text-sm">
            AIWorld is an open-source project. If you want to contribute, check
            out our&nbsp;
            <a
              href="https://github.com/Vspoke91/AIWorld"
              className="text-blue-600 hover:underline"
            >
              GitHub repository
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mx-auto mb-10 mt-[50px] max-w-[800px] px-4">
        <h2 className="text-lg font-bold">
          Question or Feedback? let us know!
        </h2>
        <ul>
          <li className="group">
            <a
              href="mailto:aiworld@veltaproject.com?subject=Question/Feedback!"
              className="flex w-fit items-center text-xl hover:underline"
              title="Send Email"
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className="group-hover:scale-110"
              />
              <span className="pl-2 text-base">aiworld@veltaproject.com</span>
            </a>
          </li>
          <li className="mt-3">
            <Link
              to="/feedback"
              className="palet-orange! rounded-xl px-2 py-1 text-white"
            >
              <span className="pr-2 font-bold">Go to feedback</span>
              <FontAwesomeIcon icon={faCircleArrowRight} />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default About;
