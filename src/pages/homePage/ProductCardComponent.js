import { useContext, useEffect, useState } from "react";
import "./ProductCardComponent.css"
import 'animate.css';
import { AuthContext } from "../../App";
/// Modal

export function ProductCardComponent(props) {

  const { title ,kg, currency,  price, image, description, id } = props



    const productDetailUrl = 'http://localhost:3001';
    const endpoint = "/product"


  const [modal, setModal] = useState(false);

  const [isHovering, setIsHovering] = useState(false)

  const handleMouseOver = () => {
    setIsHovering(true);
  }

  const handleMouseOut = () => {
    setIsHovering(false);
  }



  const toggleModal = () => {
    setModal(!modal)
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  
  
  const [newTitle, setTitle] = useState('')
  const [newCurrency, setCurrency] = useState('')
  const [newPrice, setPrice] = useState('')
  const [newKg, setKg] = useState('')
  const [newImage, setImage] = useState('')
  const [newDescription, setDescription] = useState('')
  ///// End of Modal

  const { auth } = useContext( AuthContext )

  useEffect(() => {
    fetch(productDetailUrl + endpoint + "/" + id, {
      headers: {
        Authorization : `Bearer ${auth.accessToken}`
      }
    })
    .then((response) => response.json())
    .then((product) => {
      setTitle(product.title);
      setPrice(product.price);
      setKg(product.kg)
      setCurrency(product.currency)
      setImage(product.image)
      setDescription(product.description)
    }) 
  }, [id])

  function submit(event) {
    event.preventDefault();
  
    const body = {
      title : newTitle,
      kg : newKg,
      price : newPrice,
      currency : newCurrency,
      description: newDescription,
      image : newImage
    };
if(auth.user.admin){
    fetch(productDetailUrl + endpoint + "/" + id ,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${auth.accessToken}`
      },
      body: JSON.stringify(body)
    } )
  }
}
  
  function deleteItem() {
    if(auth.user.admin) {
      fetch (productDetailUrl + endpoint + "/" + id , {
        method: "DELETE",
        headers: {
          Authorization : `Bearer ${auth.accessToken}`
        }
      })
    }
  }

    function titleChange(event){
    setTitle(event.target.value)
  }

  function currencyChange(event){
    setCurrency(event.target.value)
  }

  function imageChange(event){
    setImage(event.target.value)
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
          Authorization : `Bearer ${auth.accessToken}`
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
    user : auth.user.id}),

        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${auth.accessToken}`
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

        <button  className="cardDivButton" onClick={createCart}>Add to cart</button>

    
      <a href={`/products/${id}`} className="viewMoreButton"> View more </a>

      {
        auth.user.admin &&
        <button onClick={toggleModal} className="btn-modal cardDivButton">Edit</button>
      }
    </div>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content ">
                <h1>Edit product</h1>
                  <p className="modal-content_p">Here you can change anything that you want regarding your product..</p>
                  
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
                  </div>

                  <div className="modal-content-buttons">
                  <button  className="modal-content-button_delete" onClick={deleteItem}>Delete Item</button>
                  <button className="modal-content-button_save" onClick={submit} >Save Changes</button>
                  </div>
                  
                  <button className="close-modal" onClick={toggleModal}>
                    X
                  </button>
            </div>
          </div>
        )}
      </>
  )
}

