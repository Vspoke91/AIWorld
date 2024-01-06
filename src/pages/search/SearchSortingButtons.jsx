//React imports
import PropTypes from "prop-types";

export default function Default({ activeCategoriesState }) {
  const [activeCategories, setActiveCategories] = activeCategoriesState;

  const deactivateButtonHandler = (event) => {
    const buttonCategory = event.target.innerText;

    //find the category of the button and filter it out of activeCategories
    setActiveCategories(
      activeCategories.filter((category) => category !== buttonCategory),
    );
  };

  return (
    <>
      <div className="flex h-fit min-h-full w-full gap-1 overflow-hidden rounded-r-lg border-y-2 border-r-2 border-neutral-900 bg-neutral-800 bg-opacity-90 px-2 py-1 hover:flex-wrap hover:bg-opacity-100">
        <ul className="contents">
          {activeCategories?.length ? (
            activeCategories.map((category) => (
              <li key={category} className="contents">
                <button
                  title={`Remove ${category}`}
                  onClick={deactivateButtonHandler}
                  className="h-inherit w-min whitespace-nowrap rounded-lg border border-neutral-500 bg-neutral-600 px-2 font-semibold transition-all hover:border-white hover:bg-red-700 hover:text-white"
                >
                  {category}
                </button>
              </li>
            ))
          ) : (
            <li className="my-auto h-min w-min whitespace-nowrap font-bold text-neutral-500">
              No category selected!
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

Default.propTypes = {
  activeCategoriesState: PropTypes.array.isRequired,
};
