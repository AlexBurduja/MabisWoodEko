import { useState, useEffect } from "react";
import "./ProductCardComponent.css"

/// Modal

export function ProductCardComponent(props) {
  const { Title, Kg, Price, Currency, Image, id} = props;

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

  const productDetailUrl = 'http://localhost:3001';
  const endpoint = "/product"

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [kg, setKg] = useState();
  const [currency, setCurrency] = useState();

  useEffect(() => {
    fetch(productDetailUrl + endpoint + "/" + id)
    .then((response) => response.json())
    .then((product) => {
      setTitle(product.title);
      setPrice(product.price);
      setKg(product.kg)
      setCurrency(product.currency)
    }) 
  }, [])

  function titleChange(event){
    setTitle(event.target.value);
  }

  function priceChange(event){
    setPrice(event.target.value);
  }

  function kgChange(event){
    setKg(event.target.value);
  }

  function currencyChange(event){
    setCurrency(event.target.value);
  }

  function submit(event) {
    event.preventDefault();

    const body = {
      title : title,
      kg : kg,
      price : price,
      currency : currency
    };

    fetch(productDetailUrl + endpoint + "/" + id,{
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


  
  return (
        <>
    <div className="cardDiv">
        <h2>{Title}</h2>
        <img src={Image} alt="productImage" />

        <button>Add to cart</button>
        <p>{Kg} Kg</p>
        <span>{Price} {Currency}</span>

        <button onClick={toggleModal} className="btn-modal">
          Edit Product
        </button>
    </div>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h1>Modal</h1>
                  <p className="modal-content_p">Here you can change anything that you want regarding your product.</p>
                  
                  <div className="modal-content-inputs">
                    
                    <label for="title">Title :</label>
                    <input id="title" value={title} onChange={titleChange}></input>

                    <label for="kg">Kg :</label>
                    <input id="kg" value={kg} onChange={kgChange}></input>
                    
                    <label for="price">Price :</label>
                    <input id="price" value={price} onChange={priceChange}></input>
                    
                    <label for="currency">Currency :</label>
                    <input id="currency" value={currency} onChange={currencyChange}></input>
                  </div>

                  <button onClick={deleteItem} className="modal-content-button_delete">Delete Item</button>
                  <button className="modal-content-button_save" onClick={submit} >Save Changes</button>
                  <button className="close-modal" onClick={toggleModal}>
                    X
                  </button>
            </div>
          </div>
        )}
        </>
  );
}
