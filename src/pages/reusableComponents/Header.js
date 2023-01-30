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
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useContext } from 'react';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import { ShoppingCartMobile } from '../cartPage/ShoppingCartMobile';

export function Header() {

  // const [user , setUser] = useState({})
  const [conditional , setConditional ] = useState([])
  const [ data , setData ] = useState({})
  
  const { user } = useContext(FirebaseAuthContext)


  const logOut = async () => {
    await signOut(auth)

    window.location.reload()
  }
 

useEffect(() => {

  if (user?.uid){
  
    const getDocument = async () => {
      const ref = doc(db, 'users', user.uid)
      
      let document = await getDoc(ref)
      
      return document.data()
      
    }
    getDocument()
    .then(data => setConditional(data))
  }
  
}, [user?.uid])

            
          

  function LogInOrOut() {
    if (user?.uid){
      return (
        <div className='headerLogin'>     
      <div className='headerLoginIcons'>
        <NavLink to="/profile"> <CgProfile /> </NavLink>
        </div>

        <div className='headerLoginText'>
        <p>Hi, {conditional.firstName}</p> 
        <button className='logoutButtonHeader' onClick={logOut} >Log Out </button>
      </div>

        </div>
      )
    } else {
      return (
        <button className='loginButtonHeader'><NavLink to="/login">Log in</NavLink></button>
      )
    }
  }

  function LogInOrOutMobile(){
    if(user?.uid){
      return(
        <button className='logoutButtonHamburger' onClick={logOut}>Log Out</button>
      ) 
    } else {
      return(
        <button className='logoutButtonHamburger'><NavLink to="/login"> Log in </NavLink></button>
      )
      }
    }


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
        {conditional.admin === true && (
          <NavLink className={activeClass} to='/panel'>Panel</NavLink>
        )}
        
        </div>
    </div>

    <div className='desktopCart'> 
      <ShoppingCart/>
    </div>

      <LogInOrOut />
          

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
          
          {conditional.admin === true && (
            <li className='item'><NavLink className={activeClassHamburger} to='/users'>Panel</NavLink> </li>
          )}
          
          {user?.uid && (
            <li className='item'> <NavLink className={activeClassHamburger} to='/profile'>{conditional.firstName}'s Profile</NavLink> </li>
          )}
          <LogInOrOutMobile/>
        </ul>
      </nav>
</div>  

      <div className='mobileCart'>
        <ShoppingCartMobile/>  
      </div>

  </section>
  );
}
