//React imports
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import MarkDownConvert from "@Comp/MarkDownConvert";

export default function Default({ infoObject }) {
  return (
    <>
      <li className="rounded-lg border-2 border-black bg-neutral-900">
        <button className="group relative flex w-full items-center justify-center rounded-lg border-b-2 border-black bg-neutral-800 p-3">
          <h3 className="text-2xl font-bold transition-all group-hover:text-red-600 group-focus-visible:text-red-600">
            {infoObject.name}{" "}
            <span className="text-base font-normal text-neutral-400 transition-all group-focus-within:text-white group-hover:text-white">
              {infoObject.tag_name}
            </span>
          </h3>

          <p className="absolute right-[10px] text-sm text-neutral-400">
            {formatDistanceToNow(new Date(infoObject.published_at), {
              addSuffix: true,
            })}
          </p>
        </button>
        <div className="w-full overflow-hidden px-3 transition-all">
          <p className="my-2">
            Released:{" "}
            {new Date(infoObject.published_at).toLocaleDateString("en-US")}
          </p>
          <hr className="mx-auto border-neutral-700" />
          <div className="my-2">
            <MarkDownConvert
              mdText={infoObject.body}
              linkStyle="underline hover:text-blue-500 transition-all focus-within:text-blue-500"
              listStyle="text-base before:content-['-'] before:mr-2"
            />
          </div>
        </div>
      </li>
    </>
  );
}

Default.propTypes = {
  infoObject: PropTypes.object.isRequired,
};
