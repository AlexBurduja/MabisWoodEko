import { useState } from "react";
import "./ProductCardComponent.css"
import 'animate.css';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from "../../firebase-config"

/// Modal

export function ProductCardComponent(props) {

  const { title ,kg, currency,  price, image,id } = props

    // const productDetailUrl = 'http://localhost:3001';
    // const endpoint = "/product"
  


  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  
  
  ///// End of Modal


  // useEffect(() => {
  //   fetch(productDetailUrl + endpoint + "/" + id)
  //   .then((response) => response.json())
  //   .then((product) => {
  //     setTitle(product.title);
  //     setPrice(product.price);
  //     setKg(product.kg)
  //     setCurrency(product.currency)
  //   }) 
  // }, [])

  // function submit(event) {
  //   event.preventDefault();
  
  //   const body = {
  //     title : title,
  //     kg : kg,
  //     price : price,
  //     currency : currency
  //   };

  //   fetch("https://pelets-project-default-rtdb.europe-west1.firebasedatabase.app/product/" + Id + ".json",{
  //     method: "PATCH",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(body)
  //   } )
  // }
  
  // function deleteItem() {
  //   fetch (productDetailUrl + endpoint + "/" + id , {
  //     method: "DELETE"
  //   })
  // }

  const [newTitle, setNewTitle] = useState(title)
  const [newCurrency, setNewCurrency] = useState(currency)
  const [newPrice, setNewPrice] = useState(price)
  const [newKg, setNewKg] = useState(kg)
  const [newImage, setNewImage] = useState(image)

    function titleChange(event){
    setNewTitle(event.target.value)
  }

  function currencyChange(event){
    setNewCurrency(event.target.value)
  }

  function imageChange(event){
    setNewImage(event.target.value)
  }

  function priceChange(event){
    setNewPrice(event.target.value)
  }

  function kgChange(event){
    setNewKg(event.target.value)
  }


  const editProduct = async (id) => {
    const userDoc = doc(db, "products", id)
    await updateDoc(userDoc, {
      title : newTitle,
      price : newPrice,
      currency : newCurrency,
      kg : newKg ,
      image : newImage
    });
  }


  function editProductButton() {
    editProduct(id, title, image, kg, price, currency)
  }

  return (
        <>
    <div className="cardDiv">
        <h2>{title}</h2>
        <img src={image} alt="productImage" />

        <button>Add to cart</button>
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
                    <label for="image">Image :</label>
                    <input id="image" defaultValue={image} onChange={imageChange} ></input>
                    </div>
                  </div>

                  <div className="modal-content-buttons">
                  <button  className="modal-content-button_delete">Delete Item</button>
                  <button className="modal-content-button_save" onClick={editProductButton} >Save Changes</button>
                  </div>
                  
                  <button className="close-modal" onClick={toggleModal}>
                    X
                  </button>
            </div>
          </div>
        )}
        </>
  );
}
