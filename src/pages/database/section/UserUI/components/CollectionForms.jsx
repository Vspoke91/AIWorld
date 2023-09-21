import { forwardRef } from "react";
import PropTypes from 'prop-types';

export const WebsiteFormEdit = forwardRef(({ isWebObjectNew, websiteObject, database, onSubmitFunction}, ref) => {


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
                <input type="checkbox" name='categories[]' value={category.id} defaultChecked={isWebObjectNew ? false : webObjectHasCategory(category)}/>
            </label>
        )
    }

    function TagsOptions() {
        return database.tags.map((tag, index) =>
            <option key={index} value={tag.id}>{tag.text}</option>
        )
    }

    return(
        <form ref={ref} onSubmit={onSubmitFunction}>
                <label>Id: {isWebObjectNew ? "N/A" : websiteObject.id }</label>
                <label>Featured: <input name='featured' type="checkbox" defaultChecked={isWebObjectNew ? false : websiteObject.featured}/></label>
                <label>Name: <input required name='name' type="text" defaultValue={isWebObjectNew ? '' : websiteObject.name}/></label>
                <label>Description: <textarea required name='description' type="text" defaultValue={isWebObjectNew ? '' : websiteObject.description}/></label>
                <label>Web Link: <input required name='webLink' type="text" defaultValue={isWebObjectNew ? '' : websiteObject.webLink}/></label>
                <label>Logo Url: <textarea required name='logoUrl' type="text" defaultValue={isWebObjectNew ? '' : websiteObject.logoUrl} onChange={(e)=>{/*FIXME: this code renders weird, flickes*/ref.current.querySelector('#logoUrlImgDisplay').src = e.target.value}}></textarea></label>
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