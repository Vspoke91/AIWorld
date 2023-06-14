//styles imports
import { useEffect, useState } from 'react';
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
            <div>
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

    return(
        <>
            <h2>Development</h2>
            <div>
                {githubVersionState.length ? (
                    <div>
                        <h3>Version: {githubVersionState[0].name}</h3>
                        <p>Description: {githubVersionState[0].body}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}

export default Home;