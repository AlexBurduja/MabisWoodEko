import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProductPage.css"

export function SingleProductPage() {
  const url = "http://localhost:3001/product"

  let { id } = useParams();
  const [productDetails, setproductDetails] = useState({})

  useEffect(() => {
    fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((product) => setproductDetails(product))
  }, [])

  function myFunction(smallImg) {
    let fullImg = document.getElementById("imageBox")
    fullImg.src = smallImg.src
  }
  
  return (
    
    <section>
      <div className="product">
        
        <div className="product-img">
          <img src={productDetails.image} alt="productImage" onClick={myFunction}/>
        </div>

        <div className="productInfo">
            <h1>Title : {productDetails.title}</h1>
            <p>Kg : {productDetails.kg} </p>
            <p>Price: {productDetails.price} {productDetails.currency}</p>
            <p>Description : {productDetails.description} </p>
        </div>
      
      </div>
    </section>
  );
}
