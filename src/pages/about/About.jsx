//styles imports
import './About.css'
import { CopySVG } from '../../assets/CustomIcons';
import { useRef } from 'react';

function About() {

    const companyEmail = "aiworld@veltaproject.com"
    const copyButtonRef = useRef(0);
    const copyTextRef = useRef(0);

    const CopyEmailClickHandler = () => {
        navigator.clipboard.writeText(companyEmail)

        const classNameHolder = copyButtonRef.current.className;
        const textHolder = copyTextRef.current.innerText;

        copyButtonRef.current.className += " copied";
        copyTextRef.current.innerText = "Copied!"

        setTimeout(() => {
            copyButtonRef.current.className = classNameHolder;
            copyTextRef.current.innerText = textHolder;
        }, 2000);
    }

    return (
        <>
            <div id='MissionSection_About'>
                <div className='img-part'><img className='frontSide' src='/img/logos/AI-World-Large.png'/><img className='backSide' src='https://veltaproject.com/VeltaLogo.png'/></div>
                <h1>About AI World</h1>
                <p>At AIWorld, we believe that artificial intelligence can make your life easier, smarter, and more fun. That’s why we created a platform that connects you with the best AI-powered websites for your personal, academic, and professional needs. Whether you want to find a new recipe, write an essay, or design a logo, we have the right AI tool for you. <br/><br/>AIWorld is your gateway to the world of artificial intelligence. Our mission is to democratize access to artificial intelligence and empower everyone to benefit from its potential. We value innovation, creativity, and diversity, and we strive to provide a safe and friendly environment for our users and creators. AIWorld is more than just a website, it’s a community of AI enthusiasts and learners.</p>
            </div>

            <div id='MediaSection_About'>
                <h2>Social Media</h2>
                <span>check our latest news!</span>
                <div>
                    <a href='https://instagram.com/veltaproject?utm_source=qr&igshid=ZDc4ODBmNjlmNQ%3D%3D' target='_blank' rel="noreferrer">
                        <img src='/img/media/Instagram.svg'/>
                    </a>
                    <a href='https://github.com/Vspoke91/AIWorld#readme' target='_blank' rel="noreferrer">
                        <img src='/img/media/Github.svg'/>
                    </a>
                </div>
            </div>

            <div id='ContactSection_About'>
                <h2>Contact Us</h2>
                <span>any questions? ask us!</span>
                <div>
                    <a href={`mailto:${companyEmail}`}>{companyEmail}</a>
                    <button ref={copyButtonRef} className='copyButton' onClick={CopyEmailClickHandler}>
                        <span ref={copyTextRef} id='copyTextButton'>Copy</span>
                        <CopySVG fill='#e3e3e3' />
                    </button>
                </div>
            </div>

            <div id='CreatorSection_About'>
                <h2>Creator</h2>
                <span>get to know the founder!</span>
                <p>Victor Romero</p>
            </div>
        </>
    );
}

export default About;