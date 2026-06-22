import { useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "https://dummyjson.com/products"
      );

      setProducts(response.data.products);
    } catch (error) {
      setError("Ошибка загрузки товаров");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    const updatedCart = [...cart, product];

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Магазин товаров</h1>

      <button onClick={loadProducts}>
        Загрузить товары
      </button>

      <h2>Корзина: {cart.length}</h2>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {loading && <h2>Загрузка...</h2>}

      {error && <h2>{error}</h2>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}