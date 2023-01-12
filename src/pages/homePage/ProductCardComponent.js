import { useState } from "react";
import "./ProductCardComponent.css"
import 'animate.css';
import { AiFillEdit } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage } from "../../firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";

/// Modal

export function ProductCardComponent(props) {

  const { title ,kg, currency,  price, image, description, id } = props

  const [user , setUser] = useState({})
  const [conditional , setConditional ] = useState(false)
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    }
  })

  const getDocument = async () => {

if(user?.uid){
  const ref = doc(db, 'users', user.uid)
  let document = await getDoc(ref)
  return document.data().admin
}

  }

  getDocument()
  .then(data => {
    setConditional(data)
  })



  const [modalEdit, setModalEdit] = useState(false);

  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }

  const toggleModalEdit = () => {
    setModalEdit(!modalEdit)
  };

  if(modalEdit) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  
  
  const [newTitle, setTitle] = useState(title)
  const [newCurrency, setCurrency] = useState(currency)
  const [newPrice, setPrice] = useState(price)
  const [newKg, setKg] = useState(kg)
  const [newImage, setImage] = useState(image)

  const [newDescription, setDescription] = useState(description)

  const [succes, setSucces] = useState('')
  const [ deleteSucces, setDeleteSucces ] = useState('')
  ///// End of Modal

  // const { auth } = useContext( AuthContext )

  // useEffect(() => {
  //   fetch(productDetailUrl + endpoint + "/" + id, {
  //     headers: {
  //     }
  //   })
  //   .then((response) => response.json())
  //   .then((product) => {
  //     setTitle(product.title);
  //     setPrice(product.price);
  //     setKg(product.kg)
  //     setCurrency(product.currency)
  //     setImage(product.image)
  //     setDescription(product.description)
  //   }) 
  // }, [id])

  const [ firebaseImg, setFirebaseImg] = useState(null)
  const [url, setUrl] = useState(image)

  

  const handleImageChange = (e) => {
    if (e.target.files[0]){
      setFirebaseImg(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    const imageRef = ref(storage, firebaseImg.name);
    uploadBytes(imageRef, firebaseImg)
        .then(() => {
      getDownloadURL(imageRef)
        .then((url) => {
          setUrl(url)
          console.log(url)
      })
        .catch((error) => {
          console.log(error.message, "Error uploading")
      })
      setFirebaseImg(null)
    })
      .catch((error) => {
        console.log(error.message)
    })
  };
  
  const update = async () => {
    const userDoc = doc(db, 'products', id)
    
    const newFields = {
      title : newTitle,
      kg : newKg,
      price : newPrice,
      currency : newCurrency,
      description: newDescription,
      image : url
    }

    await updateDoc(userDoc, newFields)
      
    }
    
  
  function deleteItem() {
      fetch ("/" + id , {
        method: "DELETE",
        headers: {
        }
      })
      .then(response => {
        if(response.status === 200){
          setDeleteSucces('Product Deleted!')
          setTimeout(() => {
            setDeleteSucces('')
            window.location.reload()
          }, 1500)
        }
      })
    
  }

    function titleChange(event){
    setTitle(event.target.value)
  }

  function currencyChange(event){
    setCurrency(event.target.value)
  }

  function priceChange(event){
    setPrice(event.target.value)
  }

  function kgChange(event){
    setKg(event.target.value)
  }

  function descriptionChange(event){
    setDescription(event.target.value)
  }

  function imageChange(event){
    setImage(url)
  }
  /// CART

  const cartUrl = 'http://localhost:3001/cart'

   function createCart() {

    fetch(`${cartUrl}?user=${auth.user.id}`, {
      headers: {
        Authorization : `Bearer ${auth.accessToken}`
      }
    })
    .then(response => response.json())
    .then(cartList => {
      const [cart] = cartList;

      if (cart) {
        const productInCart = cart.products.find((product) => product.productId === id)

        if (productInCart) {
          productInCart.quantity = productInCart.quantity + 1; 
        } else {
          cart.products.push({ 
            productId: id, 
            productTitle: title, 
            productImage: image, 
            productPrice: price, 
            productCurrency: currency,
            productKg : kg,
            quantity: 1 })
          }
          updateCart(cart.id, cart.products);

      } else {
        createAndAddToCart();
      }
    })


    // fetch(`${cartUrl}/?productId=${id}`)
    // .then(response => response.json())
    // .then (cartProducts => {
    //   const [ cartProduct ] = cartProducts; 

    //   if (cartProduct) {

    //       updateQuantity(cartProduct);
        
    //   } else {
        
    //     addToCart();

    //   }
    // })


    function updateCart(cartId, products) {
      fetch(`${cartUrl}/${cartId}`, {
        method: "PATCH",
        body: JSON.stringify({ products }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }

    function createAndAddToCart() {
      fetch(`${cartUrl}`, {
        method: "POST",

        body: JSON.stringify({ products: 
      [
        {
          productId: id, 
          productTitle: title, 
          productImage: image, 
          productPrice: price,
          productCurrency: currency,
          productKg : kg,
          quantity: 1
        }
      ],
    user : "userid"}),

        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
  };

  //Firebase api edit
  // const editProduct = async (id) => {
  //   const userDoc = doc(db, "products", id)
  //   await updateDoc(userDoc, {
  //     title : newTitle,
  //     price : newPrice,
  //     currency : newCurrency,
  //     kg : newKg ,
  //     image : newImage
  //   });
  // }


  // function editProductButton() {
  //   editProduct(id, title, image, kg, price, currency)
  // }


  return (
        <>
    <div id="product" className="cardDiv" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
        <h2>{title}</h2>
        <img src={image} alt="productImage" />
        <p className="kgP">{kg} Kg</p>
        <p className="priceCurrencyP">{price} {currency}</p>

        <button  className="cardDivButton" >Add to cart</button>
    
        <a href={`/products/${id}`} className="viewMoreButton"> View more </a>

      { conditional === true && (
        <button onClick={toggleModalEdit} className="edit-btn">< AiFillEdit /></button>
      )}
      
    </div>

        {modalEdit && (
          <div className="modal">
            <div onClick={toggleModalEdit} className="overlay"></div>
              <div className="modal-content ">
                <h1>Edit product</h1>
                  <p className="modal-content_p">Here you can change anything that you want regarding your product..</p>
                  
                  <AnimatePresence>
                  {succes && (
                    <motion.h3
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{ease:"easeIn", duration:1.5}}
                    className="editModalSucces"
                    >
                      {succes}
                    </motion.h3>
                  )}
                  </AnimatePresence>

                  <AnimatePresence>
                  {deleteSucces && (
                    <motion.h3
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{ease:"easeIn", duration:1.5}}
                    className="editModalDeleteSucces"
                    >
                      {deleteSucces}
                    </motion.h3>
                  )}
                  </AnimatePresence>

                  <div className="modal-content-inputs">
                    
                    <div className="modal-content-inputs_div">
                    <label for="title">Title :</label>
                    <input id="title" defaultValue={title} onChange={titleChange}  ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="kg">Kg :</label>
                    <input id="kg" defaultValue={kg}  onChange={kgChange} ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="price">Price :</label>
                    <input id="price" defaultValue={price} onChange={priceChange}  ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="currency">Currency :</label>
                    <input id="currency" defaultValue={currency} onChange={currencyChange} ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="descrption">Description :</label>
                    <input id="descrption" defaultValue={description} onChange={descriptionChange} ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="image">Image :</label>
                    <input id="image" defaultValue={image} onChange={imageChange} ></input>
                    </div>

                    <div>
                      <label>Image :</label>
                      <input type="file" onChange={handleImageChange}></input>
                      <button onClick={handleSubmit}>Upload Image</button>
                    </div>

                    {/* <img alt="ProductImage"
                    src={url}></img> */}
                  </div>

                  <div className="modal-content-buttons">
                  <button  className="modal-content-button_delete" onClick={deleteItem}>Delete Item</button>
                  <button className="modal-content-button_save" onClick={update} >Save Changes</button>
                  </div>
                  
                  <button className="close-modal" onClick={toggleModalEdit}>
                    X
                  </button>
            </div>
          </div>
        )}
      </>
  )
}

