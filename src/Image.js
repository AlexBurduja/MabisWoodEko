import warehousePhoto from './resources/warehouse.jpg';
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
      <button>Our Products</button>
      <button>Contact Us</button>
    </div>
    </section>
  );
}
