import { upload } from "@testing-library/user-event/dist/upload";
import { useState, useEffect } from "react";
import "./CreateProduct.css"

export function CreateProduct(props){
  
  const { Title, Kg, Price, Currency} = props;

  const productDetailUrl = 'http://localhost:3001';
  const endpoint = "/product";

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [kg, setKg] = useState('');
  const [currency, setCurrency] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch(productDetailUrl + endpoint)
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

  function hello(){
    const image_input = document.querySelector("#image_input");
    let uploaded_image = "";
  
    image_input.addEventListener("change", function(){
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        uploaded_image = reader.result;
        document.querySelector("#display_image").style.backgroundImage= `url(${uploaded_image})`;
      });
      reader.readAsDataURL(this.files[0]);
    });
  }

  return (
    <>
      <button onClick={toggleModal2}>Create</button>
      {modal2 && (
        <div className="modal">
          <div onClick={toggleModal2} className="overlay"></div>
          <div className="modal-content">
            <h1>Modal</h1>
            <p className="modal-content_p">Here you can change anything that you want regarding your product.</p>

            <div className="modal-content-inputs">

              <label for="title">Title :</label>
              <input id="title" value={Title} onChange={titleChange}></input>

              <label for="kg">Kg :</label>
              <input id="kg" value={Kg} onChange={kgChange}></input>

              <label for="price">Price :</label>
              <input id="price" value={Price} onChange={priceChange}></input>

              <label for="currency">Currency :</label>
              <input id="currency" value={Currency} onChange={currencyChange}></input>

              <input onClick={hello} type="file" id="image_input" accept="image/png, image/jpg" value={image} onChange={imageChange}></input>
              <div id="display_image"></div>
            </div>

            <button className="modal-content-button_save" onClick={submit}>Save Changes</button>
            <button className="close-modal" onClick={toggleModal2}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}
