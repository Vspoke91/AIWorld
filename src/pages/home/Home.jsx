// Components imports
import Featured from "./HomeFeatured";
import Introduction from "./HomeIntro";
import Development from "./HomeDevelopment";

function Home() {
  return (
    <>
      <div>
        <Featured />
      </div>
      <div className="my-[10vh] flex items-center justify-center gap-14">
        <Introduction />
      </div>
      <div className="mb-[50px]">
        <Development />
      </div>
    </>
  );
}

export default Home;
