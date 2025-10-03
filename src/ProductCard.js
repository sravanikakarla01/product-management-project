import React from "react";
import './ProductCard.css';

const ProductCard = ({ product, onDelete }) => {
  return (
    <div
      className="product-card"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        width: "200px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
    >
      <h3>{product.name || "No name provided"}</h3>
      <p>Price: {product.price ? `$${product.price}` : "N/A"}</p>
      <p>{product.description || "No description available"}</p>
      <p>Category: {product.category || "Uncategorized"}</p>
      <button
        onClick={() => onDelete(product._id)}  // ✅ Updated from product.id to product._id
        style={{
          backgroundColor: "#ff4d4f",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ProductCard;
