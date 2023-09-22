import { useCallback, useEffect, useRef, useState } from 'react';
import { default as database, authentication } from '@/assets/database/firebase'
import { ModalDeleteButton, ModalMessagePopup } from './components/DialogModals'
import { WebsiteFormEdit } from './components/CollectionForms'

export default function User() {
    //collectionsData keep all the data of the collections and updates in every auto-refresh or when site starts using a useEffect
    const [collectionsData, setCollectionsData] = useState({ websites: null, tags: null, categories: null });
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

    const [formElementsRender, setFormElementsRender] = useState(<p>Welcome to the database section, this UI auto refresh. <strong> Careful with what you change! </strong></p>)
    const itemFormRef = useRef(null);

    //loading information for component
    useEffect(() => {
        (async function () { setUserInfo(await authentication.getUserInfo()) })();
    }, [])

    const refreshCollectionData = useCallback(async (collectionName, updateDependant) => {

        let dataUpdate = {}

        switch (collectionName) {
            case ('websites'): {
                //updateDependant: update all data when in website, since is used in forms
                if (updateDependant) {
                    dataUpdate = {
                        websites: await database.getWebsites(),
                        categories: await database.getCategories(),
                        tags: await database.getTags()
                    }
                } else {
                    dataUpdate = {
                        websites: await database.getWebsites()
                    }
                }
                break;
            }
            case ('categories'): {
                dataUpdate = {
                    categories: await database.getCategories()
                }
                break;
            }
            case ('tags'): {
                dataUpdate = {
                    tags: await database.getTags()
                };
                break;
            }
        }

        setCollectionsData(prev => ({ ...prev, ...dataUpdate }))
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
                if (collectionsData.websites != null)
                    collectionData = {
                        collectionName: 'websites',
                        collection: collectionsData.websites,
                        nameFieldRef: 'name',
                        logoUrlFieldRef: 'logoUrl'
                    }
                break;
            case 'categories':
                if (collectionsData.categories != null)
                    collectionData = {
                        collectionName: 'categories',
                        collection: collectionsData.categories,
                        nameFieldRef: 'text',
                        logoUrlFieldRef: 'logoUrl'
                    }
                break;
            case 'tags':
                if (collectionsData.tags != null)
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

    }, [collectionsData, targetCollectionName])

    const renderCollectionList = ({ collection, nameFieldRef, logoUrlFieldRef }) => {

        /*
        this will check if the collection is null, so it wait for auto-refresh to load it.
        is null since all fields in collectionData is are not loaded until the user calls it for the first time
        */
        const elementArray = collection.map((item, index) => {
            return (
                <button key= { index } onClick = {() => rederItemForm(targetCollectionName, item)}>
                <span>{ item[nameFieldRef]} </span>

                { logoUrlFieldRef != undefined ? <img src={item[logoUrlFieldRef] } /> : <></ >}
                </button>
            )})


        return elementArray;
    }

    const addNewClickHandler = (e) => {
        e.preventDefault()
    
        rederItemForm(targetCollectionName, null)
    }

    let messageModalRef = useRef(null);
    const rederItemForm = (collectionName, itemObject) => {
        
        //
        if(itemFormRef.current != null){
            itemFormRef.current.reset()
        }

        //TODO: Make this use a different type of loop
        function setDisableChildrenOf(element, value) {
            for (let i = 0; i < element.length; i++) {
                element[i].disabled = value;
            }
        }

        let formElement = null;
        const isNull = itemObject == null;
      
        switch(collectionName) {
            case("websites"):{

                formElement =  <>
                    <WebsiteFormEdit ref={itemFormRef}
                        isWebObjectNew={isNull} 
                        websiteObject={itemObject} 
                        database={collectionsData} 
                        onSubmitFunction={async (e) => {
                            e.preventDefault()

                            const formData = itemFormRef.current.getDataObject();

                            if(isNull){
                                await database.addWebsite(formData)
                            }
                            else {
                                await database.updateWebsite(formData)
                            }

                            await refreshCollectionData(targetCollectionName)

                            messageModalRef.current.openModal()
                        }
                    }/>

                    <ModalMessagePopup ref={messageModalRef} 
                        message={`'${ isNull? 'New website' : itemObject.id}' was ${isNull? 'created': 'updated'}!`}
                    />

                    {!isNull && <ModalDeleteButton inputRequired={itemObject.id} onDeleteFunction={
                        async () => {
                            await database.deleteWebsite(itemObject.id);
                            refreshCollectionData(targetCollectionName)
                        }
                    }/>}
                </>;

                break;
            }
            case("tags"):{

                const transformData = (formData) => {
                    const websiteVariables = {};

                    formData.forEach((value, key) => {
                        websiteVariables[key] = value;
                    });

                    if(!isNull)
                        websiteVariables['id'] = itemObject.id;

                    return websiteVariables;
                }

                formElement = <>
                    <form ref={itemFormRef} onSubmit={async (e) => {
                        e.preventDefault();

                        //get form data before disable all children
                        const formData = new FormData(e.target);
                        setDisableChildrenOf(e.target, true);

                        //if null add the website to database else update the website;
                        if(isNull)
                            await database.addTag(transformData(formData))
                        else 
                            await database.updateTag(transformData(formData))

                        await refreshCollectionData(targetCollectionName)

                        setDisableChildrenOf(e.target, false);
                        messageModalRef.current.openModal()

                    }}>
                        <label>Id: {isNull ? "N/A" : itemObject.id }</label>
                        <label>Text: <input required name='text' type="text" defaultValue={isNull ? '' : itemObject.text}/></label>
                        <label>Color: <input required name='color' type="text" defaultValue={isNull ? '' : itemObject.color}/></label>
                        {isNull ? <button type="submit">Create</button> : <button type="submit">Update</button>}
                    </form>
                    
                    <ModalMessagePopup ref={messageModalRef} message={`'${ isNull? 'New tag' : itemObject.id}' was ${isNull? 'created': 'updated'}!`}/>
                    {!isNull && <ModalDeleteButton inputRequired={itemObject.id} deleteFunction={
                        async () => {
                            await database.deleteTag(itemObject.id);
                            refreshCollectionData(targetCollectionName)
                        }
                    }/>}
                </>
                break;
            }
            case("categories"):{
                
                const transformData = (formData) => {
                    const websiteVariables = {};

                    formData.forEach((value, key) => {
                        websiteVariables[key] = value;
                    });

                    if(!isNull)
                        websiteVariables['id'] = itemObject.id;

                    return websiteVariables;
                }

                formElement = <>
                    <form ref={itemFormRef} onSubmit={async (e) => {
                        e.preventDefault();

                        //get form data before disable all children
                        const formData = new FormData(e.target);
                        setDisableChildrenOf(e.target, true);

                        //if null add the website to database else update the website;
                        if(isNull)
                            await database.addCategory(transformData(formData))
                        else 
                            await database.updateCategory(transformData(formData))

                        await refreshCollectionData(targetCollectionName)

                        setDisableChildrenOf(e.target, false);
                        messageModalRef.current.openModal()

                    }}>
                        <label>Id: {isNull ? "N/A" : itemObject.id }</label>
                        <label>Text: <input required name='text' type="text" defaultValue={isNull ? '' : itemObject.text}/></label>
                        <label>Color: <input required name='color' type="text" defaultValue={isNull ? '' : itemObject.color}/></label>
                        {isNull ? <button type="submit">Create</button> : <button type="submit">Update</button>}
                    </form>
                    
                    <ModalMessagePopup ref={messageModalRef} message={`'${ isNull? 'New Category' : itemObject.id}' was ${isNull? 'created': 'updated'}!`}/>
                    {!isNull && <ModalDeleteButton inputRequired={itemObject.id} deleteFunction={
                        async () => {
                            await database.deleteCategory(itemObject.id);
                            refreshCollectionData(targetCollectionName)
                        }
                    }/>}
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