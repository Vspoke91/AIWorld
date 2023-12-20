// React Imports
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Icons Imports
import { ExitSVG } from "../../assets/CustomIcons";
// Data Imports
import { default as database } from "@Data/firebase";
// Components Imports
import SortingBar from "./SearchFilterBar";

function Search() {
  //updating this state will update the sorting buttons, sorting checkboxes and the cards
  const [activeCategories, setActiveCategories] = useState([]);

  return (
    <>
      <SortingBar
        activeCategoriesState={[activeCategories, setActiveCategories]}
      />

      <MainCards sortingButtonNames={activeCategories} />
    </>
  );
}

function MainCards({ sortingButtonNames }) {
  //--DATABASE--//
  let [websitesData, setWebsitesData] = useState([]);

  useEffect(() => {
    (async function () {
      setWebsitesData(await database.getWebsites());
    })();
  }, []);
  //-|DATABASE|-//

  //state used in showDiv to be able to update when a different card is pressed
  let [showDivState, setShowDivState] = useState({
    display: false,
    title: "*Name*",
    logoPath: "*Path*",
    description: "*Description*",
    tag: {},
    categories: [],
    webLink: "",
  });

  //loads all new variables from index of card pressed
  let loadDisplayShowDiv = (index) => {
    setShowDivState({
      display: true,
      title: websitesData[index].name,
      logoPath: websitesData[index].logoUrl,
      description: websitesData[index].description,
      tag: websitesData[index].tag,
      categories: websitesData[index].categories,
      webLink: websitesData[index].webLink,
    });
  };

  //state used in useEffect to update the list of cards in main to match the filter (sortingbuttonNames)
  let [sortedCards, setSortedCards] = useState([]);

  //useEffect used to update when sortingButtonsNames (sorted names) is change
  useEffect(() => {
    //run code only if websiteData is not empty
    if (websitesData.length) {
      let renderCards = () => {
        //return a element card
        let getCardElement = (
          { name, description, tag, categories, logoUrl },
          index,
        ) => {
          return (
            <div
              key={index}
              className="content-div"
              onClick={() => {
                loadDisplayShowDiv(index);
              }}
            >
              <span className="tag" style={{ backgroundColor: tag.color }}>
                {tag.text}
              </span>
              <h2>{name}</h2>

              <div className="img-div">
                <img src={logoUrl} alt={name + " Logo"} />
              </div>

              <div className="category-div">
                {categories.map((category, index) => (
                  <span key={index}>
                    {typeof category === "object"
                      ? category.text
                      : "No Category"}
                  </span>
                ))}
              </div>

              <div className="description">
                <p>{description}</p>
              </div>
            </div>
          );
        };

        //return card element array
        let cardElements = websitesData
          .map((websiteObject, index) => {
            if (
              hasEveryMatchingCategories(
                sortingButtonNames,
                websiteObject.categories,
              )
            )
              return getCardElement(websiteObject, index);

            //map returns items that were set to nothing as undefined, filter will return a new array with items != (not equals) undefined
          })
          .filter((item) => item != undefined);

        return cardElements;
      };

      setSortedCards(renderCards());
    }
  }, [websitesData, sortingButtonNames]);

  //hasEvery finds all cards that has only the selected filters
  function hasEveryMatchingCategories(selectedNamesArray, cardCategories) {
    const cardCategoriesArray = cardCategories.map((item) => item.text);
    return selectedNamesArray.every((item) =>
      cardCategoriesArray.includes(item),
    );
  }

  return (
    <>
      {sortedCards.length ? (
        sortedCards
      ) : (
        <p className="not-found">
          Nothing was found! please change filter options
        </p>
      )}

      <div
        id="backgroundBlur"
        className="background-blur"
        style={{ display: showDivState.display ? "block" : "none" }}
        onClick={() => setShowDivState({ ...showDivState, display: false })}
      ></div>

      <div
        id="showElement"
        className={`show-Div${showDivState.display ? " show-animate" : ""}`}
        style={{ display: showDivState.display ? "block" : "none" }}
      >
        <button
          className={`exit-button${
            showDivState.display ? " show-animate" : ""
          }`}
          onClick={() => setShowDivState({ ...showDivState, display: false })}
        >
          <ExitSVG />
        </button>

        <div className="show-title-div">
          <h2>
            <a href={showDivState.webLink}>{showDivState.title}</a>
          </h2>
          <span
            className="tag"
            style={{ backgroundColor: showDivState.tag.color }}
          >
            {showDivState.tag.text}
          </span>
        </div>

        <div className="img-div">
          <img src={showDivState.logoPath} alt={showDivState.title + " Logo"} />
        </div>

        <div className="category-div">
          {showDivState.categories.map((category, index) => (
            <span key={index}>{category.text}</span>
          ))}
        </div>

        <div className="description">
          <p>{showDivState.description}</p>
        </div>
      </div>
    </>
  );
}

MainCards.propTypes = {
  sortingButtonNames: PropTypes.array.isRequired,
};

export default Search;
