import { useState } from "react";
import "./CreateProduct.css"
import 'animate.css';
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { async } from "@firebase/util";
import { useContext } from "react";
import { FirebaseAuthContext } from "../../FirebaseAuthContext";


export function CreateProduct(){


  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [kg, setKg] = useState('');
  const [currency, setCurrency] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const [ succes, setSucces ] = useState('')

  // const [user , setUser] = useState({})
  const [conditional , setConditional ] = useState(false)

  const { user } = useContext(FirebaseAuthContext)

  // console.log(user.uid)
  
  
  useEffect(() => {
    if(user?.uid){

      const ref = doc(db, 'users', user.uid)
      
  const getDocument = async () => {
    
    let document = await getDoc(ref)
    
    return document.data().admin
  }
  
  getDocument()
  .then(data => {
    setConditional(data)
  })
}
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

  // function submit(event) {
  //   event.preventDefault();

  //   const body = {
  //     title:title,
  //     kg:kg,
  //     price:price,
  //     currency:currency,
  //     image: image,
  //     description : description
  //   }

  //     fetch(productDetailUrl + endpoint, {
  //       method: "POST",
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(body)
  //     })
  //     .then(response => {
  //       if(response.status === 201){

  //         setSucces("Product Created!")          
  //         setInterval(() => {
  //           setSucces("")
  //           window.location.reload()
        
  //         }, 1500)
  //       }
  //     })
  //   }

  const [ firebaseImg, setFirebaseImg ] = useState(null)
  const [ url , setUrl] = useState(null)

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


  function submit(event) {
    event.preventDefault()

    try {
      setDoc(doc(db, 'products', title), {
      title:title,
      kg:kg,
      price:price,
      currency:currency,
      image: url,
      description : description
      })
    } catch (error) {
      console.log(error.message)
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
    {conditional === true && (
      <div className="createProductButtonWrapper">
        <button className="createProductButton" onClick={toggleModal2}>Create Product</button>
      </div>
    )}

      {modal2 && (
        <div className="modal">
          <div onClick={toggleModal2} className="overlay"></div>
            <div className="modal-content modal2">
              <h1 >Create product.</h1>
              <p className="modal-content_p">All fields need to be completed.</p>

              <AnimatePresence>
                  {succes && (
                    <motion.h3
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{ease: "easeInOut", duration:1.5}}
                    className="editModalSucces"
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
                      <input id="currency" onChange={currencyChange}  required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label htmlFor="description">Description :</label>
                      <input id="description" onChange={descriptionChange} required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <label htmlFor="image">Image :</label>
                      <input type="url" onChange={imageChange} id="image" required></input>
                    </div>

                    <div className="modal-content-inputs_div">
                      <input type="file" onChange={handleImageChange}></input>
                      <button onClick={handleSubmit}>Upload Image</button>
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
