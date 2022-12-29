/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from 'react';
import { CgProfile } from 'react-icons/cg'
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
    <section id="home" className='flex'>
      <div className='logo'>
        <img src={logo} alt="logo"/>
      </div>


    <div className='desktopAnchors'>
      <div className='nav_anchors '>
        <NavLink className={activeClass} to='/'>Home</NavLink>
        <NavLink className={activeClass} to='/e'>About</NavLink>
        <NavLink className={activeClass} to='/reviews'>Reviews</NavLink>
        <NavLink className={activeClass} to='/contact'>Contact</NavLink>
        </div>
    </div>

    <div className='desktopCart'> 
      <ShoppingCart/>
    </div>

      <div className='headerLogin'>
        <div className='headerLoginIcons'>
        <NavLink to="/profile"> <CgProfile /> </NavLink>
        </div>

        <div className='headerLoginText'>
          <p>Hi, {auth?.user?.username}</p> 
          
          <button className='logoutButtonHeader' onClick={logOut}>Log Out </button>
        </div>
      </div>

    <div className='hamburger'>
        <input type="checkbox" id="navi-toggle" className="checkbox" />
        <label htmlFor="navi-toggle" className="button">
          <span className="icon">&nbsp;</span>
        </label>
      <div className="background">&nbsp;</div>


      <nav className="nav">
        <ul className="list">
          <li className="item"> <NavLink className={activeClassHamburger} to='/'>Home</NavLink> </li>
          <li className="item"> <NavLink className={activeClassHamburger} to='/about'>About</NavLink> </li>
          <li className="item"> <NavLink className={activeClassHamburger} to='/reviews'>Reviews</NavLink> </li>
          <li className="item"> <NavLink className={activeClassHamburger} to='/contact'>Contact</NavLink> </li>
          <li className='item'> <NavLink className={activeClassHamburger} to='/profile'>{auth.user.username}'s Profile</NavLink> </li>
          <li className="item mobileCart"> <ShoppingCart/> </li>
          <button className='logoutButtonHamburger' onClick={logOut}>Log Out</button>
        </ul>
      </nav>
</div>  

  </section>
  );
}
