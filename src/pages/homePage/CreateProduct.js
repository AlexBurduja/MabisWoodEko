import { useContext, useEffect, useState } from "react";
import "./CreateProduct.css"
import 'animate.css';
import { AuthContext } from "../../App";
import { motion, AnimatePresence } from "framer-motion";


export function CreateProduct(){


  const productDetailUrl = 'http://localhost:3001';
  const endpoint = "/product";

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [kg, setKg] = useState('');
  const [currency, setCurrency] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const [ succes, setSucces ] = useState('')

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

  function descriptionChange(event){
    setDescription(event.target.value)
  }

  function submit(event) {
    event.preventDefault();

    const body = {
      title:title,
      kg:kg,
      price:price,
      currency:currency,
      image: image,
      description : description
    }

    if(auth.user.admin){
      fetch(productDetailUrl + endpoint, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer ${auth.accessToken}`
        },
        body: JSON.stringify(body)
      })
      .then(response => {
        if(response.status === 201){

          setSucces("Succes!")          
          setInterval(() => {
            setSucces("")
            window.location.reload()
        
          }, 2000)
        }
      })
    }
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

              <AnimatePresence>
                  {succes && (
                    <motion.h3
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{ease:"easeInOut", duration:1}}
                    >
                      {succes}
                    </motion.h3>
                  )}
                  </AnimatePresence>

                <div className="modal-content-inputs">

                    <div className="modal-content-inputs_div">
                      <label htmlFor="title">Title :</label>
                      <input id="title" onChange={titleChange} onChangerequired></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label htmlFor="kg">Kg :</label>
                      <input id="kg" type="number" onChange={kgChange} required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label htmlFor="price">Price :</label>
                      <input id="price" type="number" onChange={priceChange} required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label htmlFor="currency">Currency :</label>
                      <input id="currency" onChange={currencyChange} required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label htmlFor="description">Description :</label>
                      <input id="description" onChange={descriptionChange} required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label htmlFor="image">Image :</label>
                      <input type="url" onChange={imageChange} id="image" required></input>
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
