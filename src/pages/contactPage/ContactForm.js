import "./ContactForm.css"
import { IoIosCall } from 'react-icons/io'
import { FiMail } from 'react-icons/fi'
import { BsPinMapFill } from 'react-icons/bs'
import { BsFacebook } from "react-icons/bs"
import { BsInstagram } from "react-icons/bs"
import { FaTiktok } from "react-icons/fa"
import { BsWhatsapp } from "react-icons/bs"
import emailjs from 'emailjs-com'
import { useContext, useEffect, useState } from "react"
import { FirebaseAuthContext } from "../../FirebaseAuthContext"

export function ContactForm() {
  
  const { user, conditional } = useContext( FirebaseAuthContext )

  const [fullName, setFullName] = useState(``)

  useEffect(() => {
      setFullName(`${conditional.firstName} ${conditional.lastName}`)
  }, [conditional])

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_eyuz8pg', 'template_1fljmwu', e.target, 'crU6K8bQnftB81z-j')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  const phoneNumber = '+40721648424';
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  
  return (
    <section id="contact" className="contactFormWrapper">
      <div className="leftSide">
        <div className="leftSide_header">
        <h1>{localStorage.getItem('language') === 'FR' ? 'Contactez-nous' : 
      localStorage.getItem('language') === 'RO' ? 'Contactați-ne' :
      localStorage.getItem('language') === 'DE' ? 'Kontakt aufnehmen' :
      localStorage.getItem('language') === 'IT' ? 'Contattaci' :
      'Get in touch'}
</h1>
<p>
  {localStorage.getItem('language') === 'FR' ? 'Remplissez le formulaire et notre équipe vous répondra dans les 24 heures' : 
   localStorage.getItem('language') === 'RO' ? 'Completați formularul și echipa noastră vă va răspunde în decurs de 24 de ore' :
   localStorage.getItem('language') === 'DE' ? 'Füllen Sie das Formular aus und unser Team wird sich innerhalb von 24 Stunden bei Ihnen melden' :
   localStorage.getItem('language') === 'IT' ? 'Compila il modulo e il nostro team ti risponderà entro 24 ore' :
   'Fill up the form and our team will get back to you within 24 hours'}
</p>
        </div>

        <div className="leftSide_footer">
          <p><span> <IoIosCall /> </span> <a href="tel:+40721648424">+40721648424</a> </p>
          <p><span><BsWhatsapp /> </span> <a href={whatsappLink}>+40721648424</a> </p>
          <p><span> <FiMail /> </span> <a href="mailto:dan@mabiswood.ro">dan@mabiswood.ro</a> </p>
          <p><span> <BsPinMapFill /> </span> Sat. Bogati, Comuna. Bogati, Strada. Alunis, Nr. 190B, Judetul. Arges</p>
        </div>

          <div className="leftSide_footer_icons">
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

      </div>

      <div className="rightSide">
        <h1>{localStorage.getItem('language') === 'FR' ? 'Contactez-nous' :
            localStorage.getItem('language') === 'RO' ? 'Contactați-ne' :
            localStorage.getItem('language') === 'DE' ? 'Kontakt aufnehmen' :
            localStorage.getItem('language') === 'IT' ? 'Contattaci' :
            'Contact Us'}
        </h1>
        <form onSubmit={sendEmail}>
        
        <div className='rightSide_inputs__input' >
          <input type="text" required="required" name="subject" autoComplete="off" ></input>
          <span>{localStorage.getItem('language') === 'FR' ? 'Sujet' :
                localStorage.getItem('language') === 'RO' ? 'Subiect' :
                localStorage.getItem('language') === 'DE' ? 'Betreff' :
                localStorage.getItem('language') === 'IT' ? 'Oggetto' :
                'Subject'}
          </span>
        </div>
          
        <div className='rightSide_inputs__input' >
          <input name="name" type="text" required="required" defaultValue={user?.uid ? fullName : ''}></input>
          <span>{localStorage.getItem('language') === 'FR' ? 'Nom complet' :
                localStorage.getItem('language') === 'RO' ? 'Nume complet' :
                localStorage.getItem('language') === 'DE' ? 'Name' :
                localStorage.getItem('language') === 'IT' ? 'Nome completo' :
                'Full Name'}
          </span>
        </div>

        <div className='rightSide_inputs__input' >
          <input name="email" type="text" required="required" defaultValue={user?.uid ? user.email : ""}></input>
          <span>Email</span>
        </div>

        <div className='rightSide_inputs__input' >
          <input name="message" type="text" required="required" autoComplete="off"></input>
          <span>{localStorage.getItem('language') === 'FR' ? 'Message' :
                localStorage.getItem('language') === 'RO' ? 'Mesaj' :
                localStorage.getItem('language') === 'DE' ? 'Nachricht' :
                localStorage.getItem('language') === 'IT' ? 'Messaggio' :
                'Message'}
          </span>
        </div>
        
          <button type="submit"> {localStorage.getItem('language') === 'FR' ? 'Envoyer le message' :
                                  localStorage.getItem('language') === 'RO' ? 'Trimite mesajul' :
                                  localStorage.getItem('language') === 'DE' ? 'Nachricht senden' :
                                  localStorage.getItem('language') === 'IT' ? 'Invia messaggio' :
                                  'Send Message'} 
          </button>

        </form>
      </div>
    </section>
  );
}
