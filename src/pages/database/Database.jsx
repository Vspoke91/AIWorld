import { useState } from "react";
import UserUI from "./section/UserUI/User_Comp";
import LoginUI from "./section/loginUI/Login_Comp";

function Database() {
  let [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn ? (
        <UserUI />
      ) : (
        <LoginUI loggedInState={{ loggedIn, setLoggedIn }} />
      )}
    </>
  );
}

export default Database;
