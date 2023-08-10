import { Link, useLocation } from 'react-router-dom';

function Error(){

    return(
        <>
            <div>
                <h1>404 Error</h1>
                <p><b>&quot;{useLocation().pathname.slice(1)}&quot;</b> not found!</p>
                <Link to="/"><button>Go back to Home</button></Link>
            </div>
        </>
    );
}

export default Error;