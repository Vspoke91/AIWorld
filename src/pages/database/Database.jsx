import { useEffect, useRef, useState } from 'react';
import PropTypes, { func } from 'prop-types';
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

    let [collectionsData, setCollectionsData] = useState({
        websites: {},
        tags: {},
        categories: {}
    });


    const [userInfo, setUserInfo] = useState(null)
    const [collectionDisplayData, setCollectionDisplayData] = useState({
        collectionName: null,
        collection: [], 
        nameFieldRef: null, 
        logoUrlFieldRef: null
    })
    
    const [itemElementRender, setItemElementRender] = useState(<p>Welcome to the database section, this UI auto refresh. <strong>Careful with what you change!</strong></p>)

    //loading information for component
    useEffect(() => {
        (async function(){setUserInfo(await authentication.getUserInfo())})();

        (async function (){
            setCollectionsData({
                websites: await database.getWebsites(),
                tags: await database.getTags(),
                categories: await database.getCategories(),
            });

            setCollectionDisplayData({
                collectionName: 'websites',
                collection: await database.getWebsites(),
                nameFieldRef: 'name', 
                logoUrlFieldRef: 'logoUrl'
            }); 
        })();
    },[])

    //start auto-refresh
    useEffect(() => {
        const refreshTime = 1000 // 1 sec = 1,000

        const refreshVariable = async (value) => {
            switch(value){
                case ('websites'):{
                    const data = await database.getWebsites();
                    setCollectionsData(prev => ({...prev, websites: data}));
                break;}
                case ('categories'):{
                    const data = await database.getCategories();
                    setCollectionsData(prev => ({...prev, categories: data}));
                break;}
                case ('tags'):{
                    const data = await database.getTags();
                    setCollectionsData(prev => ({...prev, tags: data}));
                break;}
            }
        }

        const intervalId = setInterval(() => {
            refreshVariable(collectionDisplayData.collectionName);
        }, refreshTime);
      
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [collectionDisplayData.collectionName]) 

    useEffect(() => {
        switch (collectionDisplayData.collectionName) {
            case 'websites':
                setCollectionDisplayData(prevData => ({
                    ...prevData,
                    collection: collectionsData.websites
                }));
                break;
            case 'categories':
                setCollectionDisplayData(prevData => ({
                    ...prevData,
                    collection: collectionsData.categories
                }));
                break;
            case 'tags':
                setCollectionDisplayData(prevData => ({
                    ...prevData,
                    collection: collectionsData.tags
                }));
                break;
            default:
                break;
        }
    },[collectionsData])

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
            case ('websites'):{
                setCollectionDisplayData({
                    collectionName: 'websites',
                    collection: collectionsData.websites, 
                    nameFieldRef: 'name', 
                    logoUrlFieldRef: 'logoUrl'
                }); 
            break;}
            case ('categories'):{
                setCollectionDisplayData({
                    collectionName: 'categories',
                    collection: collectionsData.categories, 
                    nameFieldRef: 'text', 
                    logoUrlFieldRef: 'logoUrl'
                });
            break;}
            case ('tags'):{
                setCollectionDisplayData({
                    collectionName: 'tags',
                    collection: collectionsData.tags, 
                    nameFieldRef: 'text', 
                    logoUrlFieldRef: 'logoUrl'
                });
            break;}
        }
    }

    const addNewClickHandler = (e) => {
        e.preventDefault()

        
    }

    return(
        <>
            <div className='qs__flex_row'>
                <div className='qs__flex_column'> 
                    <select className='' defaultValue="websites" onChange={(event) => {displayCollectionChangeHandler(event.target.value)}}>
                        <option value="websites">Websites</option>
                        <option value='tags'>Tags</option>
                        <option value='categories'>Categories</option>
                    </select>
                    <button onClick={addNewClickHandler}>Add New</button>
                    <div className='qs__flex_column'>
                        {collectionDisplayData != null ?  renderCollectionList(collectionDisplayData):  "loading..."}
                    </div>
                </div>
                <div>
                    <p>Welcome back, {userInfo != null ? userInfo.name.first : 'loading...'}</p>
                    <div>
                        {itemElementRender}
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