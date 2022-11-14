import { useState, useEffect } from "react";

export function CreateProduct(props){
  
  const { Title, Kg, Price, Currency, Image, id} = props;

  const productDetailUrl = 'http://localhost:3001';
  const endpoint = "/product";

  const [title, setTitle] = useState('');
  const [kg, setKg] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState('');

  useEffect(() => {
      fetch(productDetailUrl + endpoint + '/' + id)
        .then((response) => response.json())
        .then((product) => {
          setTitle(product.Title);
          setKg(product.Year);
          setPrice(product.Type);
          setCurrency(product.Poster);
        });
  }, []);

  function submit() {
    const body = {
      title:title,
      kg:kg,
      price:price,
      currency:currency,
      id:id
    }

    fetch(productDetailUrl + endpoint + "/" + id, {
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
              <input id="title" value={title} ></input>

              <label for="kg">Kg :</label>
              <input id="kg" value={kg} ></input>

              <label for="price">Price :</label>
              <input id="price" value={price} ></input>

              <label for="currency">Currency :</label>
              <input id="currency" value={currency} ></input>
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
