/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useEffect, useState } from 'react';
import "./ShoppingCartPage.css"
import { AiOutlineShopping } from 'react-icons/ai'
import { FaCcVisa, FaCcPaypal, FaCcApplePay, FaCcAmazonPay, FaCcAmex } from 'react-icons/fa'
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import { collection, deleteDoc, doc,getDoc,getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { RiShoppingCartLine } from 'react-icons/ri';
import { HashLink } from 'react-router-hash-link';
import { loadStripe } from '@stripe/stripe-js';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import emailjs from "emailjs-com"
import LoadingSpinner from './LoadingSpinner';

export function ShoppingCartPage() {
  const { user } = useContext( FirebaseAuthContext )
  
  const [ cart, setCart ] = useState([])
  const [ country, setCountry ] = useState("")
  const [ pickUp, setPickUp] = useState(false)
  const [deliverySelected, setDeliverySelected] = useState("card")
  const [ region, setRegion ] = useState("Select region")
  const [ disabled, setDisable ] = useState("disable")
  const [ conditional, setConditional] = useState("")
  const [loading, setLoading ] = useState(false)


  const [email ,setEmail] = useState('')



  const handleDeliveryChange = (e) =>{
    setDeliverySelected(e.target.value)
    
    if(e.target.value === "pickUp"){
      setPickUp(true)
    }else {
      setPickUp(false);
    }
  }

  const handleRegionChange = (e) => {
    setRegion(e)

    if(region.length === (!"Select Region") || "-"){
      setDisable("")
    } else {
      setDisable("disable")
    }
  }

  console.log(region)

  
  function quantityUp(item){
    if(user?.uid){

      const userDoc = doc(db, `users/${user?.uid}/cart/${item.title+item.kg}`) 
      
      const newFields = {
        quantity : item.quantity + 1,
      }
      
      updateDoc(userDoc , newFields)
    }

    if(!user?.uid){
      const clientId = sessionStorage.getItem("clientId")
      const userDoc= doc(db, `guestCarts/${clientId}/cart/${item.title+item.kg}`)

      const newFields = {
        quantity : item.quantity + 1
      }

      updateDoc(userDoc, newFields)
    }

    setInterval(() => {
      window.location.reload()
    }, 500)

  }


  
  function quantityDown(item){
    if(user?.uid){

      const userDoc = doc(db, `users/${user?.uid}/cart/${item.title+item.kg}`) 
      
      const newFields = {
        quantity : item.quantity - 1,
      }
      
      updateDoc(userDoc , newFields)

      if(item.quantity === 1){
  
        deleteDoc(userDoc)
        console.log(`Item is deleted!` )
      }
    }

    if(!user?.uid){
      const clientId = sessionStorage.getItem("clientId")
      const userDoc= doc(db, `guestCarts/${clientId}/cart/${item.title+item.kg}`)

      const newFields = {
        quantity : item.quantity - 1
      }

      updateDoc(userDoc, newFields)

      if(item.quantity === 1){
  
        deleteDoc(userDoc)
        console.log(`Item is deleted!` )
      }
    }

    setInterval(() => {
      window.location.reload()
    }, 500)
  }
  
  useEffect(() => {

    const getCart = async () =>{
      if(user?.uid){

        setLoading(true)

        const cartDoc = `users/${user.uid}/cart`
        const ref = collection(db, cartDoc)
        
        let data = await getDocs(ref)
        
        setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))

      };    
      setLoading(false)
    }
    getCart()
    
    if(user?.uid){
      const getDocument = async () => {
        const ref = doc(db, 'users', user.uid)
        
        let document = await getDoc(ref)
        
        return document.data()
        
      }
      getDocument()
      .then(data => setConditional(data))
    }

      if(!user?.uid){
        const clientId = sessionStorage.getItem("clientId")
    
        const getCart = async () => {
          const cartDoc = `guestCarts/${clientId}/cart`
          const ref = collection(db, cartDoc)
    
          let data = await getDocs(ref)
    
          setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        };
    
        getCart()
      }
    }, [user]) 

    console.log(loading)

      function ProductCount () {
        if (totalQuantity === 1){
          return <p>{totalQuantity} product</p>
        } else {
          return <p>{totalQuantity} products</p>
        }
      }

      const totalQuantity = cart.reduce((acc,cur) => {
        return acc+ cur.quantity
      }, 0)
      const totalPrice = cart.reduce((acc,cur) => {
        return acc + cur.quantity * cur.price
      }, 0)


        
      let stripePromise;

      const getStripe = () => {
        if(!stripePromise){
          stripePromise = loadStripe("pk_test_51MQo3GLhCgTZCrVVShrOGDphb9M7MGq9YTOCW90JE5cVtrYsExpY49wClOSYqEn4Ezv9tGcuKIFtbBpSCIF1iDPT00wEyjkOIV")
        }
        return stripePromise
      }


        
      const stripeIds = cart.map(item => item.stripeId)
      const itemQuantity = cart.map(item => item.quantity)

      const items = []
      for(let i= 0; i < cart.length; i++){
        items.push({
          price : stripeIds[i],
          quantity : itemQuantity[i]
        })
      }

      const checkoutOptions = {
        lineItems: items,
        mode: "payment",
        successUrl: `${window.location.origin}/succes`,
        cancelUrl: `${window.location.origin}/cancel`,
      }

      const redirectToCheckout = async () => {
        console.log("redirectToCheckout")

        const stripe = await getStripe()
        const { error } = await stripe.redirectToCheckout(checkoutOptions)
        console.log("Stripe checkout error", error)
      }

      function ShoppingCartPage() {
        
          return(
            <div className='emptyCartTextWrapper'>
            <div className='emptyCartText'>
              <div>
            <h1>Your Cart is Empty </h1>
              </div>

              <div>
            <p> <RiShoppingCartLine /> </p>
              </div>

            </div>

            <div>
              <HashLink className='cartBackToProduct' to="/#product" replace="true">Back to products</HashLink>
            </div>

            </div>
          )
      }



      function stripeIdss(){
        return cart.map(cart => `${cart.title} ${cart.kg}Kg (Cantitate : ${cart.quantity})
        `)
        // let itemes = []
        // for(const items of stripeIds){
        //   items.push(itemes)
        // }
        // return itemes
      }

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
{loading && (
  <LoadingSpinner />
)}

{cart.map((item) => {
  return(
  <section key={item.id} className='cartProductShowFlex'>
        <div>
          <img src={item.image} width="150vw" alt="product image"></img>
        </div>

      <div className='row'>
        <div className='column'>
          <p className='columnProductTitle'>{item.title}</p>
          <p>{item.kg} Kg</p>
        </div>

        <div className='column'>
          <p>Each</p>
          {item.price} {item.currency}
        </div>

        <div className='column'>
          <p>Quantity</p>
          <button onClick={() => quantityDown(item)}>-</button>
          {item.quantity}
          <button onClick={() => quantityUp(item)}>+</button>
        </div>

        <div className='column'>
          <p>Total</p>
          {item.quantity * item.price} {item.currency}
        </div>

      </div>
    </section>
  )
    })}

<div className='productCartFooter'>
<button className="emptyCartButton" >Empty Cart</button>
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
    <input type="text" required="required" defaultValue={user?.uid ? user.email : ''}></input>
    <span>Email Address</span>
  </div>

  <div className='deliveryAddress_inputs__input input2' >
    <div>
      <input type="text" defaultValue={user?.uid ? conditional.firstName : ''} required="required" ></input>
      <span>First name</span>
    </div>

    <div className='lastNameInput'>
      <input type="text" defaultValue={user?.uid ? conditional.lastName : ''} required="required" ></input>
      <span>Last name</span>
    </div>
  </div>
  
  <div className='deliveryAddress_inputs__input company'>
    <input type="text" required></input>
    <span>Company (optional)</span>
  </div>

  <div className='deliveryAddress_inputs__input' >
    <input type="text" defaultValue={user?.uid ? conditional.phoneNumber : ''} required="required"></input>
    <span>Telephone</span>
  </div>
  
  <div className='deliveryAddress_inputs__input' >
    <input type="text" defaultValue={user?.uid ? conditional.address : ''} required="required"></input>
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
    {cart.map((item) => {
      return (
        <section key={item.id} className='productCheckoutPage'>
            <div className='imageQuantity'>
              <img src={item.image} alt="product image" width="100px"></img>
              <p>{item.quantity}</p>
            </div>
          
            <p className='productCheckoutPage_Title'>{item.title}</p>
            <p>{item.quantity * item.price} {item.currency}</p>
          </section>
          )
        })}
        <div className='productCheckoutPage_footer'>
            <h1>Total</h1>
          <div className='totalQuantityPrice'>
            <p>Products: <span>{totalQuantity}</span></p>
            <p>Sub-total: <span>{totalPrice}</span> RON</p>
          </div>

          <div className='deliveryOptions'>
            <CountryDropdown value={country}

            onChange={(e) => setCountry(e)}

            />
            <RegionDropdown country={country}
            value = {region}
            onChange={handleRegionChange}/>
            <label htmlFor="delivery">Pay Method: </label>
            
            {country === "Romania" && (
            <select disabled={disabled} id='delivery' onChange={handleDeliveryChange} value={deliverySelected}>
              <option value="card">Credit Card</option>
              <option value="ramburs">Ramburs (cash on delivery)</option>
              <option value="pickUp">Pick up from one of our stores.</option>
            </select>
            )}

            {!(country === "Romania") && (
              <select disabled={disabled} id='delivery'>
              <option value="card">Credit Card</option>
            </select>
            )}

            {pickUp && (
              <select id='blabla'>
              <option value="bucuresti">Bucuresti</option>
              <option value="arges">Arges</option>
            </select>
            )}

            <div className='deliveryFooter'>
              <p>WE ACCEPT:</p>
              <div className='react-icons'>
              <FaCcApplePay /> <FaCcPaypal /> <FaCcVisa /> <FaCcAmazonPay /> <FaCcAmex />
              </div>
            <button onClick={() => {
              if(deliverySelected === "card"){
                redirectToCheckout()
                console.log("Stripe")
              } else if(deliverySelected === "ramburs" || "pickUp") {
                console.log('mail')

              emailjs.send('service_eyuz8pg' , 'template_xeem2dd', {
                subject: `Order from ${user.email}`,
                message : `O comanda a fost lansata! Aceasta contine : ${stripeIdss()} 
                Pretul total fiind de ${totalPrice} lei` 
              }, 'crU6K8bQnftB81z-j' )
            }}}>Checkout</button>
            </div>
          </div>
        </div>
          </section>    
    </section>
</section>
</section>
</>
  )
}