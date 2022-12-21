import { NavLink } from "react-router-dom";
import warehousePhoto from "../../publicResources/warehouse.jpg"
import './Image.css'

export function Image() {
  return (
    <section className='imageSection'>
      <div>
      <img src={warehousePhoto} alt="backgroundPhoto" />
      </div>

    <div className='imageInfo'>
      <p>Mabis <span className='woodColor'>Wood</span><span className='ekoColor'> Eko</span>,</p>
      <p>The best pelets in town.</p>
    </div>

    <div className='imageButtons'>
      <button>About us</button>
      <button><NavLink to="/contact"> Contact Us </NavLink></button>
    </div>
    </section>
  );
}
