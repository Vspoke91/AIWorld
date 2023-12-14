//React imports
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import MarkDownConvert from "@Comp/MarkDownConvert";

export default function Default({ infoObject }) {
  return (
    <>
      <li
        role="button"
        tabIndex="0"
        className="rounded-lg border-2 border-black bg-neutral-900"
      >
        <div className="group relative flex items-center justify-center rounded-lg border-b-2 border-black bg-neutral-800 p-3">
          <h3 className="text-2xl font-bold transition-all group-hover:text-red-600">
            {infoObject.name}{" "}
            <span className="text-base font-normal text-neutral-400 transition-all group-hover:text-white">
              {infoObject.tag_name}
            </span>
          </h3>

          <p className="absolute right-[10px] text-sm text-neutral-400">
            {formatDistanceToNow(new Date(infoObject.published_at), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="w-full overflow-hidden px-3 transition-all">
          <p className="my-2">
            Released:{" "}
            {new Date(infoObject.published_at).toLocaleDateString("en-US")}
          </p>
          <hr className="mx-auto border-neutral-700" />
          <div className="my-2">
            <MarkDownConvert mdText={infoObject.body} />
          </div>
        </div>
      </li>
    </>
  );
}

Default.propTypes = {
  infoObject: PropTypes.object.isRequired,
};
