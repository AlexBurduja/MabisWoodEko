/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import "./ShoppingCartPage.css"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export function ShoppingCartPage() {

  const [products, setProducts] = useState([])
     

      useEffect(() => {
        fetch('http://localhost:3001/cart')
        .then((response) => response.json())
        .then((cartList) => {
          const [ cart ] = cartList

          setProducts(cart.products)
      })}, [] );

      let productQuantity = products.map(function (product){
        return product.productPrice * product.quantity
      })

      
      console.log(productQuantity)


  return (
    <section className='wrapper'>
      <section className='cartPageLeftSection'>
      <h1>1. REVIEW YOUR ORDER </h1>
      <h3>Please check that you have the right quantity of every single item to avoid confusions at checkout, Thanks!</h3>

      {products.map((item) => {
        return (
          <>
            <table className='desktopTable'>
              <tr className='firstRow'>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Kilograms</th>
                <th>Total Price of {item.quantity} "{item.productTitle}"</th>
              </tr>

              <tr className='hover'>
                <td>
              <img src={item.productImage} className="tableImg" width="100px" alt="Product image should've been here, if not, write us an email!" />
                </td>
                <td>
              {item.productTitle}
                </td>
                <td>
              {item.quantity}
                </td>
                <td>
              {item.productPrice} {item.productCurrency}
                </td>
                <td>
              {item.productKg}
                </td>
                <td>
              {item.productPrice * item.quantity} {item.productCurrency}
                </td>
              </tr>
        </table>

            <table className='mobileTable'>
              <tr>
                <th>Image</th>
                  <td>
                    <img src={item.productImage} className="mobileTableImg" alt="Product image should've been here, if not, write us an email!" />
                  </td>
              </tr>
              <tr>
                <th>Product</th>
                  <td>
                    {item.productTitle}
                  </td>
              </tr>
              <tr>
                <th>Quantity</th>
                  <td>
                    {item.quantity}
                  </td>
              </tr>
              <tr>
                <th>Price</th>
                  <td>
                    {item.productPrice} {item.productCurrency}
                  </td>
              </tr>
              <tr>
                <th>Kilograms</th>
                  <td>
                    {item.productKg}
                  </td>
              </tr>
              <tr>
                <th>Total Price of {item.quantity} "{item.productTitle}"
                </th>
                  <td>
                    {item.productPrice * item.quantity} {item.productCurrency}
                  </td>
              </tr>
            </table>
            </>
      )
    })}
    </section>
    <section className='deliveryAddress'>
    <div className='deliveryAddress_header'>
        <h1>2. DELIVERY ADDRESS</h1>
        <h3>Please check that all the informations are valid and correct, Thanks!</h3>
        <h5>All fields required.</h5>
      </div>

      <div className="deliveryAddress_inputs">
        <div className='deliveryAddress_inputs__input' >
          <input type="text" required="required" ></input>
          <span>Email Address</span>
        </div>

        <div className='deliveryAddress_inputs__input input2' >
          <div>
            <input type="text" required="required"></input>
            <span>First name</span>
          </div>

          <div className='lastNameInput'>
            <input type="text" required="required"></input>
            <span>Last name</span>
          </div>
        </div>
        
        <div className='deliveryAddress_inputs__input company'>
          <input type="text" required></input>
          <span>Company (optional)</span>
        </div>

        <div className='deliveryAddress_inputs__input' >
          <input type="text" required="required"></input>
          <span>Telephone</span>
        </div>
        
        <div className='deliveryAddress_inputs__input' >
          <input type="text" required="required"></input>
          <span>Delivery Address</span>
        </div>


        <div className='deliveryAddress_inputs__input towninput' >

          <div className='lastNameInput'>
            <input type="text" required="required"></input>
            <span>Town</span>
          </div>

          <div className='lastNameInput'>
            <input type="text" required="required"></input>
            <span>Country</span>
          </div>

          <div className='lastNameInput'>
            <input type="text" required="required"></input>
            <span>Zip Code</span>
          </div>

        </div>

      </div>

        <section className='checkoutTab'>
          <div className='checkoutTab_header'>
            <h1>3. CHECKOUT</h1>
            <h3>Final process!</h3>
          </div>

          {products.map((item) => {
              return (
                <>
                  <img src={item.productImage} width="50px"></img>
                  <p>{item.productTitle}</p>
                  <p>{item.quantity}</p>
                  <p>{item.quantity * item.productPrice}</p>
                </>
              )
          })}
        </section>

    </section>

    </section>
  )
  }