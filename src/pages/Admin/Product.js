import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Adminmenu from "../../components/Adminmenu";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("https://backend-production-8ea6.up.railway.app/api/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Styles
  const pageStyle = {
    display: "flex",
    backgroundColor: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const menuStyle = {
    width: "220px",
    backgroundColor: "#fff",
    boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
    padding: "20px 10px",
  };

  const contentStyle = {
    flex: 1,
    padding: "30px",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "30px",
    fontWeight: "600",
    fontSize: "26px",
    color: "#333",
  };

  const productContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    justifyContent: "flex-start",
  };

  const cardStyle = {
    width: "260px",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    textDecoration: "none",
    color: "inherit",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const cardBodyStyle = {
    padding: "16px",
  };

  const cardTitleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#222",
  };

  const cardTextStyle = {
    fontSize: "14px",
    color: "#666",
    marginBottom: "5px",
  };

  const cardPriceStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#28a745",
    marginBottom: "5px",
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = "scale(1.03)";
    e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.12)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
  };

  return (
    <div style={pageStyle}>
      <div style={menuStyle}>
        <Adminmenu />
      </div>

      <div style={contentStyle}>
        <h1 style={headerStyle}></h1>

        <div style={productContainerStyle}>
          {products?.map((p) => (
            <Link
              key={p._id}
              to={`/dashboard/admin/product/${p.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={cardStyle}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
              >
                <img
                  src={p.photo?.[0]?.url || "/default-image.png"}
                  alt={p.name}
                  style={imageStyle}
                />

                <div style={cardBodyStyle}>
                  <h5 style={cardTitleStyle}>{p.name}</h5>
                  <p style={cardTextStyle}>{p.description}</p>
                  <h5 style={cardPriceStyle}>
                    {p.price?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                  <p style={cardTextStyle}>
                    Size: {p.size ? p.size : "N/A"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
