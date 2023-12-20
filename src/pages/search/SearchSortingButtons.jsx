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
      <ul>
        {activeCategories &&
          activeCategories.map((category) => (
            <button key={category} onClick={deactivateButtonHandler}>
              {category}
            </button>
          ))}
      </ul>
    </>
  );
}

Default.propTypes = {
  activeCategoriesState: PropTypes.array.isRequired,
};
