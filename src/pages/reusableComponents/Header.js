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
import ReactFlagsSelect from 'react-flags-select';

export function Header() {

  const [ data , setData ] = useState({})
  
  const { user, conditional } = useContext(FirebaseAuthContext)

  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  const onSelect = (code) => { 
    setLanguage(code)
    window.location.reload();
  }

  console.log(language)

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const logOut = async () => {
    await signOut(auth)

    window.location.reload()
  }
 
  function LogInOrOut() {
    if (user?.uid){
      return (
        <div className='headerLogin'>
      <div className='headerLoginIcons'>
        <NavLink to="/profile"> <CgProfile /> </NavLink>
        </div>

        <div className='headerLoginText'>
        <p>{localStorage.getItem('language') === "RO" ? 'Salut' : localStorage.getItem('language') === "IT" ? "Ciao" : localStorage.getItem('language') === "DE" ? "Hallo" : "Hi" }, {conditional.firstName}</p> 
        <button className='logoutButtonHeader' onClick={logOut}>{
          localStorage.getItem('language') === "RO" ? 'Delogheaza-te' 
        : localStorage.getItem('language') === "IT" ? "Disconnettersi"
        : localStorage.getItem('language') === "DE" ? 'Ausloggen' 
        : 'Log Out'} </button>
      </div>

        </div>
      )
    } else {
      return (
        <button className='loginButtonHeader'><NavLink to="/login">{localStorage.getItem('language') === "RO" ? 'Conecteaza-te' :
        localStorage.getItem('language') === "IT" ? 'Accedi' :
        localStorage.getItem('language') === "DE" ? 'Anmelden' :
        'Log in'}</NavLink></button>
      )
    }
  }

  function LogInOrOutMobile(){
    if(user?.uid){
      return(
        <button className='logoutButtonHamburger' onClick={logOut}>{
          localStorage.getItem('language') === "RO" ? 'Delogheaza-te' 
        : localStorage.getItem('language') === "IT" ? "Disconnettersi"
        : localStorage.getItem('language') === "DE" ? 'Ausloggen' 
        : 'Log Out'}</button>
      ) 
    } else {
      return(
        <button className='logoutButtonHamburger'><NavLink to="/login"> {localStorage.getItem('language') === "RO" ? 'Conectează-te' :
        localStorage.getItem('language') === "IT" ? 'Accedi' :
        localStorage.getItem('language') === "DE" ? 'Anmelden' :
        'Log in'} </NavLink></button>
      )
      }
    }


  const activeClass = ({isActive}) => isActive ? "activeClassNav" : {};

  const activeClassHamburger = ({isActiveHamburger}) => isActiveHamburger ? "activeClassHamburger" : "link";

  useEffect(() => {
    const checkbox = document.querySelector('#navi-toggle');
    const body = document.querySelector('body');
  
    const handleCheckboxClick = () => {
      if (checkbox.checked) {
        body.classList.add('no-scroll');
      } else {
        body.classList.remove('no-scroll');
      }
    };
  
    const handleNavLinkClick = () => {
      body.classList.remove('no-scroll');
    };
  
    checkbox.addEventListener('click', handleCheckboxClick);
    document.querySelectorAll('.item a').forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });
  
    return () => {
      checkbox.removeEventListener('click', handleCheckboxClick);
      document.querySelectorAll('.item a').forEach(link => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, []);
  

  return (
    <section id="home" className='flex'>
      <div className='logo'>
        <img src={logo} alt="logo"/>
      </div>


    <div className='desktopAnchors'>
      <div className='nav_anchors '>
        <NavLink className={activeClass} to='/'>{
          localStorage.getItem('language') === "RO" ? 'Acasa' :
          localStorage.getItem('language') === "IT" ? 'Home' :
          localStorage.getItem('language') === "DE" ? 'Zuhause' :
          'Home'}
        </NavLink>
        
        <NavLink className={activeClass} to='/about'>{localStorage.getItem('language') === "RO" ? 'Despre' :
          localStorage.getItem('language') === "IT" ? 'Informazioni' :
          localStorage.getItem('language') === "DE" ? 'Über' :
          'About'}
        </NavLink>

        <NavLink className={activeClass} to='/reviews'>
          {localStorage.getItem('language') === "RO" ? 'Recenzii' :
          localStorage.getItem('language') === "IT" ? 'Recensioni' :
          localStorage.getItem('language') === "DE" ? 'Bewertungen' :
          'Reviews'}
        </NavLink>

        <NavLink className={activeClass} to='/contact'>
          {localStorage.getItem('language') === "RO" ? 'Contact' :
          localStorage.getItem('language') === "IT" ? 'Contatto' :
          localStorage.getItem('language') === "DE" ? 'Kontakt' :
          'Contact'}
        </NavLink>

        {conditional.admin === true && (
          <NavLink className={activeClass} to='/panel'>
            {localStorage.getItem('language') === "RO" ? 'Panou' :
            localStorage.getItem('language') === "IT" ? 'Pannello' :
            localStorage.getItem('language') === "DE" ? 'Panel' :
            'Panel'}
          </NavLink>
        )}        
        </div>
    </div>

    <div className='desktopCart'> 
      <ShoppingCart/>
    </div>
      
      <LogInOrOut />

    <div className='mobileCart'>
        <ShoppingCartMobile/>  
      </div>

      <ReactFlagsSelect
                  selected={language}
                  onSelect={onSelect}
                  countries={["RO", "GB", "IT", "DE"]}
                  fullWidth={true}
                  showOptionLabel={false}
                  showSelectedLabel={false}
                  showSecondaryOptionLabel={false}
                  className='custom-flags-select'
                  customLabels={{ RO: "Romanian", GB: 'English'}}
      />          

    <div className='hamburger'>
        <input type="checkbox" id="navi-toggle" className="checkbox" />
        <label htmlFor="navi-toggle" className="button">
          <span className="icon">&nbsp;</span>
        </label>
      <div className="background">&nbsp;</div>

      <nav className="nav">
        <ul className="list">

          <li className="item"> <NavLink className={activeClassHamburger} to='/'>{
          localStorage.getItem('language') === "RO" ? 'Acasa' :
          localStorage.getItem('language') === "IT" ? 'Home' :
          localStorage.getItem('language') === "DE" ? 'Zuhause' :
          'Home'}</NavLink> </li>

          <li className="item"> <NavLink className={activeClassHamburger} to='/about'>{localStorage.getItem('language') === "RO" ? 'Despre' :
          localStorage.getItem('language') === "IT" ? 'Informazioni' :
          localStorage.getItem('language') === "DE" ? 'Über' :
          'About'}</NavLink> </li>

          <li className="item"> <NavLink className={activeClassHamburger} to='/reviews'>{localStorage.getItem('language') === "RO" ? 'Recenzii' :
          localStorage.getItem('language') === "IT" ? 'Recensioni' :
          localStorage.getItem('language') === "DE" ? 'Bewertungen' :
          'Reviews'}</NavLink> </li>

          <li className="item"> <NavLink className={activeClassHamburger} to='/contact'>{localStorage.getItem('language') === "RO" ? 'Contact' :
          localStorage.getItem('language') === "IT" ? 'Contatto' :
          localStorage.getItem('language') === "DE" ? 'Kontakt' :
          'Contact'}</NavLink> </li>
          
          {conditional.admin === true && (
            <li className='item'><NavLink className={activeClassHamburger} to='/users'>{localStorage.getItem('language') === "RO" ? 'Panou' :
            localStorage.getItem('language') === "IT" ? 'Pannello' :
            localStorage.getItem('language') === "DE" ? 'Panel' :
            'Panel'}</NavLink> </li>
            )}

          {user?.uid && (
            <li className='item'> <NavLink className={activeClassHamburger} to='/profile'>
              {localStorage.getItem('language') === "RO" ? `Profilul lui ${conditional.firstName}` :
              localStorage.getItem('language') === "IT" ? `Profilo di ${conditional.firstName}` :
              localStorage.getItem('language') === "DE" ? `${conditional.firstName}'s Profil` :
              `${conditional.firstName}'s Profile`}
              </NavLink> </li>
          )}
     
          <LogInOrOutMobile/>
        </ul>
      </nav>
</div>  
      
  </section>
  );
}
