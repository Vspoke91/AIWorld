import { useState } from 'react';
import './App.css'
import {default as contentData, categories } from './sitesDataBase' 
import { FilterSVG } from './assets/CustomIcons';

function App() {

  //keeps all states in one object for showDivState
  let [showDivState, setShowDivState] = useState(
    {
      display: false,
      tittle: "*Name*",
      logoPath: "*Path*",
      description: "*Description*",
      tag: {},
      category: [],
      webLink: ""
    });

  let ContentElements = () => {

    let contentArray = new Array();

    for(let i = 0; i < contentData.length; i++){

      let siteData = contentData[i];

      contentArray.push(
        <div key={i} className='content-div' onClick={() => {loadDisplayShowDiv(i)}}>
          <span className='tag' style={{backgroundColor: siteData.tagType.color}}>{siteData.tagType.text}</span>
          <h2>{siteData.title}</h2>
          <div className='img-div'>
            <img src={siteData.logo} alt={siteData.title + " Logo"}/>
          </div>
          <div className='category-div'>
            {siteData.category.map((category, index) => 
              <span key={index}>{category}</span>
            )}
          </div>
          <div className='description'>
            <p>{siteData.description}</p>
          </div>
        </div>
        );
    }
  
    return(contentArray);
  }

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

  //Checkbox Filter Options
  let [filterButtons, setFilterButtons] = useState([]);

  const handleChange = (event) => {
    let checkBoxName = event.target.name

    if(event.target.checked){
      setFilterButtons([...filterButtons, checkBoxName]);
    }
    else{
      setFilterButtons(filterButtons.filter((item) => item !== checkBoxName));
    }
  }

  const handleButtonClick = (event) => {

    const itemName = event.target.innerText;
    setFilterButtons(filterButtons.filter((item) => item !== itemName));

    // Find the corresponding checkbox and uncheck it
    const checkbox = document.querySelector(`input[name="${itemName}"]`);
    if (checkbox) {
      checkbox.checked = false;
    }

  };

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
        <div id='Filtering'>
            <FilterSVG/>
            {Object.keys(categories).map((key) => 
              <label key={key}>{categories[key].text}
                <input type='checkbox' name={categories[key].text} onChange={handleChange}/>
              </label>)}

              {filterButtons.map((item) => (
              <button key={item} type="button" onClick={handleButtonClick}>{item}</button>
    ))}
        </div>
      </nav>
      
      <main>
        <ContentElements />

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

export default App
