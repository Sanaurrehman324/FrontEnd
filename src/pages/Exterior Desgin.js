import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const ExteriorDesign = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getExteriorProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://backend-production-8ea6.up.railway.app/api/product/product-list/1");
      const exteriors = data.products.filter(
        (product) => product.category.name === "Exterior Design"
      );
      setProducts(exteriors);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getExteriorProducts();
  }, []);

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.some((item) => item._id === product._id);
    if (alreadyInCart) {
      toast.error("Item is already in your cart");
      return;
    }
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart");
  };

  return (
    <>
      <style>{`
        .exterior-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f5f5f5;
        }

        .exterior-header {
          background: linear-gradient(135deg, #b0bec5, #eceff1);
          padding: 60px 30px;
          text-align: center;
        }

        .exterior-header h1 {
          margin: 0;
          font-size: 36px;
          font-weight: bold;
          color: #2d3436;
        }

        .container {
          padding: 20px;
        }

        .scroll-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .card {
          width: 500px;
          height: auto;
          padding: 15px;
          margin: 15px;
          border: none;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          background: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-img-top {
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
        }

        .card-price {
          color: #28a745;
          font-weight: 600;
          font-size: 16px;
        }

        .card-text {
          font-size: 14px;
          color: #555;
          margin-bottom: 10px;
        }

        .btn {
          margin-top: 5px;
          font-size: 14px;
          padding: 6px 12px;
          color: white;
          background-color: #3A4750;
          border: none;
          border-radius: 5px;
          transition: background-color 0.2s ease;
        }

        .btn:hover {
          background-color: #00b894;
        }

        .card-name-price {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 5px;
        }

        @media (max-width: 768px) {
          .scroll-container {
            flex-direction: column;
            align-items: center;
          }

          .card {
            width: 90%;
          }
        }
      `}</style>

      <div className="exterior-page">
        <div className="exterior-header">
          <h1>Exterior Design Products</h1>
        </div>

        <div className="container">
          <div className="scroll-container">
            {products?.map((p) => (
              <div className="card" key={p._id}>
                {p.photo && p.photo.length > 0 && (
                  <img
                    src={p.photo[0].url}
                    className="card-img-top"
                    alt={p.name}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <div className="card-name-price">
                    <button
                      className="btn"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleAddToCart(p)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ExteriorDesign;
