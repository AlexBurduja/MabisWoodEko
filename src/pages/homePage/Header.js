/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../App';
import logo from '../../publicResources/logoMabis.svg';
import './CssHeader.css'
import "../cartPage/ShoppingCart"
import { ShoppingCart } from '../cartPage/ShoppingCart';

export function Header() {

  const { auth, logOut } = useContext(AuthContext)

  const activeClass = ({isActive}) => isActive ? "activeClassNav" : {};

  const activeClassHamburger = ({isActiveHamburger}) => isActiveHamburger ? "activeClassHamburger" : "link";

  return (
    <section className='flex'>
      <div className='logo'>
        <img src={logo} alt="logo"/>
      </div>


    <div className='desktopAnchors'>
      <div className='nav_anchors '>
        <NavLink className={activeClass} to='/'>Home</NavLink>
        <NavLink className={activeClass} to='/e'>About</NavLink>
        <NavLink className={activeClass} to='/c'>Reviews</NavLink>
        <NavLink className={activeClass} to='/contact'>Contact</NavLink>
        </div>
    </div>

    <div className='desktopCart'>
      <ShoppingCart></ShoppingCart>
    </div>

      <div className='headerLogin'>
        <p>Hi, {auth?.user?.username}</p>
        <button className='logoutButtonHeader' onClick={logOut}>Log Out</button>
      </div>

    <div className='hamburger'>
        <input type="checkbox" id="navi-toggle" className="checkbox" />
        <label htmlFor="navi-toggle" class="button">
          <span className="icon">&nbsp;</span>
        </label>
      <div className="background">&nbsp;</div>


      <nav className="nav">
        <ul className="list">
          <p className="loginListP">Hi, {auth?.user?.username}</p>
          <li className="item"> <NavLink className={activeClassHamburger} to='/'>Home</NavLink> </li>
          <li className="item"> <NavLink className={activeClassHamburger} to='/cart'>About</NavLink> </li>
          <li className="item"> <NavLink className={activeClassHamburger} to='/b'>Products</NavLink> </li>
          <li className="item"> <NavLink className={activeClassHamburger} to='/c'>Reviews</NavLink> </li>
          <li className="item"> <NavLink className={activeClassHamburger} to='/d'>Contact</NavLink> </li>
          <li className="item mobileCart"> <NavLink className={activeClassHamburger} to='/cart'> <ShoppingCart /> </NavLink> </li>
          <button className='logoutButtonHeader' onClick={logOut}>Log Out</button>
        </ul>
      </nav>
</div>  

  </section>
  );
}
