import { useEffect, useState } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri'

export function ShoppingCart() {

const [products, setProducts] = useState([]);

  ///Fetch Get RestApi
  useEffect(() => {
    fetch('http://localhost:3001/cart')
      .then((response) => response.json())
      .then((cartList) => {
        const [ cart ] = cartList

        setProducts(cart.products)
      });
  }, [])


  return (
   <a href='/cart'>
    <section>
      <RiShoppingCartLine />
      {products.map((item) => {
        return (
          <div>
          <p>{item.quantity}</p>
         </div> 
    );
  })}
  </section>
  </a>
  );
}
