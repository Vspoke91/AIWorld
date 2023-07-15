//styles imports
import './About.css'

function About() {
    return (
        <>
            <div>
                <h1>About AI World</h1>
                <div><img src='/img/logos/AI-World-Large.png'/>+<img src='https://veltaproject.com/VeltaLogo.png'/></div>
                <p>Mission</p>
            </div>

            <div>
                <h2>Media</h2>
                <p>check our latest news!</p>
                <div><span>instagram</span><span>Github</span><span>VeltaProject</span></div>
            </div>

            <div>
                <h2>Contact Us</h2>
                <p>any questions? ask us!</p>
                <div><a>aiworld@veltaproject.com</a><span></span></div>
            </div>

            <div>
                <h2>Creator</h2>
                <p>get to know me!</p>
                <p>Victor Romero</p>
            </div>
        </>
    );
}

export default About;