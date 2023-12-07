// React imports
import { useEffect, useState } from "react";
// Database imports
import { default as database } from "@Data/firebase";
// Components imports
import LoadingIcon from "@Comp/LoadingIcon";
// Icons imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

export default function Default() {
  return (
    <>
      <h2 className="my-4 ml-7 text-4xl font-bold">
        Featured<span className="text-lg font-normal"> Quicklinks</span>
      </h2>
      <ul
        className="scroll-hide flex h-[150px] snap-x snap-mandatory scroll-p-4 
      items-center justify-start gap-4 overflow-y-hidden overflow-x-scroll 
      border-y-2 border-black bg-neutral-800 px-4 shadow-[0_0_4px_5px_#3f3f3f]"
      >
        <WebsitesList />
      </ul>
    </>
  );
}

function WebsitesList() {
  const [featuredWebsites, setFeaturedWebsites] = useState([]);

  useEffect(() => {
    (async function () {
      setFeaturedWebsites(await database.getFeaturedWebsites());
    })();
  }, []);

  const getWebsiteItemElement = (item, index) => {
    return (
      <li
        key={index}
        title={`Go to ${item.name}`}
        className="group box-content h-inherit flex-shrink-0 snap-start bg-neutral-900"
      >
        <a
          href={item.webLink}
          target="_black "
          className="group z-0 grid h-inherit select-none grid-cols-1 grid-rows-1 outline-none"
        >
          <img
            src={item.logoUrl}
            className="pointer-events-none z-0 col-[1] row-[1] mx-auto h-inherit scale-90 transition-all group-hover:scale-100  group-focus-visible:scale-100"
          />
          <h3 className="font-xl z-[1] col-[1] row-[1] self-end bg-[#00000089] py-1 text-center text-xl font-bold transition-all group-hover:text-orange-400 group-focus-visible:text-orange-400">
            {item.name}
          </h3>
          <FontAwesomeIcon
            icon={faArrowUpRightFromSquare}
            className="z-[1] col-[1] row-[1] -translate-y-full justify-self-end rounded-bl-lg bg-[#00000089] p-1 text-xl transition-all group-hover:translate-y-0 group-focus-visible:translate-y-0 [&>*]:text-white"
          />
        </a>
      </li>
    );
  };
  return featuredWebsites.length > 0 ? (
    featuredWebsites.map((item, index) => getWebsiteItemElement(item, index))
  ) : (
    <LoadingIcon
      text="Loading Quicklinks"
      textSize="text-2xl"
      iconSize="text-5xl"
    />
  );
}
