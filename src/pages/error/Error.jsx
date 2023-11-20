import { Link, useLocation } from "react-router-dom";

function Error() {
  return (
    <>
      <div id="MessageSection_Error">
        <h1>404 Error</h1>
        <p>
          Sorry page <b>&quot;{useLocation().pathname.slice(1)}&quot;</b> was
          not found!
        </p>
        <Link to="/">
          <button>Go to Home</button>
        </Link>
      </div>
    </>
  );
}

export default Error;
