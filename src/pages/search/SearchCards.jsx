// React Imports
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Data Imports
import { default as database } from "@Data/firebase";
// Components imports
import LoadingIcon from "@Comp/LoadingIcon";

export default function Default({ activeCategories }) {
  //--DATABASE--//
  const [websitesData, setWebsitesData] = useState(null);

  useEffect(() => {
    (async function () {
      setWebsitesData(await database.getWebsites());
    })();
  }, []);
  //-|DATABASE|-//

  function hasEveryCategory(activeCat, websiteCat) {
    // Check if all active categories are included in website categories, if so, return true
    const hasEvery = activeCat.every((category) => {
      // checks if the current active category is included in the website, if so, return true
      return websiteCat.includes(category);
    });

    return hasEvery;
  }

  return (
    <>
      <div className="z-[1] mx-[30px] mb-3 grid auto-rows-[350px] grid-cols-[repeat(auto-fit,300px)] justify-center">
        {websitesData?.length ? (
          websitesData.map((website, index) => {
            // #region Website Categories Sorte
            // get the categories of the website in text format (array of strings)
            const categories = website.categories.map(
              (category) => category.text,
            );

            if (!hasEveryCategory(activeCategories, categories)) return;
            // #endregion

            console.log(website.categories);
            // render the section
            return (
              <section
                key={index}
                className="flex scale-95 flex-col rounded-lg bg-black  transition-all hover:scale-100"
              >
                <h2 className="py-2 text-center text-2xl font-semibold">
                  {website.name}
                </h2>
                <img
                  src={website.logoUrl}
                  alt={`${website.name} Logo`}
                  className="mx-auto my-2 h-[150px] w-auto"
                />
                <ul className="flex gap-1 overflow-auto bg-neutral-700 p-2">
                  {website.categories.length ? (
                    website.categories.map((category, index) => {
                      return (
                        <li
                          key={index}
                          className="whitespace-nowrap rounded bg-neutral-400 px-1"
                        >
                          {category.text}
                        </li>
                      );
                    })
                  ) : (
                    <li className="rounded bg-red-600 px-1 text-white">
                      No Category
                    </li>
                  )}
                </ul>
                <p className="box-content p-2">{website.description}</p>
              </section>
            );
          })
        ) : (
          <LoadingIcon
            iconSize="text-5xl"
            text="Loading Cards"
            textSize="text-2xl"
          />
        )}
      </div>
    </>
  );
}

Default.propTypes = {
  activeCategories: PropTypes.array.isRequired,
};
