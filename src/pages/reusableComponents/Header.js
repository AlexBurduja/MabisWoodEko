/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useContext } from 'react';
import { CgProfile } from 'react-icons/cg'
import { NavLink } from 'react-router-dom';
// import { AuthContext } from '../../App';
import logo from '../../publicResources/logoMabis.svg';
import './CssHeader.css'
import "../cartPage/ShoppingCart"
import { ShoppingCart } from '../cartPage/ShoppingCart';
import { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';

export function Header() {

  const [user , setUser] = useState({})
  const [conditional , setConditional ] = useState(false)
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    }
  })

  const getDocument = async () => {

    const ref = doc(db, 'users', user.uid)
    let document = await getDoc(ref)

    return document.data().admin
  }

  getDocument()
  .then(data => {
    setConditional(data)
  })


  const activeClass = ({isActive}) => isActive ? "activeClassNav" : {};

  const activeClassHamburger = ({isActiveHamburger}) => isActiveHamburger ? "activeClassHamburger" : "link";


  console.log(auth.currentUser)

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
        {conditional === true && (
          <NavLink className={activeClass} to='/users'>Panel</NavLink>
        )}
        
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
          <p>Hi, </p> 
          
          <button className='logoutButtonHeader' >Log Out </button>
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
          {conditional && (
            <li className='item'><NavLink className={activeClassHamburger} to='/users'>Panel</NavLink> </li>
          )}
          
          <li className='item'> <NavLink className={activeClassHamburger} to='/profile'>'s Profile</NavLink> </li>
          <li className="item mobileCart"> <ShoppingCart/> </li>
          <button className='logoutButtonHamburger' >Log Out</button>
        </ul>
      </nav>
</div>  

  </section>
  );
}
