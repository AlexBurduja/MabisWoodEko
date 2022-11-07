import warehousePhoto from './resources/warehouse.jpg';
import './Image.css'

export function Image() {
  return (
    <section className='imageSection'>
      <img src={warehousePhoto} width="100%" />

    <div className='imageButtons'>
      <button>Our Products</button>
      <button>Contact Us</button>
    </div>
    </section>
  );
}
