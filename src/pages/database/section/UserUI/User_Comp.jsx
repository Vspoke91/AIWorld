import { useCallback, useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { default as database, authentication } from '@/assets/database/firebase'
import { ModalDeleteButton, ModalMessagePopup } from './components/DialogModals'
import { WebsiteFormEdit, TagFormEdit, CategoryFormEdit } from './components/CollectionForms'

export default function User() {


    const [targetCollectionName, setTargetCollectionName] = useState('websites');
    const [userInfo, setUserInfo] = useState(null)
    const formLoaderRef = useRef(null)
    
    const [collectionsData, refreshTargetCollection] = useDatabase(300000, targetCollectionName)

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
                        <CollectionList 
                        collectionsData={collectionsData} 
                        currentCollection={targetCollectionName}
                        onClickFunction={formLoaderRef.current?.loadElement}/>
                    </div>
                </div>
                <main>
                    <p>Welcome back, {userInfo != null ? userInfo.name.first : 'loading...'}</p>
                    <FormLoader ref={formLoaderRef}
                        currentCollection={targetCollectionName}
                        collectionsData={collectionsData}
                        refreshCollectionData={refreshTargetCollection} />
                </main>
            </div>
        </>
    )
}

const FormLoader = forwardRef(({ currentCollection, refreshCollectionData }, ref) => {

    //TODO: is rendering more than necessary
    // "render...",currentCollection)

    const defaultElement = <>
        <p>Welcome to the database section, this UI auto refresh. <strong> Careful with what you change! </strong></p>
    </>

    const [diplayedElement, setDiplayedElement] = useState(defaultElement)
    const formRef = useRef(null);
    const messageModalRef = useRef(null);

    function loadElement(itemObject, collectionsData) {


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
        loadNew: function () {
            loadElement(null)
        },
        loadDefault: function () {
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

function CollectionList({ collectionsData, currentCollection, onClickFunction}) {

    const [displayDataList, setDisplayDataList] = useState(null)

    const renderCollectionList = ({collection, nameFieldRef, logoUrlFieldRef}) => {

        const elementArray = collection.map((item, index) => {
            return (
                <button key={index} onClick={() => {onClickFunction(item, collectionsData)}}>
                    <span>{item[nameFieldRef]} </span>

                    {logoUrlFieldRef != undefined ? <img src={item[logoUrlFieldRef]} /> : <></ >}
                </button>
            )
        })
        return elementArray;
    }

    useEffect(() => {
        
        if (!collectionsData || !(currentCollection in collectionsData)) {
            setDisplayDataList(null);
            return;
        }

        let collectionData = null;

        switch (currentCollection) {
            case 'websites':
                collectionData = {
                    collectionName: 'websites',
                    collection: collectionsData.websites,
                    nameFieldRef: 'name',
                    logoUrlFieldRef: 'logoUrl'
                }
                break;
            case 'categories':
                collectionData = {
                    collectionName: 'categories',
                    collection: collectionsData.categories,
                    nameFieldRef: 'text',
                }
                break;
            case 'tags':
                collectionData = {
                    collectionName: 'tags',
                    collection: collectionsData.tags,
                    nameFieldRef: 'text',
                }
                break;
            default:
                console.error(`ERROR: collection name '${currentCollection}' was not found`)
                break;
        }

        //if collectionData is null even after the switch, it will display loading, since displayDataList is set to null
        setDisplayDataList(collectionData);

        /* runs twice
        one when target changes, so it loads all display, fast.
        another when collectionsData finishes fetching the updated values.
        this is done to keep it fast, and when new data is fetch it will load the newest
        */
    }, [collectionsData, currentCollection])

    return displayDataList != null ? renderCollectionList(displayDataList) : "loading..."
}

function useDatabase(time, currentCollection) {
    const [collectionsData, setCollectionsData] = useState(null);

    const refreshData = useCallback(async () => {
        const dataFetch = await getDataByCollectionName(currentCollection)

        setCollectionsData(prev => ({
            ...prev,
            ...dataFetch
        }))

    }, [currentCollection])

    const refreshCollection = useCallback(async () => {
        const dataFetch = await getDataByCollectionName(currentCollection, true)

        setCollectionsData(prev => ({
            ...prev,
            ...dataFetch
        }))

    }, [currentCollection])

    async function getDataByCollectionName(collectionName, strict) {

        let dataUpdate = {}

        switch (collectionName) {
            case ('websites'): {

                dataUpdate = {
                    websites: await database.getWebsites(),
                }

                if (!strict) {
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

    return [collectionsData, refreshCollection]
}