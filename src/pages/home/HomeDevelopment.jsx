// React imports
import { useEffect, useState } from "react";

// Components imports
import DevItem from "./DevelopmentItem";

export default function Default() {
  const RELEASE_GITHUB_API =
    "https://api.github.com/repos/vspoke91/aiworld/releases";
  const [versionArrayList, setVersionArrayList] = useState(null);

  //fetch data from github
  useEffect(() => {
    fetch(`${RELEASE_GITHUB_API}`)
      .then((res) => res.json())
      .then((array) => setVersionArrayList(array));
  }, []);

  return (
    <>
      <h2 className="my-3 text-center text-3xl font-bold">
        Development & Updates
      </h2>
      <ul className="mx-auto flex max-w-[900px] flex-col gap-2">
        {versionArrayList ? (
          versionArrayList.map((value, index) => (
            <DevItem key={index} infoObject={value} />
          ))
        ) : (
          <>Loading...</>
        )}
      </ul>
    </>
  );
}
