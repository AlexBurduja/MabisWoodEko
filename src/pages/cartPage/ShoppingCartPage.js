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
import { toast, ToastContainer } from 'react-toastify';

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

/// Input useStates

  const [email ,setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [street, setStreet] = useState('')
  const [streetNo, setStreetNo] = useState('')
  const [block, setBlock] = useState('')
  const [apartamentNo, setApartamentNo] = useState('')
  const [isCompanyChecked, setIsCompanyChecked] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [companyCui, setCompanyCui] = useState('')


  //UseState for checks

  const [notifyLastNameNumbers, setNotifyLastNameNumbers] = useState(false);
  const [notifyLastNameSpecialChar, setNotifyLastNameChar] = useState(false);
  const [notifyLastNameUppercase, setNotifyLastNameUppercase] = useState(false)
  const [notifyLastNameEmpty, setNotifyLastNameEmpty] = useState(false)

  const [notifyFirstNameNumbers, setNotifyFirstNameNumbers] = useState(false)
  const [notifyFirstNameSpecialChar, setNotifyFirstNameSpecialChar] = useState(false)
  const [notifyFirstNameUppercase, setNotifyFirstNameUppercase] = useState(false)
  const [notifyFirstNameEmpty, setNotifyFirstNameEmpty] = useState(false)

  const [notifyPhoneDigits , setNotifyPhoneDigits] = useState(false)
  const [notifyLetterPhone, setNotifyLetterPhone] = useState(false)
  const [notifySpecialCharPhone, setNotifySpecialCharPhone] = useState(false)
  const [notifyPhoneNumberEmpty, setNotifyPhoneNumberEmpty] = useState(false)

  const [emailValidState, setEmailValidState] = useState(false)

  const [ notifyStreetNumbers , setNotifyStreetNumbers] = useState(false)
  const [ notifyStreetSpecialChar, setNotifyStreetSpecialChar] = useState(false)
  const [ notifyStreetEmpty, setNotifyStreetEmpty] = useState(false)

  const [notifyLetterBlock , setNotifyLetterBlock] = useState(false)
  const [notifySpecialCharBlock, setNotifySpecialBlock] = useState(false)
  const [notifyBlockEmpty, setNotifyBlockEmpty] = useState(false)

  const [notifyLetterApartament, setNotifyLetterApartament] = useState(false)
  const [notifySpecialCharApartament, setNotifySpecialApartament] = useState(false)
  const [notifyApartamentNoEmpty, setNotifyApartamentNoEmpty] = useState(false)

  const [notifySpecialCharStreetNo, setNotifySpecialStreetNo] = useState(false)
  const [notifyLetterStreetNo, setNotifyLetterStreetNo] = useState(false)
  const [notifyStreetNoEmpty, setNotifyStreetNoEmpty] = useState(false)


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

        const emailValid = validateEmail(email)
        const firstNameValid = validateFirstName(firstName)
        const lastNameValid = validateLastName(lastName)
        const phoneValid = validatePhoneNumber(phoneNumber)
        const streetValid = validateStreet(street)
        const streetNoValid = validateStreetNo(streetNo)
        const blockValid = validateBlock(block)
        const apartamentNoValid = validateApartamentNo(apartamentNo)
  
      
        function validateEmail(registerEmail) {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

          return emailRegex.test(registerEmail);
        }
      
        function handleBlurEmail() {
          if (emailValidState) {
            toast.error("Email is not valid!" , {
              autoClose: 6000
            })
          }
        }
      
        function HandleBlurFirstName(firstName) {
          if(firstName === ""){
            setNotifyFirstNameEmpty(true)
            toast.error("First name can't be empty!", {
              autoClose: 6000
            })
            return false;
          }
          else {
            setNotifyFirstNameEmpty(false);
            return true
          }
        }

        function handleBlurLastName(){
          if(notifyLastNameEmpty){
            toast.error("Last name can't be empty!", {
              autoClose: 6000
            })
          }
        }

        function handleBlurPhoneNumber(){
          if(!notifyPhoneNumberEmpty){

            toast.error("Phone Number name can't be empty!", {
              autoClose: 6000
            })
          }
        }

        function handleBlurStreet(){
          if(!notifyStreetEmpty){

            toast.error("Street name can't be empty!", {
              autoClose: 6000
            })
          }
        }

        function handleBlurStreetNo(){
          if(!notifyStreetNoEmpty){
            toast.error("Street number can't be empty!", {
              autoClose: 6000
            })
          }
        }

        function handleBlurBlock(){
          if(!notifyBlockEmpty){
            toast.error("Last name can't be empty!", {
              autoClose: 6000
            })
          }
        }

        function handleBlurApartmentNo(){
          if(!notifyApartamentNoEmpty){
            toast.error("Last name can't be empty!", {
              autoClose: 6000
            })
          }
        }

        function validateFirstName(firstName){
        const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

        if (firstName === "") {
          setNotifyFirstNameEmpty(true);
          toast.error("First name can't be empty!", {
              autoClose: 6000
          });
          return false;
      }

        if(firstName.match(/\d/)){
          if(!notifyFirstNameNumbers){
            toast.error("First name can't contain numbers!", {
              autoClose: 6000
            })
            setNotifyFirstNameNumbers(true);
          }
      
          return false
        } 

         if(specialChars.test(firstName)){
        //   setFirstNameError("First name can't contain special characters!")
          if(!notifyFirstNameSpecialChar){
            toast.error("First name can't contain special characters!", {
              autoClose: 6000
            })
            setNotifyFirstNameSpecialChar(true)
          }
      
          return false
        }
      
        if(/[a-z]/.test(firstName.charAt(0))){
        //   setFirstNameError("First letter of your last name needs to be uppercase!")
          if(!notifyFirstNameUppercase){
            toast.error("First name's first character needs to be uppercase!", {
              autoClose: 6000
            })
            setNotifyFirstNameUppercase(true)
          }
      
          return false
        }
      
      
          return true;
        }
      
        function validateLastName(lastName){
        const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

        if(lastName.match(/\d/)){
          
          if(!notifyLastNameNumbers){
            toast.error("Last name can't contain numbers!", {
              autoClose:6000
            })
            setNotifyLastNameNumbers(true)
          }
          
          return false
        } 
        
        if(specialChars.test(lastName)){
          
          if(!notifyLastNameSpecialChar){
            toast.error("Last name can't contain special characters!", {
              autoClose: 6000
            })
            setNotifyLastNameChar(true)
          }
      
          return false
        }
      
        if(/[a-z]/.test(lastName.charAt(0))){
          if(!notifyLastNameUppercase){
            toast.error("Last name's first character needs to be uppercase!", {
              autoClose: 6000
            })
            setNotifyLastNameUppercase(true)
          }

          return false
        }
      
      
          return true;
        }
      
        function validatePhoneNumber(phoneNumber){
          const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

          if(phoneNumber.length > 10){
            if(!notifyPhoneDigits){
              toast.error("Phone number can't exceed 10 digits!", {
                autoClose: 6000
              })
              setNotifyPhoneDigits(true)
            }
      
            return false
          }

          if(/[a-zA-Z]/.test(phoneNumber)){
            if(!notifyLetterPhone){
              toast.error("Phone number can't contain letters!", {
                autoClose: 6000
              })
              setNotifyLetterPhone(true)
            }
            return false
          }

          if(specialChars.test(phoneNumber)){
          
            if(!notifySpecialCharPhone){
              toast.error("Phone number can't contain special characters! No prefix needed!", {
                autoClose:6000
              })
              setNotifySpecialCharPhone(true)
            }
            
            return false
          } 
      
          return true;
        }

        function validateStreet(street){

          const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

          if(street.match(/\d/)){
            if(!notifyStreetNumbers){
              toast.error("Street can't contain numbers! Input Street No.below.", {
                autoClose: 6000
              })
              setNotifyStreetNumbers(true)
            }
            return false
          }

          if(specialChars.test(street)){
            if(!notifyStreetSpecialChar){
              toast.error("Street can't contain special characters!", {
                autoClose:6000
              })
              setNotifyStreetSpecialChar(true)
            }
            return false
          }

          return true
        }

        function validateStreetNo(streetNo){
          const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

          if(/[a-zA-Z]/.test(streetNo)){
            if(!notifyLetterStreetNo){
              toast.error("Street No. can't contain letters!", {
                autoClose: 6000
              })
              setNotifyLetterStreetNo(true)
            }
            return false
          }

          if(specialChars.test(streetNo)){
          
            if(!notifySpecialCharStreetNo){
              toast.error("Street No. can't contain special characters! No prefix needed!", {
                autoClose:6000
              })
              setNotifySpecialStreetNo(true)
            }
            return false
        }

         return true
        }

        function validateBlock(block){
          const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

          if(/[a-zA-Z]/.test(block)){
            if(!notifyLetterBlock){
              toast.error("Phone number can't contain letters!", {
                autoClose: 6000
              })
              setNotifyLetterBlock(true)
            }
            return false
          }

          if(specialChars.test(block)){
          
            if(!notifySpecialCharBlock){
              toast.error("Phone number can't contain special characters! No prefix needed!", {
                autoClose:6000
              })
              setNotifySpecialBlock(true)
            }
            return false
        }
        return true
        }

        function validateApartamentNo(apartamentNo){
          const specialChars = /[`!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?~]/

          if(/[a-zA-Z]/.test(apartamentNo)){
            if(!notifyLetterApartament){
              toast.error("Phone number can't contain letters!", {
                autoClose: 6000
              })
              setNotifyLetterApartament(true)
            }
            return false
          }

          if(specialChars.test(apartamentNo)){
          
            if(!notifySpecialCharApartament){
              toast.error("Phone number can't contain special characters! No prefix needed!", {
                autoClose:6000
              })
              setNotifySpecialApartament(true)
            }
            return false
        }
        return true
        }

        const handleEmailChange = e => {
          setEmailValidState(!validateEmail(e.target.value))
          setEmail(e.target.value)
        }

        const handleLastNameChange = (e) => {
          const input = e.target.value
          setLastName(input)
          validateLastName(input)
        }

        const handleFirstNameChange = (e) => {
          const input = e.target.value
          setFirstName(input)
          validateFirstName(input)
        }

        const handlePhoneNumberChange = (e) => {
          const input = e.target.value
          setPhoneNumber(input)
          validatePhoneNumber(input)
        }

        const handleStreetChange = (e) => {
          const input = e.target.value
          setStreet(input)
          validateStreet(input)
        }

        const handleStreetNoChange = (e) => {
          const input = e.target.value
          setStreetNo(input)
          validateStreetNo(input)
        }

        const handleBlockChange = (e) => {
          const input = e.target.value
          setBlock(input)
          validateBlock(input)
        }

        const handleApartamentNo = (e) => {
          const input = e.target.value
          setApartamentNo(input)
          validateApartamentNo(input)
        }

        const handleCompanyNameChange = (e) => {

        }

        const handleCompanyCuiChange = (e) => {

        }

        
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
        return cart.map(cart => `${cart.title} ${cart.kg}Kg (Cantitate : ${cart.quantity}) => ${cart.kg * cart.quantity} de ${cart.title})
        `)
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

    <ToastContainer />

    <div className="deliveryAddress_inputs">
      <div className='deliveryAddress_inputs__input' >
        <input type="text" required="required" defaultValue={user?.uid ? user.email : email} onChange={handleEmailChange} onBlur={handleBlurEmail}></input>
        <span>Email Address</span>
      </div>

      <div className='deliveryAddress_inputs__input input2' >
        <div>
          <input type="text" defaultValue={user?.uid ? conditional.firstName : firstName} onChange={handleFirstNameChange} onBlur={HandleBlurFirstName} required="required" ></input>
          <span>First name</span>
        </div>

        <div className='lastNameInput'>
          <input type="text" defaultValue={user?.uid ? conditional.lastName : lastName} onChange={handleLastNameChange} required="required" ></input>
          <span>Last name</span>
        </div>
      </div>

      <div className='deliveryAddress_inputs__input' >
        <input type="number" defaultValue={user?.uid ? conditional.phoneNumber : phoneNumber} onChange={handlePhoneNumberChange} required="required"></input>
        <span>Telephone</span>
      </div>
      
      <div className='deliveryAddress_inputs__input' >
        <input type="text" defaultValue={user?.uid ? conditional.address : street} onChange={handleStreetChange} required="required"></input>
        <span>Street</span>
      </div>


      <div className='deliveryAddress_inputs__input towninput' >

        <div className='lastNameInput'>
          <input type="text" defaultValue={user?.uid ? conditional.streetNo : streetNo} onChange={handleStreetNoChange} required="required"></input>
          <span>Street No.</span>
        </div>

        <div className='lastNameInput'>
          <input type="text" defaultValue={user?.uid ? conditional.block : block} onChange={handleBlockChange} required="required"></input>
          <span>Block</span>
        </div>

      </div>
      
      <div className='deliveryAddress_inputs__input'>
          <input type="text" defaultValue ={user?.uid ? conditional.apartamentNo : apartamentNo} onChange={handleApartamentNo} required="required"></input>
          <span>Apartament No.</span>
      </div>

        <div className='companyCheckbox'>
          <input type="checkbox" id='Company' name='company' checked={isCompanyChecked} onChange={() => setIsCompanyChecked(!isCompanyChecked)}></input>
          <label for="Company" >Company</label>
        </div>

      {isCompanyChecked && (

        <div className='deliveryAddress_inputs__input towninput' >

        <div className='lastNameInput'>
          <input type="text" defaultValue={companyName} onChange={handleCompanyNameChange} required="required"></input>
          <span>Name</span>
        </div>

        <div className='lastNameInput'>
          <input type="text" defaultValue={companyCui} onChange={handleCompanyCuiChange} required="required"></input>
          <span>ID / CUI</span>
        </div>

        </div>
          )}
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
                    subject: `Comanda de la ${email}`,
                    name : `${firstName} ${lastName}`,
                    message : `
                    Comanda contine :
                    ${stripeIdss()} `,
                    totalPrice : `Pretul total este de ${totalPrice} lei.`,
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