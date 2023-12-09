// React imports
import { useEffect, useState } from "react";
// Database imports
import { default as database } from "@Data/firebase";
// Components imports
import LoadingIcon from "@Comp/LoadingIcon";
import HorizontalScroll from "./FeaturedHorizontalScroll";
// Icons imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Default() {
  return (
    <>
      <h2 className="my-4 ml-7 text-4xl font-bold">
        Featured<span className="text-lg font-normal"> Quicklinks</span>
      </h2>

      <WebsitesList />
    </>
  );
}

function WebsitesList() {
  // React Variables
  const [featuredWebsites, setFeaturedWebsites] = useState([]);

  // Fetch data from database
  useEffect(() => {
    (async function () {
      setFeaturedWebsites(await database.getFeaturedWebsites());
    })();
  }, []);

  function createAElement(item, index) {
    return (
      <a
        key={index + item.name}
        href={item.webLink}
        target="_black "
        title={`Go to ${item.name}`}
        className="group z-0 grid h-inherit select-none grid-cols-1 grid-rows-1 outline-none"
      >
        <img
          src={item.logoUrl}
          className="pointer-events-none z-0 col-[1] row-[1] mx-auto h-inherit scale-90 transition-all  group-hover:scale-100 group-focus-visible:scale-100"
        />
        <h3 className="font-xl z-[1] col-[1] row-[1] self-end bg-[#00000089] py-1 text-center text-xl font-bold transition-all group-hover:text-orange-400 group-focus-visible:text-orange-400">
          {item.name}
        </h3>
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          className="z-[1] col-[1] row-[1] -translate-y-full justify-self-end rounded-bl-lg bg-[#00000089] p-1 text-xl transition-all group-hover:translate-y-0 group-focus-visible:translate-y-0 [&>*]:text-white"
        />
      </a>
    );
  }

  return (
    <>
      <HorizontalScroll>
        {featuredWebsites.length > 0 ? (
          featuredWebsites.map((item, index) => createAElement(item, index))
        ) : (
          <LoadingIcon
            text="Loading Quicklinks"
            textSize="text-2xl"
            iconSize="text-5xl"
          />
        )}
      </HorizontalScroll>
    </>
  );
}
