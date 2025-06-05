import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const InteriorDesign = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getInteriorProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://backendfyp-production.up.railway.app/api/product/product-list/1");
      const interiors = data.products.filter(
        (product) => product.category.name === "Interior Design"
      );
      setProducts(interiors);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getInteriorProducts();
  }, []);

  return (
    <>
      <style>{`
        .container {
          padding: 20px;
          background-color: #f9f9f9;
        }

        .scroll-container {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 10px;
          scroll-snap-type: x mandatory;
          padding-bottom: 10px;
        }

          .card {
  width: 500px;
  height: auto;
  padding: 15px;
  margin: 15px; /* Apply margin on all sides for spacing between cards */
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 auto;
  scroll-snap-align: start;
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
        }

        .card-name-price {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 5px;
        }

        h1.text-center {
          margin-bottom: 20px;
        }
                .scroll-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
      `}</style>

      <div className="container">
        <h1 className="text-center">Interior Design Products</h1>
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
                <h5 className="card-title card-price">
                  {p.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h5>
                <p className="card-text">{p.description.substring(0, 60)}...</p>
                <div className="card-name-price">
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InteriorDesign;
