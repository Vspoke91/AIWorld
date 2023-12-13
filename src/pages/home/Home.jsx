// React imports
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

// Components imports
import Featured from "./HomeFeatured";
import Introduction from "./HomeIntro";

function Home() {
  return (
    <>
      <div>
        <Featured />
      </div>
      <div className="my-[10vh] flex items-center justify-center gap-14">
        <Introduction />
      </div>
      <div id="DevelopmentSection">
        <Development />
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
