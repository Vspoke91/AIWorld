import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Database.css'

import { default as database, authentication } from '../../assets/database/firebase'

function Database (){

    let [loggedIn, setLoggedIn] = useState(false);

    return(
        <>
            <div id='database'>
                {loggedIn ? <UserUI/> : <Login loggedInState={{loggedIn, setLoggedIn}}/>}
            </div>
        </>
    );
}

function UserUI (){

    const [userInfo, setUserInfo] = useState(null)
    const [collectionDisplayData, setCollectionDisplayData] = useState({
        collectionName: null,
        collection: [], 
        nameFieldRef: null, 
        logoUrlFieldRef: null
    })

    //loading information for component
    useEffect(() => {
        (async function(){setUserInfo(await authentication.getUserInfo())})()

        displayCollectionChangeHandler("websites")
    },[])

    //start auto-refresh
    useEffect(() => {
        const refreshTime = 1000 // 1 sec = 1,000

        const intervalId = setInterval(() => {
            displayCollectionChangeHandler(collectionDisplayData.collectionName);
        }, refreshTime);
      
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [collectionDisplayData.collectionName]) 

    const renderCollectionList = ({collection, nameFieldRef, logoUrlFieldRef}) => {
        const elementArray = collection.map((item, index) => {
            return(
                <button key={index}>
                    <span>{item[nameFieldRef]}</span>
                    {logoUrlFieldRef != undefined ?<img src={item[logoUrlFieldRef]}/>: <></>}
                </button>
            )
        })
        return elementArray;
    }
    const displayCollectionChangeHandler = (value) =>{
        switch(value){
            case ('websites'): (async function() {setCollectionDisplayData({
                collectionName: 'websites',
                collection: await database.getWebsites(), 
                nameFieldRef: 'name', 
                logoUrlFieldRef: 'logoUrl'

            })})(); break;
            case ('categories'): (async function() {setCollectionDisplayData({
                collectionName: 'categories',
                collection: await database.getCategories(), 
                nameFieldRef: 'text', 
                logoUrlFieldRef: 'logoUrl'
            })})(); break; 
            case ('tag'): (async function() {setCollectionDisplayData({
                collectionName: 'tag',
                collection: await database.getTags(), 
                nameFieldRef: 'text', 
                logoUrlFieldRef: 'logoUrl'
            })})(); break;
        }
    }

    return(
        <>
            <div className='qs__flex_row'>
                <div className='qs__flex_column'> 
                    <select className='' defaultValue="websites" onChange={(event) => displayCollectionChangeHandler(event.target.value)}>
                        <option value="websites">Websites</option>
                        <option value='tag'>Tag</option>
                        <option value='categories'>Categories</option>
                    </select>
                    <button onClick={null}>Add New</button>
                    <div className='qs__flex_column'>
                        {collectionDisplayData != null ?  renderCollectionList(collectionDisplayData):  "loading..."}
                    </div>
                </div>
                <div>
                    <p>Welcome back, {userInfo != null ? userInfo.name.first : 'loading...'}</p>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )

}

function Login ({loggedInState}){

    let emailInputRef = useRef(null);
    let passwordInputRef = useRef(null);

    const onSubmitLoginHandler = (e) => {
        e.preventDefault();
        
        if(!loggedInState.loggedIn){
            const email = emailInputRef.current.value;
            const password = passwordInputRef.current.value;

            (async function(){
                loggedInState.setLoggedIn(await authentication.login(email, password))
            })()
        }else{
            console.error("Already Logged in, request was deny")
        }
    }
    
    return (
        <>
            <div id='login'>
                <h1>Login</h1>
                <form onSubmit={onSubmitLoginHandler}>
                    <input ref = {emailInputRef} type='email'/>
                    <input ref = {passwordInputRef} type='password'/>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </>
    )
}

Login.propTypes = {
    loggedInState: PropTypes.shape({loggedIn: PropTypes.bool, setLoggedIn: PropTypes.func})
};

export default Database;