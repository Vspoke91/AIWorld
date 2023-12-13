// React Imports
import { Link } from "react-router-dom";

// Icon imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Default() {
  const sideLinksStyles = {
    aTag: "perspective-50 group grid h-[150px] w-[150px] grid-cols-1 grid-rows-1 overflow-hidden rounded-lg border-4 border-neutral-600 bg-neutral-900",
    imgTag: "w-full z-0 col-[1] row-[1] h-full p-2",
    textBoxDiv:
      "z-[1] col-[1] row-[1] h-full w-full bg-[#000000bf] opacity-0 transition-all group-hover:opacity-100 group-focus-visible:opacity-100",
    spanTag: "my-2 block text-center text-xl font-bold",
    pTag: "mx-2 text-center text-sm",
  };

  return (
    <>
      <div className="w-[500px]">
        <h1 className="mx-auto text-center text-5xl font-bold">
          The best place to find AI tools, all in one place.
        </h1>
        <p className="mx-auto mt-[10px] text-center">
          <strong className="text-orange-500">AI World</strong> is a{" "}
          <strong>AI tools hub</strong> to facilitate the search of tools in the
          web. Explore a variety of tools that use AI to{" "}
          <strong>generate</strong> amazing graphics, <strong>write</strong>{" "}
          engaging texts, and <strong>chat</strong> with you on any topic.
        </p>
        <Link
          to="/search"
          className="palet-orange! basic-button group mx-auto mt-[20px] block w-fit text-xl hover:scale-105"
        >
          Explore AI Tools
          <FontAwesomeIcon
            icon={faChevronRight}
            className="group-hover:animate-rocketRightOutIn ml-1 [&>*]:text-white"
          />
        </Link>
      </div>

      <div className="grid h-fit grid-flow-col grid-cols-[repeat(2,37.5px)] grid-rows-3 gap-y-5">
        <a
          href="https://www.bluewillow.ai/"
          target="_blank"
          rel="noreferrer"
          title="Go to BlueWillow"
          className={`${sideLinksStyles.aTag} col-[1] row-[1]`}
        >
          <img
            className={sideLinksStyles.imgTag}
            src="https://firebasestorage.googleapis.com/v0/b/ai-world-eae98.appspot.com/o/Logos%2FBlueWillow.png?alt=media&token=da9910cf-6c39-4436-a72c-380411f9f46c"
          />
          <div
            className={`${sideLinksStyles.textBoxDiv} group-hover:rotate-x-0 -rotate-x-90 group-focus-visible:rotate-x-0 origin-top`}
          >
            <span className={sideLinksStyles.spanTag}>BlueWillow</span>
            <p className={sideLinksStyles.pTag}>
              State-of-the-art artificial intelligence
              <strong> image generator</strong>
            </p>
          </div>
        </a>
        <a
          href="https://chat.openai.com/"
          target="_blank"
          rel="noreferrer"
          title="Go to ChatGPT"
          className={`${sideLinksStyles.aTag} col-[3] row-[2]`}
        >
          <img
            className={sideLinksStyles.imgTag}
            src="https://firebasestorage.googleapis.com/v0/b/ai-world-eae98.appspot.com/o/Logos%2FChatGPT.svg?alt=media&token=2f18a303-41ec-492e-ba79-3c31b32a4753"
          />
          <div
            className={`${sideLinksStyles.textBoxDiv} origin-right -rotate-y-90 group-hover:rotate-y-0 group-focus-visible:rotate-y-0`}
          >
            <span className={sideLinksStyles.spanTag}>ChatGPT</span>
            <p className={sideLinksStyles.pTag}>
              Natural language AI <strong>chatbot</strong> based on
              OpenAI&apos;s GPT-3.5
            </p>
          </div>
        </a>
        <a
          href="https://www.phind.com/"
          target="_blank"
          rel="noreferrer"
          title="Go to Phind"
          className={`${sideLinksStyles.aTag} col-[2] row-[3]`}
        >
          <img
            className={sideLinksStyles.imgTag}
            src="https://firebasestorage.googleapis.com/v0/b/ai-world-eae98.appspot.com/o/Logos%2FPhind.png?alt=media&token=51c09dd3-22ea-4b62-b5b5-b121882a69ce"
          />
          <div
            className={`${sideLinksStyles.textBoxDiv} rotate-x-90 group-hover:rotate-x-0 group-focus-visible:rotate-x-0 origin-bottom`}
          >
            <span className={sideLinksStyles.spanTag}>Phind</span>
            <p className={sideLinksStyles.pTag}>
              Generative AI search engine for <strong>developers</strong>.
            </p>
          </div>
        </a>
      </div>
    </>
  );
}
