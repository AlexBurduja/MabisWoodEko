import React from 'react';
import "./Footer.css"
import { BsFillTelephoneFill, BsFillPinMapFill } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi'
import { HashLink } from 'react-router-hash-link';
import { FaInstagram } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { NavLink } from 'react-router-dom';
import litigiu from '../../publicResources/i_anpc-sal.svg'
import litigiu2 from '../../publicResources/i_anpc-sol.svg'

export function Footer() {
  return (
    <section className='footerSection'>
      <div className='footerSection_flex_row'>
        <div className='footerSection_flex_column_1 footerSection_common'>
          {/* <img src={logo} alt="logo"></img> */}
          <p>Thanks for sticking with us and reaching the end of the page!</p>
        </div>

        <div className='footerSection_flex_column_2 footerSection_common'>
          <HashLink to="/#home">Home</HashLink>
          <p>Home</p>
          <p>Home</p>
          <p>Home</p>
        </div>

        <div className='footerSection_flex_column_3 footerSection_common'>
        <HashLink to="/reviews#">Reviews</HashLink>
          <p>Reviews</p>
          <p>Reviews</p>
          <p>Reviews</p>
        </div>

        <div className='footerSection_flex_column_4 footerSection_common'>
          <HashLink to="/contact#">Contact</HashLink>
          <p>Contact</p>
          <p>Contact</p>
          <p>Contact</p>
        </div>

        <div className='footerSection_flex_column_5 footerSection_common'>
          
          <div className='footerSection_flex_column_5_float_left'>
            <p><BsFillTelephoneFill /> +40721648424</p>
            <p><BsFillPinMapFill /> Sat.Bogati, Comuna. Bogati, Str. Alunis, Nr.190B, Jud. Arges</p>
            <p><FiMail /> office@mabiswood.ro</p>
          </div>

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2846.89607672309!2d26.157477515783366!3d44.476302906832935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f8587b4a01cf%3A0x4e2d19440aa2cbeb!2sMABIS!5e0!3m2!1sro!2sro!4v1672082312133!5m2!1sro!2sro" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title='googleMaps'></iframe>
        </div>
      </div>

      <div className='litigiiDiv'>  
            <div>
              <NavLink to='https://anpc.ro/ce-este-sal/' target='_blank' >
                <img src={litigiu} alt='litigii'/>
              </NavLink>
            </div>

            <div>
              <NavLink to='https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO' target='_blank'>
                <img src={litigiu2} alt='litigii'/>
              </NavLink>
            </div>
      </div>

      <div className='socialMediaDiv'>
        <div className='socialMediaDiv__socials'>
          <div>
            <NavLink to='https://www.instagram.com' target="_blank"> <FaInstagram /> </NavLink>
          </div>
          
          <div>
            <NavLink to='https://www.tiktok.com/' target="_blank"> <FaTiktok /> </NavLink>
          </div>
          
          <div>
            <NavLink to='https://www.facebook.com/mabiswoodeko' target="_blank" > <FaFacebook /> </NavLink>
          </div>
        </div>

        <div className='socialMediaDiv__credits'>
            <div>
            &copy; 2023 MABIS WOOD EKO. Made by <NavLink style={{color: 'rgba(48, 48, 230,1)'}} to="https://www.google.com" target='_blank'>this guy.</NavLink>
            </div>
        </div>
      </div>

    </section>
  );
}
