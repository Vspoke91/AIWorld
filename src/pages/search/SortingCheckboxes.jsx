// React imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Data Imports
import { default as database } from "@Data/firebase";
// Components imports
import LoadingIcon from "@Comp/LoadingIcon";

export default function Default({ activeCategoriesState }) {
  const [activeCategories, setActiveCategories] = activeCategoriesState;

  //--DATABASE--//
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async function () {
      setCategories(await database.getCategories());
    })();
  }, []);

  const activateCategoryHandler = (event) => {
    const checkboxCategory = event.target.name;

    if (activeCategories.includes(checkboxCategory)) {
      setActiveCategories(
        activeCategories.filter((category) => category !== checkboxCategory),
      );
      return;
    } else {
      setActiveCategories((prev) => {
        return [...prev, checkboxCategory];
      });
    }
  };

  return (
    <>
      <div className="absolute left-0 top-[calc(100%-10px)] z-[-1] hidden flex-col overflow-hidden rounded-b-lg bg-neutral-500 pb-1 pt-[10px] hover:flex peer-hover:flex">
        <span className="mx-2 text-sm font-bold">Most have:</span>
        <ul className="contents">
          {categories?.length ? (
            Object.keys(categories).map((key) => (
              <li key={key} className="contents">
                <label className="inline cursor-pointer whitespace-nowrap px-2 hover:bg-black">
                  <input
                    type="checkbox"
                    name={categories[key].text}
                    className="mr-1"
                    checked={activeCategories.includes(categories[key].text)}
                    onClick={activateCategoryHandler}
                  />
                  {categories[key].text}
                </label>
              </li>
            ))
          ) : (
            <LoadingIcon
              iconSize="text-2xl"
              text="loading"
              textSize="text-lg"
            />
          )}
        </ul>
      </div>
    </>
  );
}

Default.propTypes = {
  activeCategoriesState: PropTypes.array.isRequired,
};
