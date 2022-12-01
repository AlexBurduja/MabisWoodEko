import { useContext, useEffect, useState } from "react";
import "./CreateProduct.css"
import 'animate.css';
import { AuthContext } from "../../App";


export function CreateProduct(){


  const productDetailUrl = 'http://localhost:3001';
  const endpoint = "/product";

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [kg, setKg] = useState('');
  const [currency, setCurrency] = useState('');
  const [image, setImage] = useState('');

  const {auth} = useContext(AuthContext)

  useEffect(() => {
    fetch(productDetailUrl + endpoint, {
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

  function imageChange(event){
    setImage(event.target.value);
  }

  function submit(event) {
    event.preventDefault();

    const body = {
      title:title,
      kg:kg,
      price:price,
      currency:currency,
      image: image
    }

    fetch(productDetailUrl + endpoint, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    window.onclick.reload();
  }

  
  const [modal2, setModal2] = useState(false);

  const toggleModal2 = () => {
    setModal2(!modal2)
  };

  if(modal2) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  };
  
  return (
    
    <>
    {auth.user.admin &&
      <div className="createProductButtonWrapper">
        <button className="createProductButton" onClick={toggleModal2}>Create Product</button>
      </div>
    }

      {modal2 && (
        <div className="modal">
          <div onClick={toggleModal2} className="overlay"></div>
            <div className="modal-content ">
              <h1 >Create product.</h1>
              <p className="modal-content_p">All fields need to be completed.</p>

                <div className="modal-content-inputs">

                    <div className="modal-content-inputs_div">
                      <label for="title">Title :</label>
                      <input id="title" onChange={titleChange} onChangerequired></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label for="kg">Kg :</label>
                      <input id="kg" type="number" onChange={kgChange} required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label for="price">Price :</label>
                      <input id="price" type="number" onChange={priceChange} required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label for="currency">Currency :</label>
                      <input id="currency" onChange={currencyChange} required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label for="input">Image :</label>
                      <input type="url" onChange={imageChange} id="input" required></input>
                    </div>

                </div>

                <div className="modal-content-button_create">
              <button type="submit" onClick={submit} className="modal-content-button_save">Create Product</button>
                </div>
              <button className="close-modal" onClick={toggleModal2}>
                X
              </button>
            </div>
        </div>
      )}
    </>
  );
}
