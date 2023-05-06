import './App.css'
import contentData from './sitesDataBase' 

function App() {

  let ContentElements = () => {

    let contentArray = new Array();

    for(let i = 0; i < contentData.length; i++){

      let siteData = contentData[i];

      contentArray.push(
        <div key={i} className='content-div' onClick={() => {}}>
          <span className='tag' style={{backgroundColor: siteData.tagType.color}}>{siteData.tagType.text}</span>
          <h2>{siteData.tittle}</h2>
          <div className='img-div'>
            <img src={siteData.logo} alt={siteData.tittle + " Logo"}/>
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

  return (
    <>
      <div className="tittle-div">
          <h1>AI World</h1>
          <div className='quote-div'>
            <p>Artificial intelligence is the next stage in the evolution of human beings</p>
            <span>Stephen Hawking</span>
          </div>
      </div>
      
      <main>
        <ContentElements />
        <div className='show-Div'>
            <div className='title'>
              <span>ChatGPT</span>
            </div>
        </div>
      </main>
    </>
  )
}

export default App
