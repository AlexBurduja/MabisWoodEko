/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import "./ShoppingCartPage.css"

export function ShoppingCartPage() {

  const [cart, setCart] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/cart')
      .then((response) => response.json())
      .then((cartFromServer) => setCart(cartFromServer));
  }, []);


  return (
    <section>
      <h1>Your cart</h1>
        <div className='tableHeader'>
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
        </div>
      {cart.map((item) => {
      return (
        <section>
          <div className='cartItems'>
            <div>
            <img src={item.productImage} width='200px' alt="Product image should've been here, if not, write us an email!" />
            </div>

            <p>{item.productTitle}</p>
            <p>{item.productPrice}</p>
            <p></p>
          </div>
      </section>
      )
      })}
    </section>
  );
}
