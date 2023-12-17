import React from "react";

export default function Default({
  mdText,
  headerTwoStyle = "text-xl font-bold",
  listStyle = "",
  linkStyle = "underline",
}) {
  const mdTextArray = mdText.split("\r\n");

  function formatMDText(mdTextArray) {
    const mdObject = {
      "##": {
        regex: /^## (.*)/,
        match: function (text) {
          return this.regex.test(text);
        },
        clean: function (text) {
          return text.replace(this.regex, "$1");
        },
        element: (text, index) => {
          return (
            <p key={index} className={headerTwoStyle}>
              {text}
            </p>
          );
        },
      },
      li: {
        regex: /^\* |\+ (.*)/,
        match: function (text) {
          return this.regex.test(text);
        },
        clean: function (text) {
          return text.replace(this.regex, "$1");
        },
        element: (text, index) => (
          <li key={index} className={listStyle}>
            {text}
          </li>
        ),
      },
      br: {
        match: (text) => !text.length,
        element: (_, index) => <br key={index} />,
      },
      //always the last to check
      p: {
        match: () => true,
        element: (text, index) => (
          <p key={index} className="text-base">
            {text}
          </p>
        ),
      },
    };

    const ulArray = [];
    return mdTextArray.map((line, index) => {
      //loop through mdObject to find a match
      for (let key in mdObject) {
        let element = null;

        if (mdObject[key].match(line)) {
          //if mdObject[key].clean is undefined, it will return the line as is else it will return the clean line
          const cleanLine = mdObject[key].clean
            ? mdObject[key].clean(line)
            : line;

          element = mdObject[key].element(
            formatTextWithTags(cleanLine),
            `${key}-${index}`,
          );

          //if key is li, push element to ulArray
          if (key === "li") {
            ulArray.push(element);
            return null;
          }
          //if key is something else, return ulArray and element to finish the list
          else if (ulArray.length) {
            //make a copy of ulArray and empty ulArray
            const copyUlArray = [...ulArray];
            ulArray.length = 0;

            //return ulArray and element
            const ulElement = <ul key={`ul-${index}`}>{copyUlArray}</ul>;
            return [ulElement, element];
          }

          return element;
        }
      }
    });
  }

  function formatTextWithTags(line) {
    const tags = {
      bold: {
        regex: /(\*\*.+?\*\*)/g,
        match: function (text) {
          return this.regex.test(text);
        },
        clean: function (text) {
          return text.replace(/\*\*/g, "");
        },
        element: function (text, index) {
          return <strong key={index}>{text}</strong>;
        },
      },
      link: {
        regex: /(https?:\/\/[^\s]*(?<!\*)\b)/g,
        match: function (text) {
          return text.match(this.regex);
        },
        element: function (text, index) {
          return (
            <a key={index} href={text} className={linkStyle}>
              {text}
            </a>
          );
        },
      },
    };

    const formatedArray = [];

    // Main loop to handle line
    for (const text of line.split(tags.bold.regex)) {
      handleText(text);
    }

    // Main function to handle each text
    function handleText(text) {
      let textFragment = null;

      if (tags.bold.match(text)) {
        textFragment = handleBoldText(text);
      } else if (tags.link.match(text)) {
        textFragment = handleLinkText(text);
      } else {
        textFragment = text;
      }
      formatedArray.push(textFragment);
    }

    // Function to handle bold text
    function handleBoldText(text) {
      let cleanText = tags.bold.clean(text);

      //if link is matched in cleanText, create a link with cleanText
      if (tags.link.match(cleanText)) {
        cleanText = tags.link.element(cleanText);
      }

      return tags.bold.element(cleanText);
    }

    // Function to handle link text
    function handleLinkText(textFragment) {
      let refragmentedText = [];

      //textFragment gets refragmented to replace links with link elements

      textFragment.split(tags.link.regex).forEach((text, index) => {
        if (tags.link.match(text)) {
          refragmentedText.push(tags.link.element(text, index));
        } else {
          refragmentedText.push(text);
        }
      });
      return refragmentedText;
    }

    return (
      <>
        {formatedArray.map((item, index) => {
          return <React.Fragment key={index}>{item}</React.Fragment>;
        })}
      </>
    );
  }

  return formatMDText(mdTextArray);
}
