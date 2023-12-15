export default function Default({ mdText }) {
  const mdTextArray = mdText.split("\r\n");
  const elements = {
    "##": function (text) {
      return <p className="text-xl font-bold">{text}</p>;
    },
    li: function (text) {
      return <li className="text-sm">{text}</li>;
    },
    p: function (text) {
      return <p className="text-base">{text}</p>;
    },
    br: <br />,
  };

  const htmlArray = mdTextArray.map((line) => {
    if (line.match(/^##.*/)) {
      const cleanText = line.replace(/^##/, "");
      return elements["##"](checkFont(cleanText));
    } else if (line.match(/^\* |\+ /)) {
      const cleanText = line.replace(/^\* |\+ /, "");
      return elements["li"](checkFont(cleanText));
    } else if (!line.length) {
      return elements["br"];
    } else {
      return elements["p"](checkFont(line));
    }
  });

  return htmlArray;
}

function checkFont(line) {
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
