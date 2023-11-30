import { useEffect, useState } from "react";
import { FilterSVG, ExitSVG } from "../../assets/CustomIcons";
import PropTypes from "prop-types";
import { default as database } from "@Data/firebase";

function Search() {
  //useState for sorting names that will be use to create buttons and change main when filterting
  let [sortingButtonNames, setSortingButtonNames] = useState([]);

  return (
    <>
      <div className="qs__flex_column __flex_extend">
        <div id="filter">
          <Sorting
            sortingButtonNames={sortingButtonNames}
            setSortingButtonNames={setSortingButtonNames}
          />
        </div>

        <div id="cards">
          <MainCards sortingButtonNames={sortingButtonNames} />
        </div>
      </div>
    </>
  );
}

function Sorting({ sortingButtonNames, setSortingButtonNames }) {
  //--DATABASE--//
  let [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function () {
      setCategories(await database.getCategories());
    })();
  }, []);
  //-|DATABASE|-//

  //created buttons from sortingButtonNames array and return them as elements array for DOM
  const renderSortingButtons = () => {
    return sortingButtonNames.map((buttonName) => (
      <button key={buttonName} onClick={buttonClickHandler}>
        {buttonName}
      </button>
    ));
  };

  //create checkbox from categories(sitesDataBase) and return them as elements array for DOM
  const renderSortingCheckBoxes = (categoriesArray) => {
    return (
      <>
        {Object.keys(categoriesArray).map((key) => (
          <label className="item" key={key}>
            <input
              type="checkbox"
              name={categoriesArray[key].text} //name attribute is used to name buttons and to find input checkbox
              onChange={checkboxChangeHandler}
            />

            {categoriesArray[key].text}
          </label>
        ))}
      </>
    );
  };

  //if button is click it will filter out its name out of sortingButtonNames so it will unrender, plus uncheck checkbox with the same name
  const buttonClickHandler = (event) => {
    const buttonName = event.target.innerText;
    setSortingButtonNames(
      sortingButtonNames.filter((item) => item !== buttonName),
    );

    /*find checkbox with the same name as button and uncheck it*/

    const checkbox = document.querySelector(
      `input[type="checkbox"][name="${buttonName}"]`,
    );
    if (checkbox) checkbox.checked = false;
  };

  //if checkbox is checked it will add a new String in sortingButtonNames, else if checkbox was uncheck it will filter out the button name from the sortingButtonNames.
  const checkboxChangeHandler = (event) => {
    //button name from checkbox name attribute
    let newButtonName = event.target.name;

    if (event.target.checked)
      setSortingButtonNames([...sortingButtonNames, newButtonName]);
    //filter returns items that are not equal to newButtonName
    else
      setSortingButtonNames(
        sortingButtonNames.filter((item) => item !== newButtonName),
      );
  };

  const clearClickHandler = () => {
    Object.keys(categories).map((key) => {
      const checkbox = document.querySelector(
        `input[type="checkbox"][name="${categories[key].text}"]`,
      );

      if (checkbox) checkbox.checked = false;
    });

    setSortingButtonNames([]);
  };

  return (
    <>
      <div className="drop_down_div">
        <span className="icon">
          <FilterSVG className="icon" />
          <span>Filter</span>
        </span>
        <div className="items-holder">
          {categories.length ? (
            renderSortingCheckBoxes(categories)
          ) : (
            <label className="item">Loading...</label>
          )}
        </div>
      </div>
      <button className="clear-button" onClick={clearClickHandler}>
        Clear
      </button>
      <div className="sorting-buttons-holder">{renderSortingButtons()}</div>
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

Sorting.propTypes = {
  sortingButtonNames: PropTypes.array.isRequired,
  setSortingButtonNames: PropTypes.func.isRequired,
};

MainCards.propTypes = {
  sortingButtonNames: PropTypes.array.isRequired,
};

export default Search;
