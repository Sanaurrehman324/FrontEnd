import React from "react";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart"; // cart context import karo
import { useNavigate } from "react-router-dom"; // navigate import karo
import { toast } from "react-hot-toast"; // toast import karo

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart(); // cart state
  const navigate = useNavigate(); // navigation hook

  return (
    <div className="container">
      <div className="text-center">
        <h1>Search Results</h1>
        <h6>
          {values?.results.length < 1
            ? "No Products Found"
            : `Found ${values?.results.length} products`}
        </h6>
        <div className="d-flex flex-wrap mt-4">
          {Array.isArray(values?.results) &&
            values.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img
                  src={p?.photo?.[0]?.url}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ${p.price}</p>

                  {/* ✅ More Details Button */}
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>

                  {/* ✅ Add to Cart Button */}
                  <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
