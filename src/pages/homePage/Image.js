import { NavLink } from "react-router-dom";
import warehousePhotoBig from "../../publicResources/warehousePngBig.webp"
import warehousePhotoMedium from "../../publicResources/warehousePngMedium.webp"
import warehousePhotoSmall from "../../publicResources/warehousePngSmall.webp"
import './Image.css'

export function Image() {


  return (
    <section className='imageSection'>
        <div>
        <img 
        src={warehousePhotoBig}
        srcSet={ `${warehousePhotoSmall} 500w , ${warehousePhotoMedium} 900w ,${warehousePhotoBig} 1280w` }
        sizes={"(max-width:500px) 500px,(max-width:900) 900px, 1280px"}
        alt="backgroundPhoto"/>
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
