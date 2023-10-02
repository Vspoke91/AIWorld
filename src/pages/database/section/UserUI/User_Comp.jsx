import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { default as database, authentication } from '@/assets/database/firebase'
import { ModalDeleteButton, ModalMessagePopup } from './components/DialogModals'
import { WebsiteFormEdit, TagFormEdit, CategoryFormEdit } from './components/CollectionForms'

export default function User() {
    
    const [targetCollectionName, setTargetCollectionName] = useState('websites');

    //userInfo holds... userInfo
    const [userInfo, setUserInfo] = useState(null)
    const formLoaderRef = useRef(null)

    const [collectionsData, refreshTargetCollection] = useDatabase(300000, targetCollectionName) //300000 == 5 min

    //loading information for component
    useEffect(() => {
        (async function () { setUserInfo(await authentication.getUserInfo()) })();
    }, [])

    return (
        <>
            <div className='qs__flex_row'>
                <div className='qs__flex_column'>
                    <select defaultValue={targetCollectionName} onChange={(event) => { setTargetCollectionName(event.target.value) }}>
                        <option value='websites'>Websites</option>
                        <option value='tags'>Tags</option>
                        <option value='categories'>Categories</option>
                    </select>
                    <button onClick={() => formLoaderRef.current.loadNew()}>Add New</button>
                    <div className='qs__flex_column'>
                        {collectionsData != null ? "loaded" : "loading..."}
                        <CollectionList collectionsData = {collectionsData}/>
                    </div>
                </div>
                <main>
                    <p>Welcome back, {userInfo != null ? userInfo.name.first : 'loading...'}</p>
                    <FormLoader ref={formLoaderRef} 
                    currentCollection={targetCollectionName} 
                    collectionsData={collectionsData} 
                    refreshCollectionData={refreshTargetCollection}/>
                </main>
            </div>
        </>
    )
}

const FormLoader = forwardRef(({currentCollection, collectionsData, refreshCollectionData}, ref) => {

    //TODO: is rendering more than necessary
    // console.log("render...",currentCollection)

    const defaultElement = <>
        <p>Welcome to the database section, this UI auto refresh. <strong> Careful with what you change! </strong></p>
    </>

    const [diplayedElement, setDiplayedElement] = useState(defaultElement)
    const formRef = useRef(null);
    const messageModalRef = useRef(null);

    function loadElement(itemObject){

        /*Code Explain
        the next if check if form was already called before,
        is needed to make sure it reset the form before rendering
        sometimes inputs values tranfer to new render forms
        */

        if (formRef.current != null) {
            formRef.current.reset()
        }

        let formElement = null;
        const isNull = (itemObject == null); //sets to a boolean

        switch (currentCollection) {
            case ("websites"): {
                formElement = <>
                    <WebsiteFormEdit ref={formRef}
                        isObjectNew={isNull}
                        websiteObject={itemObject}
                        database={collectionsData}
                        onSubmitFunction={async (e) => {
                            e.preventDefault()

                            const formData = formRef.current.getDataObject();

                            if (isNull) {
                                await database.addWebsite(formData)
                            }
                            else {
                                await database.updateWebsite(formData)
                            }

                            await refreshCollectionData(currentCollection)

                            messageModalRef.current.openModal()
                        }
                    } />

                    <ModalMessagePopup ref={messageModalRef}
                        message={`'${isNull ? 'New website' : itemObject.id}' was ${isNull ? 'created' : 'updated'}!`}
                    />

                    {!isNull && <ModalDeleteButton inputRequired={itemObject.id} onDeleteFunction={
                        async () => {
                            await database.deleteWebsite(itemObject.id);
                            refreshCollectionData(currentCollection)
                        }
                    } />}
                </>;
                break;
            }
            case ("tags"): {
                formElement = <>
                    <TagFormEdit ref={formRef}
                        isObjectNew={isNull}
                        tagObject={itemObject}
                        onSubmitFunction={async (e) => {
                            e.preventDefault()

                            const formData = formRef.current.getDataObject();
                            if (isNull) {
                                await database.addTag(formData)
                            }
                            else {
                                await database.updateTag(formData)
                            }

                            await refreshCollectionData(currentCollection)
                            messageModalRef.current.openModal()
                        }
                    } />

                    <ModalMessagePopup ref={messageModalRef} message={`'${isNull ? 'New tag' : itemObject.id}' was ${isNull ? 'created' : 'updated'}!`} />
                    {!isNull && <ModalDeleteButton inputRequired={itemObject.id} onDeleteFunction={
                        async () => {
                            await database.deleteTag(itemObject.id);
                            refreshCollectionData(currentCollection)
                        }
                    } />}
                </>
                break;
            }
            case ("categories"): {

                formElement = <>
                    <CategoryFormEdit ref={formRef}
                        isObjectNew={isNull}
                        categoryObject={itemObject}
                        onSubmitFunction={async (e) => {
                            e.preventDefault()

                            const formData = formRef.current.getDataObject();
                            if (isNull) {
                                await database.addCategory(formData)
                            }
                            else {
                                await database.updateCategory(formData)
                            }

                            await refreshCollectionData(currentCollection)
                            messageModalRef.current.openModal()
                        }
                    } />

                    <ModalMessagePopup ref={messageModalRef} message={`'${isNull ? 'New Category' : itemObject.id}' was ${isNull ? 'created' : 'updated'}!`} />
                    {!isNull && <ModalDeleteButton inputRequired={itemObject.id} onDeleteFunction={
                        async () => {
                            await database.deleteCategory(itemObject.id);
                            refreshCollectionData(currentCollection)
                        }
                    } />}
                </>
                break;
            }
        }

        setDiplayedElement(formElement);
    }

    useImperativeHandle(ref, () => ({
        loadElement,
        loadNew: function(){
            loadElement(null)
        },
        loadDefault: function(){
            setDiplayedElement(defaultElement);
        }
    }));

    return diplayedElement;
})
FormLoader.displayName = 'FormLoader';
FormLoader.propTypes = {
    currentCollection: PropTypes.string,
    collectionsData: PropTypes.object,
    refreshCollectionData: PropTypes.func
};

function CollectionList({collectionsData}) {

    useEffect(()=>{
        console.log(collectionsData['websites'])
    },[collectionsData])

    return collectionsData != null ? "loaded" : "loading..."
}

function useDatabase(time, currentCollection) {
    const [collectionData, setCollectionsData] = useState(null);

    const refreshData = useCallback(async () => {
        const dataFetch = await getDataByCollectionName(currentCollection)

        setCollectionsData((prev) => ({
            ...prev,
            ...dataFetch
        }))
    }, [currentCollection])

    const refreshCollection = useCallback(async () => {
        const dataFetch = await getDataByCollectionName(currentCollection, true)

        setCollectionsData((prev) => ({
            ...prev,
            ...dataFetch
        }))
    }, [currentCollection])

    async function getDataByCollectionName(collectionName, strict){

        let dataUpdate = {}

        switch (collectionName) {
            case ('websites'): {
                
                dataUpdate = {
                    websites: await database.getWebsites(),
                }

                if(!strict){
                    dataUpdate['categories'] = await database.getCategories()
                    dataUpdate['tags'] = await database.getTags()
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
                }
                break;
            }
            default:
                console.error(`Error: collection named '${collectionName}' not found!`) 
                break;
        }

        return dataUpdate
    }

    //initializes collection data and interval
    useEffect(() => {

        refreshData()

        const intervalId = setInterval(() => {
            refreshData()
        }, time);

        // Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [time, refreshData])

    return[collectionData, refreshCollection]
}