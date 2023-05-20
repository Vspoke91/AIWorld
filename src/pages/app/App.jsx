import { useEffect, useState } from 'react';
import {default as contentData, categories } from '../../assets/sitesDataBase' 
import { FilterSVG } from '../../assets/CustomIcons';
import PropTypes from 'prop-types';

//styles imports
import './App.css'

function App() {

  //useState for sorting names that will be use to create buttons and change main when filterting
  let [sortingButtonNames, setSortingButtonNames] = useState([]);


  return (
    <>
      <div className='underDevelopmentDiv'>
        <p>🚧 Website under development, features are limited 🚧</p>
      </div>

      <header>
          <h1>AI World</h1>
          <div className='quote-div'>
            <p>Artificial intelligence is the next stage in the evolution of human beings</p>
            <span>Stephen Hawking</span>
          </div>
      </header>

      <nav>
        <Sorting sortingButtonNames={sortingButtonNames} setSortingButtonNames={setSortingButtonNames}/>
      </nav>
      
      <main>
        <MainCards sortingButtonNames={sortingButtonNames}/>
      </main>

      <footer>
        <div className='opensource-div'>
          <div>
            <p>Open Source Code</p>
            <a href='https://github.com/Vspoke91/AIWorld/blob/master/README.md'><img src="/img/logos/GitHub.svg" alt="Github Logo"/></a>
          </div>
        </div>
        <div className='velta-logo-div'>
          <a href="https://www.veltaproject.com"><img src="https://veltaproject.com/VeltaLogo.png" alt="Velta Logo"/></a>
        </div>
        <div className='copyright-div'>
          <p>© 2023 AI World, VeltaProject</p>
        </div>
      </footer>
    </>
  )
}

function Sorting({sortingButtonNames, setSortingButtonNames}){

  //created buttons from sortingButtonNames array and return them as elements array for DOM
  const renderSortingButtons = () => {
    return sortingButtonNames.map((buttonName) => 
      <button 
        key={buttonName}
        onClick={buttonClickHandler}
        >{buttonName}
      </button>
    );
  }

  //create checkbox from categories(sitesDataBase) and return them as elements array for DOM
  const renderSortingCheckBoxes = () =>{
    return <>
    <button onClick={clearClickHandler}>Clear</button>

    {Object.keys(categories).map((key) =>
        <label 
          key={key}
          >{categories[key].text}
          <input 
            className='item'
            type='checkbox'
            name={categories[key].text} //name attribute is used to name buttons and to find input checkbox 
            onChange={checkboxChangeHandler}/>
        </label>)}
    </>
  }

  //if button is click it will filter out its name out of sortingButtonNames so it will unrender, plus uncheck checkbox with the same name
  const buttonClickHandler = (event) => {
    
    const buttonName = event.target.innerText;
    setSortingButtonNames(sortingButtonNames.filter((item) => item !== buttonName));

    /*find checkbox with the same name as button and uncheck it*/

    const checkbox = document.querySelector(`input[type="checkbox"][name="${buttonName}"]`);
    if (checkbox) 
      checkbox.checked = false;

  };

  //if checkbox is checked it will add a new String in sortingButtonNames, else if checkbox was uncheck it will filter out the button name from the sortingButtonNames.
  const checkboxChangeHandler = (event) => {

    //button name from checkbox name attribute
    let newButtonName = event.target.name;

    if(event.target.checked)
      setSortingButtonNames([...sortingButtonNames, newButtonName]);
    else
      //filter returns items that are not equal to newButtonName
      setSortingButtonNames(sortingButtonNames.filter((item) => item !== newButtonName));

  }
  
  const clearClickHandler = () => {

    Object.keys(categories).map((key) => {
        const checkbox = document.querySelector(`input[type="checkbox"][name="${categories[key].text}"]`)

        if (checkbox) 
          checkbox.checked = false
      })


    setSortingButtonNames([])
  }

  return (
    <>
      <div className='drop_down_div'>
        <FilterSVG className="tittle"/>
        {renderSortingCheckBoxes()}
      </div>
      <div>
        {renderSortingButtons()}
      </div>
    </>
  )
}

function MainCards({sortingButtonNames}){

  //state used in showDiv to be able to update when a different card is pressed
  let [showDivState, setShowDivState] = useState({
      display: false,
      title: "*Name*",
      logoPath: "*Path*",
      description: "*Description*",
      tag: {},
      category: [],
      webLink: ""
  });

  //loads all new variables from index of card pressed 
  let loadDisplayShowDiv = (index) =>{
    setShowDivState({
        display: true,
        title: contentData[index].title, 
        logoPath: contentData[index].logo, 
        description: contentData[index].description, 
        tag: contentData[index].tagType, 
        category: contentData[index].category, 
        webLink: contentData[index].webLink
    });
  }

  //state used in useEffect to update the list of cards in main to match the filter (sortingbuttonNames)
  let [sortedCards, setSortedCards] = useState();

  //useEffect used to update when sortingButtonsNames (sorted names) is change
  useEffect(()=>{

    //return card element array fill with data in contentData
    let renderCards = () => {

      let cardElements = contentData.map(({title, logo, tagType, category, description}, index) => {
        
        if(hasEveryMatchingItem(sortingButtonNames, category))
          return (getCardElement(index, title, logo,tagType, category, description))

        else
          return null;

      });

      return(cardElements)
    }

    //return a element card
    let getCardElement = (index, title, logoURL, tag, categories, description) =>{
      return (
        <div key={index} className='content-div' onClick={() => {loadDisplayShowDiv(index)}}>
          <span className='tag' style={{backgroundColor: tag.color}}>{tag.text}</span>
          <h2>{title}</h2>
  
          <div className='img-div'>
            <img src={logoURL} alt={title + " Logo"}/>
            </div>
  
          <div className='category-div'>
            {categories.map((category, index) => 
                <span key={index}>{category}</span>
            )}
          </div>
  
          <div className='description'>
            <p>{description}</p>
          </div>
  
        </div>
      );
    }

    //updates useState with new cards
    setSortedCards(renderCards())
  
  //[sortingButtonNames] is the dependency, if variable changes it will return useEffect Function
  }, [sortingButtonNames])

  //hasEvery finds all cards that has only the selected filters
  function hasEveryMatchingItem(array1, array2) {
    return array1.every(item => array2.includes(item));
  }

  return(
  <>
    {sortedCards}

    <div id='backgroundBlur'
      className='background-blur'
      style={{display: showDivState.display ? "block" : "none"}} 
      onClick={()=> setShowDivState({...showDivState, display: false}) }>
    </div>

    <div id='showElement'
      className={`show-Div${showDivState.display ? " show-animate" : ""}`}
      style={{display: showDivState.display ? "block" : "none"}}>

        <div className='show-title-div'>
            <h2><a href={showDivState.webLink}>{showDivState.title}</a></h2>
            <span className='tag' style={{backgroundColor: showDivState.tag.color}}>{showDivState.tag.text}</span>
        </div>

        <div className='img-div'>
            <img src={showDivState.logoPath} alt={showDivState.title + " Logo"}/>
        </div>

        <div className='category-div'>
          {showDivState.category.map((category, index)=><span key={index}>{category}</span>)}
        </div>

        <div className='description'>
          <p>{showDivState.description}</p>
        </div>
    </div>
  </>);
}

Sorting.propTypes = {
  sortingButtonNames: PropTypes.array.isRequired,
  setSortingButtonNames: PropTypes.func.isRequired,
};

MainCards.propTypes = {
  sortingButtonNames: PropTypes.array.isRequired,
};

export default App
