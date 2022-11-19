import { useEffect, useState } from "react";
import "./ProductCardComponent.css"
import 'animate.css';

/// Modal

export function ProductCardComponent(props) {

  const { title ,kg, currency,  price, image, id } = props

    const productDetailUrl = 'http://localhost:3001';
    const endpoint = "/product"


  const [modal, setModal] = useState(false);

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
  ///// End of Modal


  useEffect(() => {
    fetch(productDetailUrl + endpoint + "/" + id)
    .then((response) => response.json())
    .then((product) => {
      setTitle(product.title);
      setPrice(product.price);
      setKg(product.kg)
      setCurrency(product.currency)
      setImage(product.image)
    }) 
  }, [])

  function submit(event) {
    event.preventDefault();
  
    const body = {
      title : newTitle,
      kg : newKg,
      price : newPrice,
      currency : newCurrency,
      image : newImage
    };

    fetch(productDetailUrl + endpoint + "/" + id ,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    } )
  }
  
  function deleteItem() {
    fetch (productDetailUrl + endpoint + "/" + id , {
      method: "DELETE"
    })
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

  /// CART

  const cartUrl = 'http://localhost:3001/cart'

  function createCart() {

    fetch(`${cartUrl}/?productId=${id}`)
    .then(response => response.json)
    .then (cartProducts => {
      const [ cartProduct ] = cartProducts; 

      if (cartProduct) {

          fetch(`${cartUrl}/${cartProduct.id}`, {
            method: "PATCH",
            body: JSON.stringify({ quantity: cartProduct.quantity + 1 }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
      } else {
        
        fetch(`${cartUrl}`, {
          method: "POST",
  
          body: JSON.stringify({ productId: id, quantity: 1 }),
  
          headers: {
            'Content-Type': 'application/json'
          }
        });

      }
    })

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
    <div className="cardDiv">
        <h2>{title}</h2>
        <img src={image} alt="productImage" />

        <button onClick={createCart}>Add to cart</button>
        <p>{kg} Kg</p>
        <span>{price} {currency}</span>

        <button onClick={toggleModal} className="btn-modal">
          Edit
        </button>
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
                    <input id="title" value={newTitle} onChange={titleChange}  ></input>
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
