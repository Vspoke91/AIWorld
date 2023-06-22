//styles imports
import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './Home.css'

function Home() {
    return (
        <>
            <div>
                <h2>Feature Websites</h2>
                <div className='qs__grid_row qs_scroll_y'>
                    
                    <div>
                        <img/>
                        <h3>AI</h3>
                    </div>
                    <div>
                        <img/>
                        <h3>AI</h3>
                    </div>
                    <div>
                        <img/>
                        <h3>AI</h3>
                    </div>
                    <div>
                        <img/>
                        <h3>AI</h3>
                    </div>
                    <div>
                        <img/>
                        <h3>AI</h3>
                    </div>
                </div>
            </div>
            <div>
                <h1>AI World</h1>
                <p>Explore a variety of tools that use AI to generate amazing graphics, write engaging texts, and chat with you on any topic</p>
            </div>
            <div id='DevelopmentSection'>
                <Development/>
            </div>
        </>
    );
}

function Development() {
    const RELEASE_GITHUB_API = 'https://api.github.com/repos/vspoke91/aiworld/releases';
    const [githubVersionState, setGithubVersionState] = useState([]);
    //TODO: find a way to fetch data from url

    useEffect(() =>{
        fetch(`${RELEASE_GITHUB_API}`)
        .then((res) => res.json())
        .then((array) => setGithubVersionState(array))
    }, [])

    const renderVersionSections = () => {

        const descriptionElementFormatter = (descriptionLine) => {
            const splitLine = descriptionLine.split("\r\n");
            return  <>
                {splitLine.map((line, index) => {

                    const titleRegex = /^##.*/
                    const boldRegex = /^\*\*.*\*\*.*/
                    const tableRegex = /^\*. |\+* /

                    if(line.match(titleRegex)){
                        line = line.slice(2);
                        return <span key={index} className='description-header2'>{line+"\n"}</span>
                    } else if(line.match(boldRegex)){
                        line = line.replace(/\*\*/g, '');
                        return <span key={index} className='description-bold'>{line+"\n"}</span>
                    } else if(line.match(tableRegex)){
                        line = line.slice(2);
                        return <li key={index} className='description-table'>{line+"\n"}</li>
                    } 
                    
                    return <span key={index}>{line+"\n"}</span>
                })}
            </>;
        }

        return (
            githubVersionState.length ? 
                githubVersionState.map((value, index) => 
                    <div key={index} className='item-holder'>
                        <div className='qs__flex_row __flex_center qs__height_fit_content'>
                            <a className='title-part' href={value.html_url}><h3>{value.name}</h3></a>
                            <p className='version-part'>{value.tag_name}</p>
                        </div>
                        <br/>
                        <div className='qs__flex_row __flex_left_Low'>
                            <p className='dateA-part'>Released: {new Date(value.published_at).toLocaleDateString('en-US')}</p>
                            <p className='dateB-part'>{formatDistanceToNow(new Date(value.published_at), { addSuffix: true })}</p>
                        </div>
                        <hr/>
                        <div className='description-part'>
                            {descriptionElementFormatter(value.body)}
                        </div>
                    </div>
                )
                : 
                <>
                    <p>Loading...</p>
                </>
        )
    }

    return(
        <>
            <h2>Development & Updates</h2>
            <div>
                {renderVersionSections()}
            </div>
        </>
    );
}

export default Home;