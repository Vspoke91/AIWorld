import React from "react";

export default function Default({ mdText }) {
  const mdTextArray = mdText.split("\r\n");
  const mdObject = {
    "##": {
      match: (text) => /^##.*/.test(text),
      element: (text, index) => (
        <p key={index} className="text-xl font-bold">
          {text.replace(/^##/, "")}
        </p>
      ),
    },
    li: {
      match: (text) => /^\* |\+ /.test(text),
      element: (text, index) => (
        <p key={index} className="text-base">
          {text.replace(/^\* |\+ /, "")}
        </p>
      ),
    },
    br: {
      match: (text) => !text.length,
      element: (_, index) => <br key={index} />,
    },
    p: {
      match: () => true,
      element: (text, index) => (
        <p key={index} className="text-base">
          {text}
        </p>
      ),
    },
  };

  const htmlArray = mdTextArray.map((line, index) => {
    for (let key in mdObject) {
      if (mdObject[key].match(line)) {
        return mdObject[key].element(
          formatTextWithTags(line),
          `${key}-${index}`,
        );
      }
    }
  });

  return htmlArray;
}

function formatTextWithTags(line) {
  const fonts = {
    bold: {
      regex: /\*\*(.*?)\*\*/g,
      element: function (text) {
        return <strong>{text}</strong>;
      },
      replace: function (text) {
        return text.replace(/\*\*/g, (_, capturedText) => {
          return <strong>{capturedText}</strong>;
        });
      },
    },
  };

  if (line.match(fonts.bold.regex)) {
    const boldWordsArray = [];

    /** split the line by taking out bolded words and pushing them to boldWordsArray
     *  exp:
     *  splitedArray = "This is a **bold** text" => ["This is a "," text"]
     *  boldWordsArray = ["bold"]
     */
    const splitedArray = line
      //reaplce **bold** words with ****
      .replace(fonts.bold.regex, (_, capturedText) => {
        boldWordsArray.push(capturedText);
        return "****";
      })
      //split the string with ****
      .split("****");

    return (
      <>
        {boldWordsArray.map((word, index) => {
          //get the text before the bold word (if line starts with a bold word, it will be an empty string)
          const beforeBoldText = splitedArray[index];
          //create the bold element
          const boldElement = <strong>{word}</strong>;

          /** get the text after the bold word if it's the last bold word in the line
           *  exp:
           *  "This is a **bold** text"
           *   lastText = " text"
           */
          const lastText =
            index + 1 === boldWordsArray.length && splitedArray[index + 1];

          return (
            <React.Fragment key={index}>
              {beforeBoldText}
              {boldElement}
              {lastText}
            </React.Fragment>
          );
        })}
      </>
    );
  }

  return line;
}
