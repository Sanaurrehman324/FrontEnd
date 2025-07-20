import React from "react";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    const alreadyInCart = cart.find((item) => item._id === product._id);
    if (alreadyInCart) {
      toast.error("Already in cart");
    } else {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Added to cart");
    }
  };

  return (
    <div className="homepage">
      <div className="text-center">
        <h1>Search Results</h1>
        <h6>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length} product(s)`}
        </h6>
      </div>

      <div className="content">
        {/* No sidebar needed in search page */}
        <div className="product-area">
          <div className="product-grid">
            {values?.results?.map((p) => (
              <div className="card" key={p._id}>
                <img
                  src={p?.photo?.[0]?.url}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <p className="card-price">${p.price}</p>

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
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
