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
          {categories?.length ? (
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
            <LoadingIcon
              iconSize="text-2xl"
              text="loading"
              textSize="text-lg"
            />
        )}
      </ul>
    </>
  );
}

Default.propTypes = {
  activeCategoriesState: PropTypes.array.isRequired,
};
