import { Outlet, Link } from "react-router-dom";
import './Layout.css'
import { ArrowSVG } from '../../assets/CustomIcons';
import { useState } from "react";

const Layout = () => {
  const title = Array.from("AI World");
  let alphabetArray = Array.from("abcdefghijklmnopqrstuvwxyz");

  //START OF TODO: this need better performance. crashes if do too fast
  let interval = null;
  let [titleChanger, setTitleChanger] = useState(title);

  let tittleAnimation = () =>{

    let interations = 0;
    clearInterval(interval);

    interval = setInterval(() => {
      setTitleChanger(title.map((letter, index) => {

        if(index < interations){
          return title[index];
        }

        return alphabetArray[Math.floor(Math.random()*26)]
      }))

      if(interations >= title.length)
        clearInterval(interval);

      interations += 1/4;
    }, 30)
  }
  //END OF TODO

  return (
    <>
      <div id="header-holder">
        <header className='qs__flex_column'>
            <Link to='/' className='logo qs__flex_column __flex_center' onMouseEnter={tittleAnimation}>
                <img src='/img/logos/AI-World-Small.png'/>
                <span>{titleChanger}</span>
            </Link>

            <nav className='qs__flex_column __flex_center'>
                <Link to='/search'>Search Links</Link>
                <Link to='/feedback'>Feedback</Link>
                <Link to='/about'>About</Link>
            </nav>

            <div className='quote-div'>
                <p>Artificial intelligence is the next stage in the evolution of human beings</p>
                <span>Stephen Hawking</span>
            </div>
        </header>
        <div className="slider-control"><ArrowSVG /></div>
      </div>

      <div className="qs__sidebar_spacing qs__flex_column qs__height_full_percent qs_scroll_y">
        <main>
          <Outlet/>
        </main>

        <footer>
            <div className='opensource-div'>
                <div>
                  <p>Open Source Code</p>
                  <a href='https://github.com/Vspoke91/AIWorld/blob/master/README.md'><img src="/img/logos/GitHub.svg" alt="Github Logo"/></a>
                </div>
            </div>
            <div className='velta-logo-div'>
              <a href="https://www.veltaproject.com"><img src="https://veltaproject.com/VeltaLogo.png" alt="Velta Logo"/></a>
            </div>
            <div className='copyright-div'>
              <p>© 2023 AI World, VeltaProject</p>
            </div>
        </footer>
      </div>
    </>
  )
};
  
 export default Layout;