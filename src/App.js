import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  // 📥 Fetch products from backend on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  // 📝 Handle input change in form
  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // ➕ Add product to backend and update UI
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      alert("Please enter at least name and price!");
      return;
    }

    const productToSend = {
      ...newProduct,
      price: Number(newProduct.price),
    };

    axios
      .post("http://localhost:5000/api/products", productToSend)
      .then((res) => {
        setProducts([...products, res.data]); // Add new product to state
        setNewProduct({ name: "", price: "", description: "", category: "" }); // Clear form
      })
      .catch((err) => {
        console.error("Error adding product:", err);
      });
  };

  // ❌ Delete product from backend and update UI
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };

  return (
    <div className="App">
      <h1>Product Management App</h1>

      {/* Add Product Form */}
      <form onSubmit={handleAdd} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          value={newProduct.category}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Product List */}
      <div className="product-list" style={{ display: "flex", flexWrap: "wrap" }}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
