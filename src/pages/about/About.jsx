//styles imports
import './About.css'

function About() {
    return (
        <>
            <div id='MissionSection_About'>
                <h1>About AI World</h1>
                <div className='img-part'><img src='/img/logos/AI-World-Large.png'/>+<img src='https://veltaproject.com/VeltaLogo.png'/></div>
                <p>At AIWorld, we believe that artificial intelligence can make your life easier, smarter, and more fun. That’s why we created a platform that connects you with the best AI-powered websites for your personal, academic, and professional needs. Whether you want to find a new recipe, write an essay, or design a logo, we have the right AI tool for you. <br/><br/>AIWorld is your gateway to the world of artificial intelligence. Our mission is to democratize access to artificial intelligence and empower everyone to benefit from its potential. We value innovation, creativity, and diversity, and we strive to provide a safe and friendly environment for our users and creators. AIWorld is more than just a website, it’s a community of AI enthusiasts and learners.</p>
            </div>

            <div id='MediaSection_About'>
                <h2>Media</h2>
                <p>check our latest news!</p>
                <div><span>instagram</span><span>Github</span><span>VeltaProject</span></div>
            </div>

            <div id='ContactSection_About'>
                <h2>Contact Us</h2>
                <p>any questions? ask us!</p>
                <div><a>aiworld@veltaproject.com</a><span></span></div>
            </div>

            <div id='CreatorSection_About'>
                <h2>Creator</h2>
                <p>get to know me!</p>
                <p>Victor Romero</p>
            </div>
        </>
    );
}

export default About;