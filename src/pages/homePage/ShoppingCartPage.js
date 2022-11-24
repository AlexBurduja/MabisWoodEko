/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import "./ShoppingCartPage.css"
import { AiOutlineShopping } from 'react-icons/ai'

export function ShoppingCartPage() {

  const [products, setProducts] = useState([])
     

      useEffect(() => {
        fetch('http://localhost:3001/cart')
        .then((response) => response.json())
        .then((cartList) => {
          const [ cart ] = cartList

          setProducts(cart.products)
      })}, [] );

      function ProductCount () {
        if (totalQuantity === 1){
          return <p>{totalQuantity} product</p>
        } else {
          return <p>{totalQuantity} products</p>
        }
      }

      // let productQuantity = products.map(function (product){
      //   return product.productPrice * product.quantity
      // })

      const totalPrice = products.reduce((acc,cur) => {
        return acc + cur.quantity * cur.productPrice
      }, 0)

      const totalQuantity = products.reduce((acc,cur) => {
        return acc+ cur.quantity
      }, 0)


  return (
    <>
    <div className='pageHeader'>
    <h1>Your cart</h1>
    <AiOutlineShopping />
    </div>
    <section className='wrapper'>
      <section className='cartPageLeftSection'>
      <h1>1. REVIEW YOUR ORDER </h1>
      <h3>Please check that you have the right quantity of every single item to avoid confusions at checkout, Thanks!</h3>
      {products.map((item) => {
        return (
          <section className='cartProductShowFlex'>
              <div>
                <img src={item.productImage} width="150vw" alt="product image"></img>
              </div>

            <div className='row'>
              <div className='column'>
                <p>{item.productTitle}</p>
                <p>{item.productKg} Kg</p>
              </div>

              <div className='column'>
                <p>Each</p>
                {item.productPrice} {item.productCurrency}
              </div>

              <div className='column'>
                <p>Quantity</p>
                {item.quantity}
              </div>

              <div className='column'>
                <p>Total</p>
                {item.quantity * item.productPrice} {item.productCurrency}
              </div>

            </div>

            <div className='cartProductShowButtons'>
                <button>Remove</button>
            </div>
          </section>
      )
    })}
      <div className='productCartFooter'>
        <ProductCount />
        <p>Total: {totalPrice} RON</p>
      </div>
    </section>
    <section className='deliveryAddress'>
      <div className='deliveryAddress_wrapper'>
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

      </div>

        <section className='checkoutTab'>
          <div className='checkoutTab_header'>
            <h1>3. CHECKOUT</h1>
            <h3>Order summary</h3>
          </div>

          <section className='doamneAjuta'>
          {products.map((item) => {
            return (
              <section className='productCheckoutPage'>
                  <div className='imageQuantity'>
                    <img src={item.productImage} alt="product image" width="100px"></img>
                    <p>{item.quantity}</p>
                  </div>
                
                  <p className='productCheckoutPage_Title'>{item.productTitle}</p>
                  <p>{item.quantity * item.productPrice} {item.productCurrency}</p>
                </section>
                )
              })}
              <div className='productCheckoutPage_footer'>
                  <h1>Total</h1>
                <div>
                  <p>Products: {totalQuantity}</p>
                  <p>Sub-total: {totalPrice} RON</p>
                </div>

                <div className='deliveryOptions'>
                  <label for="delivery">Delivery </label>
                  <select id='delivery'>
                    <option value="standard">Standard Delivery</option>
                    <option value="premium">Premium Delivery</option>
                  </select>
                </div>
              </div>
                </section>    
          </section>
      </section>

  </section>
</>
  )
  }