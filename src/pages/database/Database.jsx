import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
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

    //userInfo holds... userInfo
    const [userInfo, setUserInfo] = useState(null)

    const [formElementsRender, setFormElementsRender] = useState(<p>Welcome to the database section, this UI auto refresh. <strong>Careful with what you change!</strong></p>)
    const itemFormRef = useRef(null);

    //loading information for component
    useEffect(() => {
        (async function(){setUserInfo(await authentication.getUserInfo())})();
    },[])

    const refreshCollectionData = useCallback(async (collectionName, updateDependant) => {

        let dataUpdate = {}

        switch(collectionName){
            case ('websites'):{
                //updateDependant: update all data when in website, since is used in forms
                if(updateDependant){
                    dataUpdate = {
                        websites: await database.getWebsites(),
                        categories: await database.getCategories(),
                        tags: await database.getTags()
                    }
                }else{
                    dataUpdate = {
                        websites: await database.getWebsites()
                    }
                }
            break;}
            case ('categories'):{
                dataUpdate = {
                    categories: await database.getCategories()
                }
            break;}
            case ('tags'):{
                dataUpdate = {
                    tags: await database.getTags()
                };
            break;}
        }

        setCollectionsData(prev => ({...prev, ...dataUpdate}))
    }, []);

    //start auto-refresh
    useEffect(() => {
        const refreshTime = 300000 // 5 min

        //before it start the interval refresh the variable or it will call it until the timer runs out
        refreshCollectionData(targetCollectionName, true);

        const intervalId = setInterval(() => {
            //it will only refresh the current targetCollection to make sure is not updating all the data collections everytime
            refreshCollectionData(targetCollectionName, true);
        }, refreshTime);
      
        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [targetCollectionName, refreshCollectionData]) // when target changes it makes a new interval for refresh

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

        rederItemForm(targetCollectionName, null)
    }

    let messageModalRef = useRef(null);
    const rederItemForm = (collectionName, itemObject) => {

        function DialogModalDelete ({itemId}){

            const modalElementRef = useRef(null);
            const [isDisable, setDisable] = useState(true);

            const handleClickOutside = (event) => {
                //mouse pointer coordinates 
                const x = event.clientX;
                const y = event.clientY;
    
                const element = modalElementRef.current;
    
                //check if click is outside of element border else it was clicked inside
                if (x < element.offsetLeft || x > element.offsetLeft + element.offsetWidth ||
                    y < element.offsetTop || y > element.offsetTop + element.offsetHeight) {
                    modalElementRef.current.close();
                    document.removeEventListener('click', handleClickOutside);
                }
            };

            return(
                <>
                    <button onClick={(e) => {
                        /* Explanation for e.stopPropagation()
                        when click on button it shows model and adds the listener, 
                        but because of propagation after everything was run on click function
                        it was also clicking the 'document' witch was outside of the model,
                        so it was closing the modal. 
                        
                        the only way it would work as intended without the stopPropagation() was
                        if you position the delete button right were the modal was going to popup.
                        */
                        e.stopPropagation(); 

                        modalElementRef.current.showModal();
                        document.addEventListener('click', handleClickOutside)
                    }}>Delete</button>

                    <dialog ref={modalElementRef}>
                            <p>{`To confirm, type "${itemId}" in the box below`}</p>
                            <input type='text' placeholder={itemId} onChange={(e) => {
                                if(e.target.value === itemId) 
                                    setDisable(false);
                                else
                                    setDisable(true);
                            }}></input>
                            <button disabled={isDisable} onClick={async () => {
                                await database.deleteWebsite(itemId);
                                refreshCollectionData(targetCollectionName)
                            }}>Delete</button>
                    </dialog>
                </>
            )
        } 
        DialogModalDelete.propTypes = {
            itemId: PropTypes.string
        };

        const DialogModalMessage = forwardRef(({message}, ref) => {

            const modalRef = useRef(null);
        
            const handleClickOutside = (event) => {
                //mouse pointer coordinates 
                const x = event.clientX;
                const y = event.clientY;
    
                const element = modalRef.current;
    
                //check if click is outside of element border else it was clicked inside
                if (x < element.offsetLeft || 
                    x > element.offsetLeft + element.offsetWidth ||
                    y < element.offsetTop || 
                    y > element.offsetTop + element.offsetHeight
                )
                    closeModal();
            };

            const closeModal = () => {
                modalRef.current.close();
                document.removeEventListener('click', handleClickOutside);
            }

            const openModal= () => {
                modalRef.current.showModal();
                document.addEventListener('click', handleClickOutside);
            }

            useImperativeHandle(ref, () => ({
                openModal
            }));

            return(<>
                <dialog ref={modalRef}>
                        <p>{message}</p>
                        <button onClick={closeModal}>Close</button>
                </dialog>
            </>);
        });
        DialogModalMessage.displayName = 'DialogModalMessage';
        DialogModalMessage.propTypes = {message: PropTypes.string};
        
        if(itemFormRef.current != null){
            itemFormRef.current.reset()
        }

        const setDisableChildrenOf = (element, switcher) =>{
            for (let i = 0; i < element.length; i++) {
                element[i].disabled = switcher;
            }
        }

        let formElement = null;
        const isNull = itemObject == null;
      
        switch(collectionName) {
            case("websites"):{

                const transformData = (formData) => {
                    const websiteVariables = {};
                    const categoriesArray = [];

                    formData.forEach((value, key) => {
                        if(key === "featured"){
                            websiteVariables[key] = true;
                        } else if (key.startsWith('$')){
                            categoriesArray.push(key.substring(1));
                        } else {
                            websiteVariables[key] = value;
                        }
                    });

                    websiteVariables['categories'] = categoriesArray;

                    if(!isNull)
                        websiteVariables['id'] = itemObject.id;

                    //check for missing properties
                    if (!("featured" in websiteVariables)) 
                        websiteVariables["featured"] = false;

                    return websiteVariables;
                }

                formElement =  <>
                    <form ref={itemFormRef} onSubmit={async (e) => {

                        e.preventDefault();

                        //get form data before disable all children
                        const formData = new FormData(e.target);
                        setDisableChildrenOf(e.target, true);

                        //if null add the website to database else update the website;
                        if(isNull)
                            await database.addWebsite(transformData(formData))
                        else 
                            await database.updateWebsite(transformData(formData))

                        await refreshCollectionData(targetCollectionName)

                        setDisableChildrenOf(e.target, false);
                        messageModalRef.current.openModal()

                    }}>
                        <label>Id: {isNull ? "N/A" : itemObject.id }</label>
                        <label>Featured: <input name='featured' type="checkbox" defaultChecked={isNull ? false : itemObject.featured}/></label>
                        <label>Name: <input required name='name' type="text" defaultValue={isNull ? '' : itemObject.name}/></label>
                        <label>Description: <textarea required name='description' type="text" defaultValue={isNull ? '' : itemObject.description}/></label>
                        <label>Web Link: <input required name='webLink' type="text" defaultValue={isNull ? '' : itemObject.webLink}/></label>
                        <label>Logo Url: <textarea required name='logoUrl' type="text" defaultValue={isNull ? '' : itemObject.logoUrl} onChange={(e)=>{itemFormRef.current.querySelector('#logoUrlImgDisplay').src = e.target.value}}></textarea></label>
                        <img id='logoUrlImgDisplay' src={isNull ? '' : itemObject.logoUrl}/>
                        <select required name='tag' defaultValue={isNull ? '' : itemObject.tag.id}>
                            <option value='' disabled>Select tag</option>
                            {collectionsData.tags.map((tag, index) =>
                                <option key={index} value={tag.id}>{tag.text}</option>
                            )}
                        </select>
                        <div>categories:
                            {collectionsData.categories.map((category, index)  =>
                                <label key={index}>{`${category.text}: `}
                                    <input type="checkbox" name={`$${category.id}`} defaultChecked={ isNull ? false : itemObject.categories.some(value => category.text == value.text)}/>
                                </label>
                            )}
                        </div>
                        {isNull ? <button type="submit">Create</button> : <button type="submit">Update</button>}
                    </form>

                    <DialogModalMessage ref={messageModalRef} message={`'${ isNull? 'New website' : itemObject.id}' was ${isNull? 'created': 'updated'}!`}/>
                    {!isNull && <DialogModalDelete itemId={itemObject.id}/>}
                </>;

                break;
            }
            case("tags"):{

                formElement = <>
                    <label>Text: <input type="text" defaultValue={itemObject.text}/></label>
                    <label>Color: <input type="text" defaultValue={itemObject.color}/></label>
                    <button>Update</button>
                </>
                break;
            }
            case("categories"):{
                formElement = <>
                    <label>Text: <input type="text" defaultValue={itemObject.text}/></label>
                    <label>Color: <input type="text" defaultValue={itemObject.color}/></label>
                    <button>Update</button>
                </>
                break;
            }
        }

        setFormElementsRender(formElement);
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
                    {formElementsRender}
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