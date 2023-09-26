import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from 'prop-types';

export const WebsiteFormEdit = forwardRef(({ isObjectNew, websiteObject, database, onSubmitFunction }, ref) => {

    const formRef = useRef(null);

    /* WebsiteObject Rule
    if websiteObject is new then websiteObject is null,
    dont use properties of websiteObject when is new.
    */

    function CategoriesInputs() {

        function webObjectHasCategory(itemChecked) {
            return websiteObject.categories.some(item => item.text === itemChecked.text)
        }

        return database.categories.map((category, index) =>
            <label key={index}>{`${category.text}: `}
                <input type="checkbox" name='categories' value={category.id} defaultChecked={isObjectNew ? false : webObjectHasCategory(category)} />
            </label>
        )
    }

    function TagsOptions() {
        return database.tags.map((tag, index) =>
            <option key={index} value={tag.id}>{tag.text}</option>
        )
    }

    function getDataObject() {

        const formData = new FormData(formRef.current)
        const websiteVariables = {
            featured: false,
            categories: []
        }

        formData.forEach((value, key) => {
            if (Array.isArray(websiteVariables[key])) { // checks if key is in variables if not then just add it, useful when using an array since it will come up more than one
                websiteVariables[key].push(value) // add the new value to the variable
            } else {
                websiteVariables[key] = value
            }
        });

        /* Expain Code
        this if goes as "if object exist then give Object.id, else give name in lowercase"
        the ? means that Object.id might be undefined, so if it is dont try to get id or it will break.
        */
        websiteVariables['id'] = websiteObject?.id ?? websiteVariables['name'].toLowerCase();

        return websiteVariables;
    }

    useImperativeHandle(ref, () => ({
        getDataObject,
        reset: function () {
            formRef.current.reset();
        }
    }));

    return (
        <form ref={formRef} onSubmit={onSubmitFunction}>
            <label>Id: {isObjectNew ? "N/A" : websiteObject.id}</label>
            <label>Featured: <input value={true} name='featured' type="checkbox" defaultChecked={isObjectNew ? false : websiteObject.featured} /></label>
            <label>Name: <input required name='name' type="text" defaultValue={isObjectNew ? '' : websiteObject.name} /></label>
            <label>Description: <textarea required name='description' type="text" defaultValue={isObjectNew ? '' : websiteObject.description} /></label>
            <label>Web Link: <input required name='webLink' type="text" defaultValue={isObjectNew ? '' : websiteObject.webLink} /></label>
            <label>Logo Url: <textarea required name='logoUrl' type="text" defaultValue={isObjectNew ? '' : websiteObject.logoUrl} onChange={(e) => {/*FIXME: this code renders weird, flickes*/formRef.current.querySelector('#logoUrlImgDisplay').src = e.target.value }}></textarea></label>
            <img id='logoUrlImgDisplay' src={isObjectNew ? '' : websiteObject.logoUrl} />
            <select required name='tag' defaultValue={isObjectNew ? '' : websiteObject.tag.id}>
                <option value={''} disabled>Select tag</option>
                <TagsOptions />
            </select>
            <div>categories: <CategoriesInputs /> </div>
            <SubmitButton isNew={isObjectNew} />
        </form>
    );
})
WebsiteFormEdit.displayName = 'ModalMessagePopup';
WebsiteFormEdit.propTypes = {
    isObjectNew: PropTypes.bool,
    websiteObject: PropTypes.object,
    onSubmitFunction: PropTypes.func,
    database: PropTypes.object
};

export const TagFormEdit = forwardRef(({ isObjectNew, tagObject, onSubmitFunction }, ref) => {

    const formRef = useRef(null);

    function getDataObject() {

        const formData = new FormData(formRef.current)
        const newObject = {}

        formData.forEach((value, key) => {
            newObject[key] = value
        });

        /* Expain Code
        this if goes as "if object exist then give Object.id, else give name in lowercase"
        the ? means that Object.id might be undefined, so if it is dont try to get id or it will break.
        */
        newObject['id'] = tagObject?.id ?? newObject['text'].toLowerCase();

        return newObject;
    }

    useImperativeHandle(ref, () => ({
        getDataObject,
        reset: function() {
            formRef.current.reset();
        }
    }));

    return (
        <form ref={formRef} onSubmit={onSubmitFunction}>
            <label>Id: {isObjectNew ? "N/A" : tagObject.id}</label>
            <label>Text: <input required name='text' type="text" defaultValue={isObjectNew ? '' : tagObject.text} /></label>
            <label>Color: <input required name='color' type="text" defaultValue={isObjectNew ? '' : tagObject.color} /></label>
            <SubmitButton isNew={isObjectNew} />
        </form>
    );
})
TagFormEdit.displayName = 'TagFormEdit';
TagFormEdit.propTypes = {
    isObjectNew: PropTypes.bool,
    tagObject: PropTypes.object,
    onSubmitFunction: PropTypes.func,
};

export const CategoryFormEdit = forwardRef(({ isObjectNew, categoryObject, onSubmitFunction }, ref) => {

    const formRef = useRef(null);

    function getDataObject() {

        const formData = new FormData(formRef.current)
        const newObject = {}

        formData.forEach((value, key) => {
            newObject[key] = value
        });

        /* Expain Code
        this if goes as "if object exist then give Object.id, else give name in lowercase"
        the ? means that Object.id might be undefined, so if it is dont try to get id or it will break.
        */
        newObject['id'] = categoryObject?.id ?? newObject['text'].toLowerCase();

        return newObject;
    }

    useImperativeHandle(ref, () => ({
        getDataObject,
        reset: function() {
            formRef.current.reset();
        }
    }));

    return (
        <form ref={formRef} onSubmit={onSubmitFunction}>
            <label>Id: {isObjectNew ? "N/A" : categoryObject.id}</label>
            <label>Text: <input required name='text' type="text" defaultValue={isObjectNew ? '' : categoryObject.text} /></label>
            <label>Color: <input required name='color' type="text" defaultValue={isObjectNew ? '' : categoryObject.color} /></label>
            <SubmitButton isNew={isObjectNew} />
        </form>
    );
})
CategoryFormEdit.displayName = 'CategoryFormEdit';
CategoryFormEdit.propTypes = {
    isObjectNew: PropTypes.bool,
    categoryObject: PropTypes.object,
    onSubmitFunction: PropTypes.func,
};

function SubmitButton({ isNew }) {
    return isNew ? <button type="submit">Create</button> : <button type="submit">Update</button>
}
SubmitButton.propTypes = {
    isNew: PropTypes.bool,
};