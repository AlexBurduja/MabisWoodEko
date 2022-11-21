/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import "./ShoppingCartPage.css"

export function ShoppingCartPage() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/cart')
      .then((response) => response.json())
      .then((cartList) => {
        const [ cart ] = cartList

        setProducts(cart.products)
      });
  }, [])


  return (
    <section>
      <h1>Your cart</h1>
        <div className='tableHeader'>
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
        </div>
      {products.map((item) => {
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
