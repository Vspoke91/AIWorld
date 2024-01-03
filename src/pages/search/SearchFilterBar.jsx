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
      <div className="sticky top-[10px] mx-auto my-[20px] flex h-[50px] w-[calc(100%-70px)] max-w-[1200px] [&_*]:border-black">
        <div>
          <button className="peer relative flex h-full items-center justify-center gap-1 rounded-l-lg border-2 bg-neutral-900 px-3">
            <FontAwesomeIcon icon={faFilter} className="text-2xl" />
            <span className="text-lg font-bold">Filter</span>
          </button>

          <SortingCheckboxes activeCategoriesState={activeCategoriesState} />
        </div>

        <button
          className="basic-button palet-red! rounded-none border-y-2"
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
