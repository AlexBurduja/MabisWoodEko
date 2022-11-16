import { useState } from "react";
import "./ProductCardComponent.css"
import 'animate.css';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from "../../firebase-config"

/// Modal

export function ProductCardComponent(props) {

  const { Title , Kg, Currency, Price, Image, Id } = props

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

  //   fetch(productDetailUrl + endpoint + "/" + id,{
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

  const [newTitle, setNewTitle] = useState("")
  const [newCurrency, setNewCurrency] = useState("")
  const [newImage, setNewImage] = useState("")
  const [newPrice, setNewPrice] = useState(0)
  const [newKg, setNewKg] = useState(0)

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
    const newFields = { title: newTitle, currency:newCurrency, image:newImage, price:newPrice, kg:newKg }
    await updateDoc(userDoc, newFields);
  }

  function editProductButton() {
    editProduct(Id ,Title, Image, Kg, Price, Currency)}

  return (
        <>
    <div className="cardDiv">
        <h2>{Title}</h2>
        <img src={Image} alt="productImage" />

        <button>Add to cart</button>
        <p>{Kg} Kg</p>
        <span>{Price} {Currency}</span>

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
                    <input id="title" defaultValue={Title} onChange={titleChange} ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="kg">Kg :</label>
                    <input id="kg" defaultValue={Kg} onChange={kgChange}  ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="price">Price :</label>
                    <input id="price" defaultValue={Price} onChange={priceChange}  ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="currency">Currency :</label>
                    <input id="currency" defaultValue={Currency} onChange={currencyChange} ></input>
                    </div>

                    <div className="modal-content-inputs_div">
                    <label for="image">Image :</label>
                    <input id="image" defaultValue={Image} onChange={imageChange} ></input>
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
