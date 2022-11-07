import logo from './resources/logoMabis.svg';
import './CssHeader.css'

export function Header() {
  return (
    <section className='flex'>
      <div className='logo'>
        <img src={logo} alt="logo"/>
      </div>

      <div className='nav_anchors '>
        <a href='#'>Home</a>
        <a href='#'>About Us</a>
        <a href='#'>Our Products</a>
        <a href='#'>Clients Review</a>
        <a href='#'>Contact Us</a>
      </div>
    </section>
  );
}
