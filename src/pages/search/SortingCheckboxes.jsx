// React imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Data Imports
import { default as database } from "@Data/firebase";

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
      <ul className="absolute top-[100%] h-0 flex-col last:bg-black group-hover:flex">
        {categories ? (
          Object.keys(categories).map((key) => (
            <li key={key} className="contents">
              <label className="">
                <input
                  type="checkbox"
                  name={categories[key].text}
                  checked={activeCategories.includes(categories[key].text)}
                  onClick={activateCategoryHandler}
                />

                {categories[key].text}
              </label>
            </li>
          ))
        ) : (
          <label className="">Loading...</label>
        )}
      </ul>
    </>
  );
}

Default.propTypes = {
  activeCategoriesState: PropTypes.array.isRequired,
};
