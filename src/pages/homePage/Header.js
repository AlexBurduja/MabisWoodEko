/* eslint-disable jsx-a11y/anchor-is-valid */
import { NavLink } from 'react-router-dom';
import logo from '../../publicResources/logoMabis.svg';
import './CssHeader.css'
import "./ShoppingCart.js"
import { ShoppingCart } from './ShoppingCart.js';

export function Header() {

  const activeClass = ({isActive}) => isActive ? "underline" : {};

  return (
    <section className='flex'>
      <div className='logo'>
        <img src={logo} alt="logo"/>
      </div>

    <div className='desktopAnchors'>
      <div className='nav_anchors '>
        <NavLink className={activeClass} to='/'>Home</NavLink>
        <NavLink className={activeClass} to='/cart'>About</NavLink>
        <NavLink className={activeClass} to='/b'>Products</NavLink>
        <NavLink className={activeClass} to='/c'>Reviews</NavLink>
        <NavLink className={activeClass} to='/d'>Contact</NavLink>
        </div>
    </div>

    <ShoppingCart></ShoppingCart>

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
