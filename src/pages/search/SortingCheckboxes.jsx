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
      <div className="clipPath-top-flat hover:clipPath-full group-hover:clipPath-full absolute left-0 top-full z-[-1] flex flex-col rounded-b-lg bg-neutral-600 pb-1 transition-all">
        <span className="mx-2 text-sm font-bold">Most have:</span>
        <ul className="contents">
          {categories?.length ? (
            Object.keys(categories).map((key) => (
              <li key={key} className="contents select-none">
                <label className="group/label flex cursor-pointer items-center gap-1 whitespace-nowrap px-2 hover:bg-orange-500">
                  <input
                    type="checkbox"
                    name={categories[key].text}
                    className="peer flex h-[15px] w-[15px] appearance-none overflow-hidden rounded-sm bg-white p-[2px] after:h-full after:w-full after:rounded-sm after:transition-all after:duration-75 checked:after:bg-neutral-800 group-hover/label:after:bg-neutral-400 group-hover/label:checked:after:bg-neutral-800"
                    checked={activeCategories.includes(categories[key].text)}
                    onClick={activateCategoryHandler}
                  />
                  <span className="group-hover/label:text-white peer-checked:text-neutral-400 peer-checked:line-through group-hover/label:peer-checked:text-neutral-200">
                    {categories[key].text}
                  </span>
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
