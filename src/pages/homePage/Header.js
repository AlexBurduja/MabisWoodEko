import logo from '../../publicResources/logoMabis.svg';
import './CssHeader.css'
import { ShoppingCart } from './ShoppingCart';

export function Header() {

  return (
    <section className='flex'>
      <div className='logo'>
        <img src={logo} alt="logo"/>
      </div>

    <div className='desktopAnchors'>
      <div className='nav_anchors '>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Products</a>
        <a href='#'>Reviews</a>
        <a href='#'>Contact</a>
      </div>
    </div>

    <ShoppingCart>
    </ShoppingCart>


<div className='hamburger'>
    <input type="checkbox" id="navi-toggle" className="checkbox" />
    <label htmlFor="navi-toggle" class="button">
      <span className="icon">&nbsp;</span>
    </label>
    <div className="background">&nbsp;</div>


      <nav className="nav">
        <ul className="list">
          <li className="item"> <a href="https://www.google.com" className="link"> Home </a> </li>
          <li className="item"> <a href="https://www.google.com" className="link"> About </a> </li>
          <li className="item"> <a href="https://www.google.com" className="link"> Products </a> </li>
          <li className="item"> <a href="https://www.google.com" className="link"> Reviews </a> </li>
          <li className="item"> <a href="https://www.google.com" className="link"> Contact </a> </li>
        </ul>
      </nav>
</div>  

  </section>
  );
}
