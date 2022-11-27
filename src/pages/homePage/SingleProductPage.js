import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function SingleProductPage() {
  const url = "http://localhost:3001/product"

  let { id } = useParams();
  const [productDetails, setproductDetails] = useState({})

  useEffect(() => {
    fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((product) => setproductDetails(product))
  }, [])
  
  return (
    <>
      <img src={productDetails.image} alt="productImage"/>
      <h1>Title : {productDetails.title}</h1>
      <p>Kg : {productDetails.kg} </p>
      <p>Price: {productDetails.price} {productDetails.currency}</p>
      <p>Description : {productDetails.description} </p>
    </>
  );
}
