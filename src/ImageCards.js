import './ImageCards.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { LoremIpsum } from 'react-lorem-ipsum';

export function ImageCards() {
  return(
  <section className='cardsAll'>
    <div className='card card1'>
            <FontAwesomeIcon icon={ faHouse } />
            <p>Home</p>
            <p><LoremIpsum avgWordsPerSentence={0.2} /></p>
    </div>

    <div className='card card2'>
            <FontAwesomeIcon icon={ faUsers } />
            <p>About Us</p>
            <p><LoremIpsum avgWordsPerSentence={0.2} /></p>
    </div>

    <div className='card card3'>
            <FontAwesomeIcon icon={ faThumbsUp } />
            <p>Guarantee</p>
            <p><LoremIpsum avgWordsPerSentence={0.2} /></p>
    </div>

    <div className='card card4'>
            <FontAwesomeIcon icon={ faEnvelope } />
            <p>Get In Touch</p>
            <p><LoremIpsum avgWordsPerSentence={0.2} /></p>
    </div>
  </section>
  )
}
