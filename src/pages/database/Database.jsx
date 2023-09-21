import { useState } from 'react';
import './Database.css'
import UserUI from './section/UserUI/User_Comp'
import LoginUI from './section/loginUI/Login_Comp'

function Database (){

    let [loggedIn, setLoggedIn] = useState(false);

    return(
        <>
            <div id='database'>
                {loggedIn ? <UserUI/> : <LoginUI loggedInState={{loggedIn, setLoggedIn}}/>}
            </div>
        </>
    );
}


export default Database;