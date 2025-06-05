import { Checkbox } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import "../pages/Home.css"; // Updated CSS

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [view3D, setView3D] = useState(null);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://backendfyp-production.up.railway.app/api/category/get-category");
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://backendfyp-production.up.railway.app/api/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("https://backendfyp-production.up.railway.app/api/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://backendfyp-production.up.railway.app/api/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...(data?.products || [])]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    value ? all.push(id) : (all = all.filter((c) => c !== id));
    setChecked(all);
  };

  useEffect(() => {
    checked.length ? filterProduct() : getAllProducts();
  }, [checked]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("https://backendfyp-production.up.railway.app/api/product/product-filters", {
        checked,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const get3DModelUrl = (productName) => {
    switch (productName.toLowerCase()) {
      case "building":
        return "https://sketchfab.com/models/127706f6b976467e988595648876a3c9/embed";
      case "architecture":
        return "https://sketchfab.com/models/b29c10f5cabf4c95a3641cbd835def3d/embed";
      default:
        return null;
    }
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="header-left">
          <p className="offer-text">Limited Time Offer: Get 40% Off Now!</p>
          <h1 className="main-heading">Architectural Designing Made Easy</h1>
          <p className="sub-heading">Get Your Premade Templates at Affordable Prices</p>
          <button className="shop-now-btn">Shop Now</button>
        </div>
      </header>

      <div className="content">
        <aside className="filter-sidebar">
          <h4>Filter by Category</h4>
          {categories?.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
          <button className="reset-btn" onClick={() => window.location.reload()}>
            Reset Filters
          </button>
        </aside>

        <main className="product-area">
          <div className="product-grid">
            {products?.map((p) => (
              <div className="card" key={p._id}>
                {p.photo && p.photo.length > 0 && (
                  <img src={p.photo[0].url} className="card-img-top" alt={p.name} />
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
                    <button onClick={() => navigate(`/product/${p.slug}`)} className="btn">
                      More Details
                    </button>
                    <button
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem("cart", JSON.stringify([...cart, p]));
                        toast.success("Item Added to cart");
                      }}
                      className="btn"
                    >
                      Add to Cart
                    </button>
                    {get3DModelUrl(p.name) && (
                      <button className="btn" onClick={() => setView3D(p._id)}>View 3D</button>
                    )}
                  </div>
                  {view3D === p._id && (
                    <div className="embed-wrapper">
                      <iframe
                        title={p.name}
                        frameBorder="0"
                        allowFullScreen
                        src={get3DModelUrl(p.name)}
                        width="100%"
                        height="300"
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {products && products.length < total && (
            <div className="loadmore-wrapper">
              <button
                className="loadmore-btn"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading..." : <>Load More <AiOutlineReload /></>}
              </button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
};

export default HomePage;
