// React Imports
import PropTypes from "prop-types";
//Icons Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
// Components Imports
import SortingButtons from "./SearchSortingButtons";
import SortingCheckboxes from "./SortingCheckboxes";

export default function Default({ activeCategoriesState }) {
  const [, setSortingButtonNames] = activeCategoriesState;

  const clearActiveCategoriesHandler = () => {
    setSortingButtonNames([]);
  };

  return (
    <>
      <div className="sticky top-[10px] mx-auto flex h-[50px] w-[80%] rounded-lg border-2 border-black bg-neutral-900">
        <div className="group relative flex cursor-pointer items-center justify-center gap-1 rounded-l-lg bg-black px-3">
          <FontAwesomeIcon icon={faFilter} className="text-2xl" />
          <span className="text-lg font-bold">Filter</span>
          <SortingCheckboxes activeCategoriesState={activeCategoriesState} />
        </div>

        <button
          className="basic-button palet-red! rounded-none"
          onClick={clearActiveCategoriesHandler}
        >
          Clear
        </button>
        <SortingButtons activeCategoriesState={activeCategoriesState} />
      </div>
    </>
  );
}

Default.propTypes = {
  activeCategoriesState: PropTypes.array.isRequired,
};
