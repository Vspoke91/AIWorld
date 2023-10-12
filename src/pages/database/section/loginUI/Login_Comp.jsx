import { useRef } from "react";
import PropTypes from "prop-types";
import { authentication } from "@/src/assets/database/firebase";

Login.propTypes = {
  loggedInState: PropTypes.shape({
    loggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func,
  }),
};
export default function Login({ loggedInState }) {
  let emailInputRef = useRef(null);
  let passwordInputRef = useRef(null);

  const onSubmitLoginHandler = (e) => {
    e.preventDefault();

    if (!loggedInState.loggedIn) {
      const email = emailInputRef.current.value;
      const password = passwordInputRef.current.value;

      (async function () {
        loggedInState.setLoggedIn(await authentication.login(email, password));
      })();
    } else {
      console.error("Already Logged in, request was deny");
    }
  };

  return (
    <>
      <div className="w-[300px] pt-[5vw]">
        <img
          className="pointer-events-none mx-auto mb-5 w-[150px]"
          src="/img/logos/AI-World-Small.png"
          alt="AI World Logo"
        />
        <h1 className="mx-auto w-fit pb-5 text-3xl font-bold">Admin Login</h1>
        <form className="flex flex-col gap-3" onSubmit={onSubmitLoginHandler}>
          <input
            className="basic-input-text"
            ref={emailInputRef}
            type="email"
            placeholder="Email address"
          />
          <input
            className="basic-input-text"
            ref={passwordInputRef}
            type="password"
            placeholder="Password"
          />
          <button className="basic-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
