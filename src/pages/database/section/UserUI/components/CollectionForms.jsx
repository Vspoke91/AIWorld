import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import { useState } from "react";

export const WebsiteFormEdit = forwardRef(
  ({ isObjectNew, websiteObject, database, onSubmitFunction }, ref) => {
    const formRef = useRef(null);

    /* WebsiteObject Rule
    if websiteObject is new then websiteObject is null,
    dont use properties of websiteObject when is new.
    */

    function CategoriesInputs() {
      function webObjectHasCategory(itemChecked) {
        return websiteObject.categories.some(
          (item) => item.text === itemChecked.text,
        );
      }

      return database.categories.map((category, index) => (
        <label
          key={index}
          className="flex flex-row-reverse justify-end gap-1 font-bold"
        >
          <span className="cursor-pointer select-none">{`${category.text}`}</span>
          <input
            className="basic-input_check palet-white"
            type="checkbox"
            name="categories"
            value={category.id}
            defaultChecked={
              isObjectNew ? false : webObjectHasCategory(category)
            }
          />
        </label>
      ));
    }

    function TagsOptions() {
      return database.tags.map((tag, index) => (
        <option key={index} value={tag.id}>
          {tag.text}
        </option>
      ));
    }

    function getDataObject() {
      const formData = new FormData(formRef.current);
      const websiteVariables = {
        featured: false,
        categories: [],
      };

      formData.forEach((value, key) => {
        if (Array.isArray(websiteVariables[key])) {
          // checks if key is in variables if not then just add it, useful when using an array since it will come up more than one
          websiteVariables[key].push(value); // add the new value to the variable
        } else {
          websiteVariables[key] = value;
        }
      });

      /* Expain Code
        this if goes as "if object exist then give Object.id, else give name in lowercase"
        the ? means that Object.id might be undefined, so if it is dont try to get id or it will break.
        */
      websiteVariables["id"] =
        websiteObject?.id ?? websiteVariables["name"].toLowerCase();

      return websiteVariables;
    }

    let logoImgTimeOut;
    function onInputChangeHandler(e) {
      clearTimeout(logoImgTimeOut); // Clear any existing timeouts

      logoImgTimeOut = setTimeout(() => {
        if (e.target.value)
          formRef.current.querySelector("#logoUrlImgDisplay").src =
            e.target.value;
      }, 500);
    }

    useImperativeHandle(ref, () => ({
      getDataObject,
      reset: function () {
        formRef.current.reset();
      },
    }));

    return (
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault();

          formRef.current.querySelector(
            'button[type="submit"]',
          ).disabled = true;
          await onSubmitFunction();
          formRef.current.querySelector(
            'button[type="submit"]',
          ).disabled = false;
        }}
      >
        <label className="mt-3 flex text-lg font-bold">
          <span className="mr-1 w-[15%] text-right">ID:</span>
          {isObjectNew ? "N/A" : websiteObject.id}
        </label>
        <label className="flex">
          <span className="mr-1 w-[15%] text-right">Featured:</span>
          <input
            className="basic-input_check palet-white"
            value={true}
            name="featured"
            type="checkbox"
            defaultChecked={isObjectNew ? false : websiteObject.featured}
          />
        </label>
        <label className="flex items-center">
          <span className="mr-1 w-[15%] text-right">Name:</span>
          <input
            className="basic-input_text palet-white"
            required
            name="name"
            type="text"
            defaultValue={isObjectNew ? "" : websiteObject.name}
          />
        </label>
        <label className="flex">
          <span className="mr-1 w-[15%] text-right">Description:</span>
          <textarea
            className="basic-input_text palet-white min-h-[50px] min-w-[20%] max-w-[50%] resize"
            maxLength="20px"
            required
            name="description"
            type="text"
            defaultValue={isObjectNew ? "" : websiteObject.description}
          />
        </label>
        <label className="flex items-center">
          <span className="mr-1 w-[15%] text-right">Web Link:</span>
          <input
            className="basic-input_text palet-white"
            required
            name="webLink"
            type="text"
            defaultValue={isObjectNew ? "" : websiteObject.webLink}
          />
        </label>
        <label className="flex">
          <span className="mr-1 w-[15%] text-right">Logo Url:</span>
          <div className="flex max-w-[50%] flex-col">
            <img
              className="mb-1 ml-1 h-auto w-[150px] min-w-[20%]"
              id="logoUrlImgDisplay"
              src={isObjectNew ? "" : websiteObject.logoUrl}
            />
            <textarea
              className="basic-input_text palet-white min-h-[50px] min-w-[100%] max-w-[100%] resize"
              required
              name="logoUrl"
              type="text"
              defaultValue={isObjectNew ? "" : websiteObject.logoUrl}
              onChange={onInputChangeHandler}
            />
          </div>
        </label>
        <label className="flex items-center">
          <span className="w-[15%] text-right">Tag:</span>
          <div className="basic-select_wrapper palet-white">
            <SelectReactive
              className="basic-select palet-white [&>*]:palet-white"
              required
              name="tag"
              defaultValue={isObjectNew ? "" : websiteObject.tag.id}
              trigger={websiteObject?.id}
            >
              <option value={""} disabled>
                Select tag
              </option>
              <TagsOptions />
            </SelectReactive>
          </div>
        </label>
        <div className="flex">
          <span className="w-[15%] text-right">Categories:</span>
          <div className="ml-1 grid grid-cols-3 gap-2">
            <CategoriesInputs />
          </div>
        </div>
        <SubmitButton
          className={"basic-button palet-cyan! ml-[15%] w-[150px]"}
          isNew={isObjectNew}
        />
      </form>
    );
  },
);
WebsiteFormEdit.displayName = "ModalMessagePopup";
WebsiteFormEdit.propTypes = {
  isObjectNew: PropTypes.bool,
  websiteObject: PropTypes.object,
  onSubmitFunction: PropTypes.func,
  database: PropTypes.object,
};

export const TagFormEdit = forwardRef(
  ({ isObjectNew, tagObject, onSubmitFunction }, ref) => {
    const formRef = useRef(null);

    function getDataObject() {
      const formData = new FormData(formRef.current);
      const newObject = {};

      formData.forEach((value, key) => {
        newObject[key] = value;
      });

      /* Expain Code
        this if goes as "if object exist then give Object.id, else give name in lowercase"
        the ? means that Object.id might be undefined, so if it is dont try to get id or it will break.
        */
      newObject["id"] = tagObject?.id ?? newObject["text"].toLowerCase();

      return newObject;
    }

    useImperativeHandle(ref, () => ({
      getDataObject,
      reset: function () {
        formRef.current.reset();
      },
    }));

    return (
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault();

          formRef.current.querySelector(
            'button[type="submit"]',
          ).disabled = true;
          await onSubmitFunction();
          formRef.current.querySelector(
            'button[type="submit"]',
          ).disabled = false;
        }}
      >
        <label className="mt-3 flex text-lg font-bold">
          <span className="mr-1 w-[15%] text-right">ID:</span>
          {isObjectNew ? "N/A" : tagObject.id}
        </label>
        <label className="flex items-center">
          <span className="mr-1 w-[15%] text-right">Text:</span>
          <input
            className="basic-input_text palet-white"
            required
            name="text"
            type="text"
            defaultValue={isObjectNew ? "" : tagObject.text}
          />
        </label>
        <label className="flex items-center">
          <span className="mr-1 w-[15%] text-right">Color:</span>
          <input
            className="basic-input_text palet-white"
            required
            name="color"
            type="text"
            defaultValue={isObjectNew ? "" : tagObject.color}
          />
        </label>
        <SubmitButton
          className={"basic-button palet-cyan! ml-[15%] w-[150px]"}
          isNew={isObjectNew}
        />
      </form>
    );
  },
);
TagFormEdit.displayName = "TagFormEdit";
TagFormEdit.propTypes = {
  isObjectNew: PropTypes.bool,
  tagObject: PropTypes.object,
  onSubmitFunction: PropTypes.func,
};

export const CategoryFormEdit = forwardRef(
  ({ isObjectNew, categoryObject, onSubmitFunction }, ref) => {
    const formRef = useRef(null);

    function getDataObject() {
      const formData = new FormData(formRef.current);
      const newObject = {};

      formData.forEach((value, key) => {
        newObject[key] = value;
      });

      /* Expain Code
        this if goes as "if object exist then give Object.id, else give name in lowercase"
        the ? means that Object.id might be undefined, so if it is dont try to get id or it will break.
        */
      newObject["id"] = categoryObject?.id ?? newObject["text"].toLowerCase();

      return newObject;
    }

    useImperativeHandle(ref, () => ({
      getDataObject,
      reset: function () {
        formRef.current.reset();
      },
    }));

    return (
      <form
        className="flex flex-col gap-4"
        ref={formRef}
        onSubmit={async (e) => {
          e.preventDefault();

          formRef.current.querySelector(
            'button[type="submit"]',
          ).disabled = true;
          await onSubmitFunction();
          formRef.current.querySelector(
            'button[type="submit"]',
          ).disabled = false;
        }}
      >
        <label className="mt-3 flex text-lg font-bold">
          <span className="mr-1 w-[15%] text-right">ID:</span>
          {isObjectNew ? "N/A" : categoryObject.id}
        </label>
        <label className="flex items-center">
          <span className="mr-1 w-[15%] text-right">Text:</span>
          <input
            className="basic-input_text palet-white"
            required
            name="text"
            type="text"
            defaultValue={isObjectNew ? "" : categoryObject.text}
          />
        </label>
        <label className="flex items-center">
          <span className="mr-1 w-[15%] text-right">Color:</span>
          <input
            className="basic-input_text palet-white"
            required
            name="color"
            type="text"
            defaultValue={isObjectNew ? "" : categoryObject.color}
          />
        </label>
        <SubmitButton
          className={"basic-button palet-cyan! ml-[15%] w-[150px]"}
          isNew={isObjectNew}
        />
      </form>
    );
  },
);
CategoryFormEdit.displayName = "CategoryFormEdit";
CategoryFormEdit.propTypes = {
  isObjectNew: PropTypes.bool,
  categoryObject: PropTypes.object,
  onSubmitFunction: PropTypes.func,
};

function SubmitButton({ isNew, ...buttonProps }) {
  return isNew ? (
    <button type="submit" {...buttonProps}>
      Create
    </button>
  ) : (
    <button type="submit" {...buttonProps}>
      Update
    </button>
  );
}
SubmitButton.propTypes = {
  isNew: PropTypes.bool,
};

function SelectReactive({ children, defaultValue, trigger, ...selectProps }) {
  /* Why Make A New Select Component

    the problem with <select> is that it does change defaultValue after each render,
    so the first render defines what the rest of the defaultValue will be.

    to fix this SelectReactive will change 'default value' when ever it changes, 
    but another problem was found.

    what if defaultValue did not change but the form you are using has different values for example:

        [
            {
                Name: Toyota,
                Color: Red,
            },
            {
                Name: Subaru,
                Color: Red,
            }
        ]
    
    what if you change form from toyota to subaru but the color (select) did not change,
    if you were on the Toyota form and you change from red to blue then move to Subaru it will stay on blue,
    because the default of toyota was red such as subaru.

    thats why trigger was added,
    so you can setValue back to defaultValue if default is the same as the last form.

    */
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue, trigger]); // trigger is used when defaultValue did not change, but we need to reset the value to default.

  return (
    <select
      {...selectProps}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {children}
    </select>
  );
}
SelectReactive.propTypes = {
  children: PropTypes.array,
  defaultValue: PropTypes.string,
  trigger: PropTypes.any,
};
