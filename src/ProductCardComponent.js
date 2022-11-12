export function ProductCardComponent(props) {
  const { Title, Kg, Price, Currency, Image, id} = props;

  const productDetailUrl = 'http://localhost:3001';
  const endpoint = "/product"

  function deleteItem() {
    fetch (productDetailUrl + endpoint + "/" + id , {
      method: "DELETE"
    })
  }


  
  return (
    <div className="cardDiv">
        <h2>{Title}</h2>
        <img src={Image} alt="productImage" />

        <button>Add to cart</button>
        <p>{Kg}</p>
        <span>{Price} {Currency}</span>
        <button onClick={deleteItem}>X</button>
    </div>
  );
}
