import "./PreFooter.css"
import { BsInstagram, BsFacebook,  } from 'react-icons/bs'
import { FaTiktok  } from 'react-icons/fa'

export function PreFooter() {
  return (
    <section className="preFSection">
      <div className="preFSection_div">    

        <div className="preFSection_div-email">
          <label for="email">Sign up to the newsletter!</label>
          <div>
            <input id="email" type="email"></input>
            <button type="submit">Sign me in!</button>
          </div>  
        </div>

        <div className="preFSection_div-icons">
          <a href="#"><BsInstagram  className="preFIcon"/></a>
          <a href="#"><BsFacebook className="preFIcon" /></a>
          <a href="#"><FaTiktok className="preFIcon" /></a>
        </div>

      </div>
    </section>
  );
}
