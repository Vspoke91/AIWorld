import {
  useCallback,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";
import {
  default as database,
  authentication,
} from "@/src/assets/database/firebase";
import {
  ModalDeleteButton,
  ModalMessagePopup,
} from "./components/DialogModals";
import {
  WebsiteFormEdit,
  TagFormEdit,
  CategoryFormEdit,
} from "./components/CollectionForms";

import { scrollEffect_onHover } from "@/src/assets/custom/CustomAnimations";

export default function User() {
  /* Defaults to 'websites'
    the default can be change to 'tags' and 'categories' only.
    default to websites make the first load slow since it populates the variable collectionsData (fetch from database)
    */
  const [targetCollectionName, setTargetCollectionName] = useState("websites");
  const [userInfo, setUserInfo] = useState(null);
  const formLoaderRef = useRef(null);
  /* Custome 'use'
    in this custome 'use' the number is how often database will refresh its data based on the targetCollectionName
    300000 milli == 5 min

    targetCollectionName is used to update the database based on the target,
    so it does not update all the database. this is done to lower reads on firebase("expend less money")
    */
  const [collectionsData, refreshTargetCollection] = useDatabase(
    300000,
    targetCollectionName,
  );

  useEffect(() => {
    (async function () {
      setUserInfo(await authentication.getUserInfo());
    })();
  }, []);

  return (
    <>
      <div className="flex">
        <aside className="flex h-screen max-w-[200px] flex-[0.3] flex-col gap-0.5 overflow-x-hidden overflow-y-scroll bg-zinc-600">
          <select
            className="list-select"
            defaultValue={targetCollectionName}
            onChange={(event) => {
              setTargetCollectionName(event.target.value);
            }}
          >
            <option value="websites">Websites</option>
            <option value="tags">Tags</option>
            <option value="categories">Categories</option>
          </select>
          <button
            className="list-button"
            onClick={() => formLoaderRef.current.loadNew(collectionsData)}
          >
            Add New
          </button>
          <div className="flex flex-col">
            <CollectionList
              collectionsData={collectionsData}
              currentCollection={targetCollectionName}
              onClickFunction={formLoaderRef.current?.loadElement}
            />
          </div>
        </aside>
        <main className="flex-1">
          <p>
            Welcome back,{" "}
            {userInfo != null ? userInfo.name.first : "loading..."}
          </p>
          <FormLoader
            ref={formLoaderRef}
            currentCollection={targetCollectionName}
            collectionsData={collectionsData}
            refreshCollectionData={refreshTargetCollection}
          />
        </main>
      </div>
    </>
  );
}

/* FormLoader Usage
form loader is used to load the form depending on what the user select from the list.
*/
const FormLoader = forwardRef(
  ({ currentCollection, refreshCollectionData }, ref) => {
    const defaultElement = (
      <>
        <p>
          Welcome to the database section, this UI auto refresh.{" "}
          <strong> Careful with what you change! </strong>
        </p>
      </>
    );

    const [diplayedElement, setDiplayedElement] = useState(defaultElement);
    const formRef = useRef(null);
    const messageModalRef = useRef(null);

    function loadElement(itemObject, collectionsData) {
      function validateID(checkID, array) {
        return !array.some((object) => object.id === checkID);
      }
      async function createOrUpdateItem(
        data,
        collection,
        addFunction,
        updateFuction,
      ) {
        if (isNull) {
          if (validateID(data.id, collection)) {
            const itemObject = await addFunction(data);

            //reloads the page with itemObject, this will add the delete button
            loadElement(itemObject, collectionsData);

            await refreshCollectionData(currentCollection);

            messageModalRef.current.openModalWithMessage(
              `'${data.id}' was created and loaded!`,
            );
          } else {
            messageModalRef.current.openModalWithMessage(
              `Item with id of '${data.id}' already exist!`,
            );
          }
        } else {
          await updateFuction(data);
          messageModalRef.current.openModalWithMessage(
            `'${data.id}' was updated!`,
          );
        }
      }

      /*Explain Code
        the next if check if form was already called before,
        is needed to make sure it reset the form before rendering
        sometimes inputs values tranfer to new render forms
        */
      if (formRef.current != null) {
        formRef.current.reset();
      }

      let formElement = null;
      const isNull = itemObject == null; //sets to a boolean

      switch (currentCollection) {
        case "websites": {
          formElement = (
            <>
              <WebsiteFormEdit
                ref={formRef}
                isObjectNew={isNull}
                websiteObject={itemObject}
                database={collectionsData}
                onSubmitFunction={async () => {
                  //e.preventDefault is being called before executing this function
                  const formData = formRef.current.getDataObject();
                  await createOrUpdateItem(
                    formData,
                    collectionsData.websites,
                    database.addWebsite,
                    database.updateWebsite,
                  );
                }}
              />

              <ModalMessagePopup ref={messageModalRef} />

              {!isNull && (
                <ModalDeleteButton
                  inputRequired={itemObject.id}
                  onDeleteFunction={async () => {
                    await database.deleteWebsite(itemObject.id);
                    loadDefault();
                    refreshCollectionData(currentCollection);
                  }}
                />
              )}
            </>
          );
          break;
        }
        case "tags": {
          formElement = (
            <>
              <TagFormEdit
                ref={formRef}
                isObjectNew={isNull}
                tagObject={itemObject}
                onSubmitFunction={async () => {
                  //e.preventDefault is being called before executing this function
                  const formData = formRef.current.getDataObject();
                  await createOrUpdateItem(
                    formData,
                    collectionsData.tags,
                    database.addTag,
                    database.updateTag,
                  );
                }}
              />

              <ModalMessagePopup ref={messageModalRef} />
              {!isNull && (
                <ModalDeleteButton
                  inputRequired={itemObject.id}
                  onDeleteFunction={async () => {
                    await database.deleteTag(itemObject.id);
                    loadDefault();
                    refreshCollectionData(currentCollection);
                  }}
                />
              )}
            </>
          );
          break;
        }
        case "categories": {
          formElement = (
            <>
              <CategoryFormEdit
                ref={formRef}
                isObjectNew={isNull}
                categoryObject={itemObject}
                onSubmitFunction={async () => {
                  //e.preventDefault is being called before executing this function
                  const formData = formRef.current.getDataObject();
                  await createOrUpdateItem(
                    formData,
                    collectionsData.categories,
                    database.addCategory,
                    database.updateCategory,
                  );
                }}
              />

              <ModalMessagePopup ref={messageModalRef} />
              {!isNull && (
                <ModalDeleteButton
                  inputRequired={itemObject.id}
                  onDeleteFunction={async () => {
                    await database.deleteCategory(itemObject.id);
                    loadDefault();
                    refreshCollectionData(currentCollection);
                  }}
                />
              )}
            </>
          );
          break;
        }
      }

      setDiplayedElement(formElement);
    }

    function loadDefault() {
      setDiplayedElement(defaultElement);
    }

    useImperativeHandle(ref, () => ({
      loadElement,
      loadNew: function (collectionsData) {
        loadElement(null, collectionsData);
      },
    }));

    return diplayedElement;
  },
);
FormLoader.displayName = "FormLoader";
FormLoader.propTypes = {
  currentCollection: PropTypes.string,
  collectionsData: PropTypes.object,
  refreshCollectionData: PropTypes.func,
};

/* CollectionList Usage
CollectionList returns a list of elements,
is used with FormLoader to display a form based on what was selected form the List,
if currentCollection or collectionData changes to a new value it will update and display the new values.
*/
function CollectionList({
  collectionsData,
  currentCollection,
  onClickFunction,
}) {
  const [displayDataList, setDisplayDataList] = useState(null);

  const renderCollectionList = ({
    collection,
    nameFieldRef,
    logoUrlFieldRef,
  }) => {
    const elementArray = collection.map((item, index) => {
      return (
        <button
          className="flex bg-black p-2 text-lg"
          key={index}
          onClick={() => {
            onClickFunction(item, collectionsData);
          }}
          onMouseOver={scrollEffect_onHover}
        >
          {logoUrlFieldRef != undefined ? (
            <img
              className="pointer-events-none w-[60px] rounded-full"
              src={item[logoUrlFieldRef]}
            />
          ) : (
            <></>
          )}
          <div className="disapear-scrollbar pointer-events-none my-auto ml-2 block overflow-x-auto">
            <span className="block w-fit font-bold">{item[nameFieldRef]}</span>
          </div>
        </button>
      );
    });
    return elementArray;
  };

  useEffect(() => {
    /*why this if?
        this if is so the switch does not happen if collectionData or if collectionData does not have a property of currentCollection.
        what this will do is display loading... until collectionData has some data fetch, such as when the website load for the first time.

        if website is not the default section when the website loads for the first time (can change in the User component) and you have it default to tags, 
        the website will only load the tags from the database, so if you change from tags to categories collectionsData is not going to have categories loaded,
        that's why the code "!(currentCollection in collectionsData)" check if collectionsData object has currentCollection.
        FYI, 'websites' as default will load tags and categories too, since is used in its forms.
        */
    if (!collectionsData || !(currentCollection in collectionsData)) {
      setDisplayDataList(null);
      return;
    }

    let collectionData = null;

    switch (currentCollection) {
      case "websites":
        collectionData = {
          collectionName: "websites",
          collection: collectionsData.websites,
          nameFieldRef: "name",
          logoUrlFieldRef: "logoUrl",
        };
        break;
      case "categories":
        collectionData = {
          collectionName: "categories",
          collection: collectionsData.categories,
          nameFieldRef: "text",
        };
        break;
      case "tags":
        collectionData = {
          collectionName: "tags",
          collection: collectionsData.tags,
          nameFieldRef: "text",
        };
        break;
      default:
        console.error(
          `ERROR: collection name '${currentCollection}' was not found`,
        );
        break;
    }

    //if collectionData is null even after the switch, it will display loading, since displayDataList is set to null
    setDisplayDataList(collectionData);

    /* runs twice
        one when target changes, so it loads all display, fast.
        another when collectionsData finishes fetching the updated values.
        this is done to keep it fast, and when new data is fetch it will load the newest
        */
  }, [collectionsData, currentCollection]);

  return displayDataList != null
    ? renderCollectionList(displayDataList)
    : "loading...";
}

/* useDatabase Usage
*arguments
useDatabase need a time for its auto refresh, is all in milliseconds.
it also needs a variable of currentCollection that will contain a string with the selected collection,
this is done so it only updates the collection the user is on.
*returns
useDatabase is a use state that returns a function and a useState variable.
the useState variable return the latest fetch data, from the database, once it gets new data it will render the site.

the function is needed in the top level component 'User', is refresh the currentCollection data only,
so if I'm in the websites list it will not update the tags.
*/
function useDatabase(time, currentCollection) {
  const [collectionsData, setCollectionsData] = useState(null);

  const refreshData = useCallback(async () => {
    const dataFetch = await getDataByCollectionName(currentCollection);

    setCollectionsData((prev) => ({
      ...prev,
      ...dataFetch,
    }));
  }, [currentCollection]);

  const refreshCollection = useCallback(async () => {
    const dataFetch = await getDataByCollectionName(currentCollection, true);

    setCollectionsData((prev) => ({
      ...prev,
      ...dataFetch,
    }));
  }, [currentCollection]);

  async function getDataByCollectionName(collectionName, strict) {
    let dataUpdate = {};

    switch (collectionName) {
      case "websites": {
        dataUpdate = {
          websites: await database.getWebsites(),
        };

        if (!strict) {
          dataUpdate["categories"] = await database.getCategories();
          dataUpdate["tags"] = await database.getTags();
        }

        break;
      }
      case "categories": {
        dataUpdate = {
          categories: await database.getCategories(),
        };
        break;
      }
      case "tags": {
        dataUpdate = {
          tags: await database.getTags(),
        };
        break;
      }
      default:
        console.error(`Error: collection named '${collectionName}' not found!`);
        break;
    }

    return dataUpdate;
  }

  //initializes collection data and interval
  useEffect(() => {
    refreshData();

    const intervalId = setInterval(() => {
      refreshData();
    }, time);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [time, refreshData]);

  return [collectionsData, refreshCollection];
}
