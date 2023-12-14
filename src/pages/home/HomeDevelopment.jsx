// React imports
import { useEffect, useState } from "react";

// Components imports
import DevItem from "./DevelopmentItem";

export default function Default() {
  const RELEASE_GITHUB_API =
    "https://api.github.com/repos/vspoke91/aiworld/releases";
  const [versionArrayList, setVersionArrayList] = useState(null);

  //fetch data from github
  useEffect(() => {
    fetch(`${RELEASE_GITHUB_API}`)
      .then((res) => res.json())
      .then((array) => setVersionArrayList(array));
  }, []);

  // const renderVersionSections = () => {
  //   const descriptionElementFormatter = (descriptionLine) => {
  //     const splitLine = descriptionLine.split("\r\n");
  //     return (
  //       <>
  //         {splitLine.map((line, index) => {
  //           const titleRegex = /^##.*/;
  //           const boldRegex = /\*\*.*?\*\*/g;
  //           const tableRegex = /^\* |\+ /;

  //           let checkBold = (line) => {
  //             let boldedWordsArray = line.match(boldRegex);

  //             if (boldedWordsArray != null) {
  //               boldedWordsArray = boldedWordsArray.map((str) =>
  //                 str.slice(2, -2),
  //               );

  //               let newLineArray = [];
  //               let splitLineArray = line
  //                 .split("**")
  //                 .filter((str) => str.trim() !== "");

  //               for (let i = 0; i < splitLineArray.length; i++) {
  //                 let pushedString = splitLineArray[i];
  //                 for (let j = 0; j < boldedWordsArray.length; j++) {
  //                   if (splitLineArray[i] === boldedWordsArray[j]) {
  //                     pushedString = (
  //                       <strong key={"bold-" + j}>{splitLineArray[i]}</strong>
  //                     );
  //                     break;
  //                   }
  //                 }
  //                 newLineArray.push(pushedString);
  //               }
  //               return newLineArray;
  //             } else {
  //               return line;
  //             }
  //           };

  //           if (line.match(titleRegex)) {
  //             line = line.slice(2);
  //             return (
  //               <span key={"header2-" + index} className="description-header2">
  //                 {checkBold(line)}
  //                 <br />
  //               </span>
  //             );
  //           } else if (line.match(tableRegex)) {
  //             line = line.slice(2);
  //             return (
  //               <li key={"table-" + index} className="description-table">
  //                 {checkBold(line)}
  //                 <br />
  //               </li>
  //             );
  //           }

  //           return (
  //             <span key={"line-" + index}>
  //               {checkBold(line)}
  //               <br />
  //             </span>
  //           );
  //         })}
  //       </>
  //     );
  //   };

  //   return githubVersionState.length ? (
  //     githubVersionState.map((value, index) => (
  //       <div key={index} className="item-holder">
  //         <div className="qs__flex_row __flex_center qs__height_fit_content">
  //           <a
  //             className="title-part"
  //             href={value.html_url}
  //             target="_blank"
  //             rel="noreferrer"
  //           >
  //             <h3>{value.name}</h3>
  //           </a>
  //           <p className="version-part">{value.tag_name}</p>
  //         </div>
  //         <br />
  //         <div className="qs__flex_row __flex_left_Low">
  //           <p className="dateA-part">
  //             Released:{" "}
  //             {new Date(value.published_at).toLocaleDateString("en-US")}
  //           </p>
  //           <p className="dateB-part">
  //             {formatDistanceToNow(new Date(value.published_at), {
  //               addSuffix: true,
  //             })}
  //           </p>
  //         </div>
  //         <hr />
  //         <div className="description-part">
  //           {descriptionElementFormatter(value.body)}
  //         </div>
  //       </div>
  //     ))
  //   ) : (
  //     <>
  //       <p className="loading-text">Loading Updates...</p>
  //     </>
  //   );
  // };

  return (
    <>
      <h2 className="my-3 text-center text-3xl font-bold">
        Development & Updates
      </h2>
      <ul className="mx-auto flex max-w-[900px] flex-col gap-2">
        {versionArrayList ? (
          versionArrayList.map((value, index) => (
            <DevItem key={index} infoObject={value} />
          ))
        ) : (
          <>Loading...</>
        )}
      </ul>
    </>
  );
}
