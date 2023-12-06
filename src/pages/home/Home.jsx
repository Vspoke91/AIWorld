// React imports
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
// Components imports
import Featured from "./HomeFeatured";

function Home() {
  return (
    <>
      <div id="FeaturedSection">
        <Featured />
      </div>
      <div id="IntroductionSection">
        <Introduction />
        <span className="hidden-tittle">AI World</span>
      </div>
      <div id="DevelopmentSection">
        <Development />
      </div>
    </>
  );
}

function Introduction() {
  return (
    <>
      <div className="description-holder">
        <h1>
          The best place to find AI tools to create graphics, code, and chat.
        </h1>
        <p>
          AI-World is a <strong>AI tools hub</strong> to facilitate the search
          of tools in the web. Explore a variety of tools that use AI to
          generate amazing graphics, write engaging texts, and chat with you on
          any topic.
        </p>
        <Link to="/search">
          <button>Search Websites</button>
        </Link>
      </div>

      <div className="items-holder">
        <div className="item item-graphic">
          <img src="https://firebasestorage.googleapis.com/v0/b/ai-world-eae98.appspot.com/o/Logos%2FBlueWillow.png?alt=media&token=da9910cf-6c39-4436-a72c-380411f9f46c" />
          <a href="https://www.bluewillow.ai/" target="_black" rel="noreferrer">
            <span>BlueWillow</span>
            <p>
              State-of-the-art artificial intelligence{" "}
              <strong>image generator</strong>.
            </p>
          </a>
        </div>
        <div className="item item-chat">
          <img src="https://firebasestorage.googleapis.com/v0/b/ai-world-eae98.appspot.com/o/Logos%2FChatGPT.svg?alt=media&token=2f18a303-41ec-492e-ba79-3c31b32a4753" />
          <a href="https://chat.openai.com/" target="_blank" rel="noreferrer">
            <span>ChatGPT</span>
            <p>
              Natural language AI <strong>chatbot</strong> based on
              OpenAI&apos;s GPT-3.5.
            </p>
          </a>
        </div>
        <div className="item item-code">
          <img src="/img/logos/Phind.png" />
          <a
            href="https://firebasestorage.googleapis.com/v0/b/ai-world-eae98.appspot.com/o/Logos%2FPhind.png?alt=media&token=51c09dd3-22ea-4b62-b5b5-b121882a69ce"
            target="_blank"
            rel="noreferrer"
          >
            <span>Phind</span>
            <p>
              Generative AI search engine for <strong>developers</strong>.
            </p>
          </a>
        </div>
      </div>
    </>
  );
}

function Development() {
  const RELEASE_GITHUB_API =
    "https://api.github.com/repos/vspoke91/aiworld/releases";
  const [githubVersionState, setGithubVersionState] = useState([]);
  //TODO: find a way to fetch data from url

  useEffect(() => {
    fetch(`${RELEASE_GITHUB_API}`)
      .then((res) => res.json())
      .then((array) => setGithubVersionState(array));
  }, []);

  const renderVersionSections = () => {
    const descriptionElementFormatter = (descriptionLine) => {
      const splitLine = descriptionLine.split("\r\n");
      return (
        <>
          {splitLine.map((line, index) => {
            const titleRegex = /^##.*/;
            const boldRegex = /\*\*.*?\*\*/g;
            const tableRegex = /^\* |\+ /;

            let checkBold = (line) => {
              let boldedWordsArray = line.match(boldRegex);

              if (boldedWordsArray != null) {
                boldedWordsArray = boldedWordsArray.map((str) =>
                  str.slice(2, -2),
                );

                let newLineArray = [];
                let splitLineArray = line
                  .split("**")
                  .filter((str) => str.trim() !== "");

                for (let i = 0; i < splitLineArray.length; i++) {
                  let pushedString = splitLineArray[i];
                  for (let j = 0; j < boldedWordsArray.length; j++) {
                    if (splitLineArray[i] === boldedWordsArray[j]) {
                      pushedString = (
                        <strong key={"bold-" + j}>{splitLineArray[i]}</strong>
                      );
                      break;
                    }
                  }
                  newLineArray.push(pushedString);
                }
                return newLineArray;
              } else {
                return line;
              }
            };

            if (line.match(titleRegex)) {
              line = line.slice(2);
              return (
                <span key={"header2-" + index} className="description-header2">
                  {checkBold(line)}
                  <br />
                </span>
              );
            } else if (line.match(tableRegex)) {
              line = line.slice(2);
              return (
                <li key={"table-" + index} className="description-table">
                  {checkBold(line)}
                  <br />
                </li>
              );
            }

            return (
              <span key={"line-" + index}>
                {checkBold(line)}
                <br />
              </span>
            );
          })}
        </>
      );
    };

    return githubVersionState.length ? (
      githubVersionState.map((value, index) => (
        <div key={index} className="item-holder">
          <div className="qs__flex_row __flex_center qs__height_fit_content">
            <a
              className="title-part"
              href={value.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <h3>{value.name}</h3>
            </a>
            <p className="version-part">{value.tag_name}</p>
          </div>
          <br />
          <div className="qs__flex_row __flex_left_Low">
            <p className="dateA-part">
              Released:{" "}
              {new Date(value.published_at).toLocaleDateString("en-US")}
            </p>
            <p className="dateB-part">
              {formatDistanceToNow(new Date(value.published_at), {
                addSuffix: true,
              })}
            </p>
          </div>
          <hr />
          <div className="description-part">
            {descriptionElementFormatter(value.body)}
          </div>
        </div>
      ))
    ) : (
      <>
        <p className="loading-text">Loading Updates...</p>
      </>
    );
  };

  return (
    <>
      <h2>Development & Updates</h2>
      <div>{renderVersionSections()}</div>
    </>
  );
}

export default Home;
