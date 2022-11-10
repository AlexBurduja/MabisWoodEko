export function ProductCardComponent(props) {
  const { Title, Kg, Price, Currency, Image } = props;

  return (
    <div className="cardDiv">
        <h2>{Title}</h2>
        <img src={Image} alt="productImage" />

        <button>Buy!</button>
        <p>{Kg}</p>
        <span>{Price} {Currency}</span>
    </div>
  );
}
