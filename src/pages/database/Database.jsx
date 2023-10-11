import { useState } from 'react';
import '@/tailwind.css'
import UserUI from './section/UserUI/User_Comp'
import LoginUI from './section/loginUI/Login_Comp'

function Database (){

    let [loggedIn, setLoggedIn] = useState(false);

    return(
        <>
           <main className='mx-auto w-fit'>
                {loggedIn ? <UserUI/> : <LoginUI loggedInState={{loggedIn, setLoggedIn}}/>}
            </main>
        </>
    );
}


export default Database;