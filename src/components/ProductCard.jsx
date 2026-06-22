export default function ProductCard({ product, addToCart }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        borderRadius: "10px",
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        width="200"
      />

      <h3>{product.title}</h3>

      <p>{product.description}</p>

      <h4>${product.price}</h4>

      <button onClick={() => addToCart(product)}>
        Добавить в корзину
      </button>
    </div>
  );
}