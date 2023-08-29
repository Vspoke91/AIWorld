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

    //collectionsData keep all the data of the collections and updates in every auto-refresh or when site starts using a useEffect
    const [collectionsData, setCollectionsData] = useState({websites: null, tags: null, categories: null});
    //targetCollectionName keep the current selected target collection the user picks in the <select> element
    const [targetCollectionName, setTargetCollectionName] = useState('websites');
    /*
    displayDataList is the list that needs to be updated to show the user the data in the collection targeted.
    when null the list will show a 'loading' text, 
    keep displayDatList null until there is data in collectionsData.
    */
    const [displayDataList, setDisplayDataList] = useState(null)

    //userInfo hold... userInfo
    const [userInfo, setUserInfo] = useState(null)

    const [itemFormElementsRender, setItemFormElementsRender] = useState(<p>Welcome to the database section, this UI auto refresh. <strong>Careful with what you change!</strong></p>)
    const itemFormRef = useRef(null);

    //loading information for component
    useEffect(() => {
        (async function(){setUserInfo(await authentication.getUserInfo())})();
    },[])

    //start auto-refresh
    useEffect(() => {
        const refreshTime = 1000 // 1 sec = 1,000

        const refreshVariable = async (value) => {
            switch(value){
                case ('websites'):{
                    //exeption: update all data when in website, since is used in form
                    setCollectionsData({
                        websites: await database.getWebsites(),
                        categories: await database.getCategories(),
                        tags: await database.getTags()
                    });
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

        //before it start the interval refresh the variable or it will call it until the timer runs out
        refreshVariable(targetCollectionName);

        const intervalId = setInterval(() => {
            //it will only refresh the current targetCollection to make sure is not updating all the data collections everytime
            refreshVariable(targetCollectionName);
        }, refreshTime);
      
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [targetCollectionName]) // when target changes it makes a new interval for refresh

    /*
    updates collection data inside of collectionDisplay everytime collectionData changes or targetCollectionName changes
    so the only way it displays new data is if collectionData changes in auto-refresh
    or if targetCollectionName changes when user changes the list display in the <select> element
    */
    useEffect(() => {
        let collectionData = null;

        switch (targetCollectionName) {
            case 'websites':
                if(collectionsData.websites != null)
                    collectionData = {
                        collectionName: 'websites',
                        collection: collectionsData.websites,
                        nameFieldRef: 'name',
                        logoUrlFieldRef: 'logoUrl'
                    }
                break;
            case 'categories':
                if(collectionsData.categories != null)
                    collectionData = {
                        collectionName: 'categories',
                        collection: collectionsData.categories, 
                        nameFieldRef: 'text', 
                        logoUrlFieldRef: 'logoUrl'
                    }
                break;
            case 'tags':
                if(collectionsData.tags != null)
                    collectionData = {
                        collectionName: 'tags',
                        collection: collectionsData.tags, 
                        nameFieldRef: 'text', 
                        logoUrlFieldRef: 'logoUrl'
                    }
                break;
            default: 
                break;
        }

        //if collectionData is null even after the switch, it will display loading, since displayDataList is set to null
        setDisplayDataList(collectionData);

    },[collectionsData, targetCollectionName])

    const renderCollectionList = ({collection, nameFieldRef, logoUrlFieldRef}) => {

        /*
        this will check if the collection is null, so it wait for auto-refresh to load it.
        is null since all fields in collectionData is are not loaded until the user calls it for the first time
        */
        const elementArray = collection.map((item, index) => {
            return(
                <button key={index} onClick={() => rederItemForm(targetCollectionName, item)}>
                    <span>{item[nameFieldRef]}</span>
                    {logoUrlFieldRef != undefined ?<img src={item[logoUrlFieldRef]}/>: <></>}
                </button>
            )
        })
        return elementArray;
    }

    const addNewClickHandler = (e) => {
        e.preventDefault()

        
    }

    const rederItemForm = (collectionName, item) => {

        if(itemFormRef.current != null) 
            itemFormRef.current.reset();
        
        let formElements = null;

        switch(collectionName) {
            case("websites"):{
                formElements = <>
                    <label>Featured: <input type="checkbox" defaultChecked={item.featured}/></label>
                    <label>Name: <input type="text" defaultValue={item.name}/></label>
                    <label>Description: <textarea type="text" defaultValue={item.description}/></label>
                    <label>Web Link: <input type="text" defaultValue={item.webLink}/></label>
                    <label>Logo Url: <textarea type="text" defaultValue={item.logoUrl} onChange={(e)=>{itemFormRef.current.querySelector('#logoUrlImgDisplay').src = e.target.value}}></textarea></label>
                    <img id='logoUrlImgDisplay' src={item.logoUrl}/>
                    <select defaultValue={item.tag.text}>
                        {collectionsData.tags.map(tag =>
                            <option value={tag.text}>{tag.text}</option>
                        )}
                    </select>
                    <div>categories:
                        {collectionsData.categories.map(category =>
                            <label>{category.text}: 
                                <input type="checkbox" defaultChecked={item.categories.some(value => category.text == value.text)}/>
                            </label>
                        )}
                    </div>
                    <button>Update</button>
                </>
                break;
            }
            case("tags"):{
                formElements = <>
                    <label>Text: <input type="text" defaultValue={item.text}/></label>
                    <label>Color: <input type="text" defaultValue={item.color}/></label>
                    <button>Update</button>
                </>
                break;
            }
            case("categories"):{
                formElements = <>
                    <label>Text: <input type="text" defaultValue={item.text}/></label>
                    <label>Color: <input type="text" defaultValue={item.color}/></label>
                    <button>Update</button>
                </>
                break;
            }
        }

        setItemFormElementsRender(formElements);
    }

    return(
        <>
            <div className='qs__flex_row'>
                <div className='qs__flex_column'> 
                    <select defaultValue="websites" onChange={(event) => {setTargetCollectionName(event.target.value)}}>
                        <option value="websites">Websites</option>
                        <option value='tags'>Tags</option>
                        <option value='categories'>Categories</option>
                    </select>
                    <button onClick={addNewClickHandler}>Add New</button>
                    <div className='qs__flex_column'>
                        {displayDataList != null ?  renderCollectionList(displayDataList):  "loading..."}
                    </div>
                </div>
                <div>
                    <p>Welcome back, {userInfo != null ? userInfo.name.first : 'loading...'}</p>
                    <form ref={itemFormRef}>
                        {itemFormElementsRender}
                    </form>
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
                    <input ref={emailInputRef} type='email'/>
                    <input ref={passwordInputRef} type='password'/>
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