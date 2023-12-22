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
      <ul className="flex items-center px-2 py-1">
        {activeCategories && activeCategories.length ? (
          activeCategories.map((category) => (
            <li key={category} className="h-full rounded-lg bg-slate-800">
              <button onClick={deactivateButtonHandler}>{category}</button>
            </li>
          ))
        ) : (
          <li className="font-bold">No category selected!</li>
        )}
      </ul>
    </>
  );
}

Default.propTypes = {
  activeCategoriesState: PropTypes.array.isRequired,
};
