import { useState } from 'react';
import './App.css'
import contentData from './sitesDataBase' 

function App() {

  let [displayShowDiv, setDisplayShowDiv] = useState(false);

  //States for Showdiv Variables
  let [showDivName, setShowDivName] = useState("*Name*");
  let [showDivLogoPath, setShowDivLogoPath] = useState("*Path*");
  let [showDivDescription, setShowDivDescription] = useState("*Description*");
  let [showDivTag, setShowDivTag] = useState({});
  let [showDivCategory,setShowDivCategory] = useState([]);
  let [showDivWebLink, setShowDivWebLink] = useState("")

  let ContentElements = () => {

    let contentArray = new Array();

    for(let i = 0; i < contentData.length; i++){

      let siteData = contentData[i];

      contentArray.push(
        <div key={i} className='content-div' onClick={() => {loadDisplayShowDiv(i); setDisplayShowDiv(true);}}>
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
    setShowDivName(contentData[index].title);
    setShowDivLogoPath(contentData[index].logo);
    setShowDivDescription(contentData[index].description);
    setShowDivTag(contentData[index].tagType);
    setShowDivCategory(contentData[index].category);
    setShowDivWebLink(contentData[index].webLink);
  }

  return (
    <>
      <div className='underDevelopmentDiv'>
        <p>🚧 Website under development, features are limited 🚧</p>
      </div>
      <div className="title-div">
          <h1>AI World</h1>
          <div className='quote-div'>
            <p>Artificial intelligence is the next stage in the evolution of human beings</p>
            <span>Stephen Hawking</span>
          </div>
      </div>
      
      <main>
        <ContentElements />
        <div 
          className='background-blur'
          style={{display: displayShowDiv ? "block" : "none"}} 
          onClick={()=> setDisplayShowDiv(false) }
        ></div>

        <div
        className={`show-Div${displayShowDiv ? " show-animate" : ""}`}
        style={{display: displayShowDiv ? "block" : "none"}}>
            <div className='show-title-div'>
              <h2>
                <a href={showDivWebLink}>{showDivName}</a>
              </h2>
              <span className='tag' style={{backgroundColor: showDivTag.color}}>{showDivTag.text}</span>
            </div>
            <div className='img-div'>
                <img src={showDivLogoPath}/>
            </div>
            <div className='category-div'>
              {showDivCategory.map((category, index)=><span key={index}>{category}</span>)}
            </div>
            <div className='description'>
            <p>{showDivDescription}</p>
          </div>
        </div>
      </main>

      <footer>
        <div className='opensource-div'>
          <div>
            <p>Open Source Code</p>
            <a href='https://github.com/Vspoke91/AIWorld'><img src="/img/logos/GitHub.svg" alt="Github Logo"/></a>
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
