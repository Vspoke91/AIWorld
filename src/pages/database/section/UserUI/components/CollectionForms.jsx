import { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from 'prop-types';

export const WebsiteFormEdit = forwardRef(({isWebObjectNew, websiteObject, database, onSubmitFunction}, ref) => {

    const formRef = useRef(null);

    /* WebsiteObject Rule
    if websiteObject is new then websiteObject is null,
    dont use properties of websiteObject when is new.
    */

    function CategoriesInputs() {

        function webObjectHasCategory(itemChecked){
            return websiteObject.categories.some(item => item.text === itemChecked.text)
        }

        return database.categories.map((category, index)  =>
            <label key={index}>{`${category.text}: `}
                <input type="checkbox" name='categories' value={category.id} defaultChecked={isWebObjectNew ? false : webObjectHasCategory(category)}/>
            </label>
        )
    }

    function TagsOptions() {
        return database.tags.map((tag, index) =>
            <option key={index} value={tag.id}>{tag.text}</option>
        )
    }

    function getDataObject () {

        const formData =  new FormData(formRef.current)
        const websiteVariables = {
            featured: false,
            categories: []
        }

        formData.forEach((value, key) => {
            if(Array.isArray(websiteVariables[key])){ // checks if key is in variables if not then just add it, useful when using an array since it will come up more than one
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
        reset: function(){
            formRef.current.reset();
        }
    }));

    return(
        <form ref={formRef} onSubmit={onSubmitFunction}>
                <label>Id: {isWebObjectNew ? "N/A" : websiteObject.id }</label>
                <label>Featured: <input value={true} name='featured' type="checkbox" defaultChecked={isWebObjectNew ? false : websiteObject.featured}/></label>
                <label>Name: <input required name='name' type="text" defaultValue={isWebObjectNew ? '' : websiteObject.name}/></label>
                <label>Description: <textarea required name='description' type="text" defaultValue={isWebObjectNew ? '' : websiteObject.description}/></label>
                <label>Web Link: <input required name='webLink' type="text" defaultValue={isWebObjectNew ? '' : websiteObject.webLink}/></label>
                <label>Logo Url: <textarea required name='logoUrl' type="text" defaultValue={isWebObjectNew ? '' : websiteObject.logoUrl} onChange={(e)=>{/*FIXME: this code renders weird, flickes*/formRef.current.querySelector('#logoUrlImgDisplay').src = e.target.value}}></textarea></label>
                <img id='logoUrlImgDisplay' src={isWebObjectNew ? '' : websiteObject.logoUrl}/>
                <select required name='tag' defaultValue={isWebObjectNew ? '' : websiteObject.tag.id}>
                    <option value={''} disabled>Select tag</option>
                    <TagsOptions/>
                </select>
                <div>categories: <CategoriesInputs/> </div>
                {isWebObjectNew ? <button type="submit">Create</button> : <button type="submit">Update</button>}
        </form>
    );
})
WebsiteFormEdit.displayName = 'ModalMessagePopup';
WebsiteFormEdit.propTypes = {
    isWebObjectNew: PropTypes.bool,
    websiteObject: PropTypes.object, 
    onSubmitFunction: PropTypes.func, 
    database: PropTypes.object
};

export const TagFormEdit = forwardRef(({isTagObjectNew, tagObject, onSubmitFunction}, ref) => {

    const formRef = useRef(null);

    function getDataObject () {

        const formData =  new FormData(formRef.current)
        const websiteVariables = {}

        formData.forEach((value, key) => {
            websiteVariables[key] = value
        });

        /* Expain Code
        this if goes as "if object exist then give Object.id, else give name in lowercase"
        the ? means that Object.id might be undefined, so if it is dont try to get id or it will break.
        */
        websiteVariables['id'] = tagObject?.id ?? websiteVariables['name'].toLowerCase();

        return websiteVariables;
    }

    useImperativeHandle(ref, () => ({
        getDataObject,
        reset: function(){
            formRef.current.reset();
        }
    }));

    return (
        <form ref={formRef} onSubmit={onSubmitFunction}>
            <label>Id: {isTagObjectNew ? "N/A" : tagObject.id }</label>
            <label>Text: <input required name='text' type="text" defaultValue={isTagObjectNew ? '' : tagObject.text}/></label>
            <label>Color: <input required name='color' type="text" defaultValue={isTagObjectNew ? '' : tagObject.color}/></label>
        </form>
    );
})
TagFormEdit.displayName = 'TagFormEdit';
TagFormEdit.propTypes = {
    isTagObjectNew: PropTypes.bool,
    tagObject: PropTypes.object, 
    onSubmitFunction: PropTypes.func, 
};