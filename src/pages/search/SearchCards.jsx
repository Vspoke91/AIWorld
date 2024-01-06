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
      <div className="mx-[30px] grid auto-rows-[350px] grid-cols-[repeat(auto-fit,300px)] justify-center gap-5">
        {websitesData?.length ? (
          websitesData.map((website, index) => {
            // #region Website Categories Sorte
            // get the categories of the website in text format (array of strings)
            const categories = website.categories.map(
              (category) => category.text,
            );

            if (!hasEveryCategory(activeCategories, categories)) return;
            // #endregion

            // render the section
            return (
              <section key={index} className="overflow-hidden bg-black">
                <h2 className="py-2 text-center text-2xl font-semibold">
                  {website.name}
                </h2>
                <img
                  src={website.logoUrl}
                  alt={`${website.name} Logo`}
                  className="mx-auto h-[200px] w-auto"
                />
                <p>{website.description}</p>
                <ul>
                  {website.categories.map((category, index) => {
                    return <li key={index}>{category.text}</li>;
                  })}
                </ul>
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
