import "./PreFooter.css"
import { BsInstagram, BsFacebook,  } from 'react-icons/bs'
import { FaTiktok  } from 'react-icons/fa'

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
        <BsFacebook /> 
        </div>

        <div>
        <BsInstagram /> 
        </div>

        <div>
        <FaTiktok />
        </div>
      </div>
    </section>
  );
}
