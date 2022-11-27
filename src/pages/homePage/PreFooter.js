import "./PreFooter.css"
import { BsInstagram, BsFacebook,  } from 'react-icons/bs'
import { FaTiktok  } from 'react-icons/fa'
import { NavLink } from "react-router-dom";

export function PreFooter() {
  return (
    <section className="preFooterWrapper">
      <div className="preFooter_title">
        <p>Keep up with our work!</p>
      </div>

      <div className="preFooter_newsletter">
        <label for="newsletter">Sign up to our newsletter</label>
        <input type="email" id="newsletter"></input>
        <button>Submit</button>
      </div>

      <div className="preFooter_icons">
        <div>
        <a href="https://www.facebook.com" rel="noreferrer" target="_blank"><BsFacebook /></a> 
        </div>

        <div>
        <a href="https://www.instagram.com" rel="noreferrer" target="_blank"><BsInstagram /></a> 
        </div>

        <div>
        <a href="https://www.tiktok.com" rel="noreferrer" target="_blank"><FaTiktok /></a>
        </div>
      </div>
    </section>
  );
}
