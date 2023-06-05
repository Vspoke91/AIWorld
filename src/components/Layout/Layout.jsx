import { Outlet, Link } from "react-router-dom";
import './Layout.css'
import { ArrowSVG } from '../../assets/CustomIcons';

const Layout = () => {

  return (
    <>
      <div id="header-holder">
        <header className='qs__flex_column'>
            <Link to='/' className='logo qs__flex_column __flex_center'>
                <img src='/img/logos/AI-World-Small.png'/>
                <span>AI World</span>
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