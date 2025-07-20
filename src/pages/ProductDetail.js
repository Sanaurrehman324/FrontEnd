import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import "../pages/ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [view3D, setView3D] = useState(false);
  const [cart, setCart] = useCart();
  const [selectedImage, setSelectedImage] = useState(null);
  const [viewwUrl, setViewwUrl] = useState();
  const [include3DTool, setInclude3DTool] = useState(false);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://backend-production-8ea6.up.railway.app/api/product/get-product/${params.slug}`
      );
      if (data?.product) {
        setProduct(data.product);
        getSimilarProduct(data.product._id, data.product.category._id);
        setViewwUrl(data?.product.viewerURL);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching product details");
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://backend-production-8ea6.up.railway.app/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load related products");
    }
  };

  const get3DModelUrl = (vUrl) => {
    return vUrl;
  };

  return (
    <div className="product-details-container">
      <div className="product-main">
        <div className="product-images">
          {(selectedImage || product?.photo?.[0]) && (
            <img
              src={(selectedImage || product.photo[0]).url}
              alt={product.name}
              className="main-product-image"
            />
          )}

          <div className="thumbnail-container">
            {product?.photo?.map((p, i) => (
              <img
                key={i}
                src={p.url}
                alt={`Thumb ${i + 1}`}
                className="thumbnail-image"
                onClick={() => setSelectedImage(p)}
              />
            ))}
          </div>
        </div>

        <div className="product-info-box">
          <h2>{product.name}</h2>

          <div className="price-row">
            <span className="new-price">${product.price?.toFixed(2)}</span>
          </div>

          <div className="product-size-row" style={{ margin: "10px 0" }}>
            <strong>Size:</strong> {product.size || "N/A"}
          </div>

          <div className="button-group">
            <button
              className="add-cart-btn"
              onClick={() => {
                const isProductInCart = cart.find(item => item._id === product._id);
                if (isProductInCart) {
                  toast.error("Item is already in your cart");
                  return;
                }

                let newCart = [...cart, product];

                if (include3DTool && !cart.find(item => item?.id === "3d-tool-global")) {
                  const customizationItem = {
                    id: "3d-tool-global",
                    name: `3D Tool Customization`,
                    price: 20,
                    icon: "🛠️",
                    quantity: 1,
                    isCustomization: true,
                  };
                  newCart.push(customizationItem);
                }

                setCart(newCart);
                localStorage.setItem("cart", JSON.stringify(newCart));
                toast.success("Item added to cart" + (include3DTool ? " with 3D Tool" : ""));
              }}
            >
              Add to Cart
            </button>

            <button
              className="view-3d-btn"
              onClick={() => setView3D(!view3D)}
            >
              {view3D ? "Close 3D View" : "View in 3D"}
            </button>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <button
              className="open-3d-decorator-btn"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate('/layoutDecorate', { state: { layoutName: product.name } })}
            >
              Customize Interior
            </button>
          </div>

          <div className="description-box">
            <h4>Description:</h4>
            <p>{product.description}</p>
          </div>

          {view3D && (
            <div className="sketchfab-embed-wrapper mt-3">
              <iframe
                title={product.name}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                src={get3DModelUrl(viewwUrl)}
                width="100%"
                height="480px"
              ></iframe>
            </div>
          )}
        </div>
      </div>

      {relatedProducts?.length > 0 && (
        <div className="similar-products-section">
          <h2>Similar Products</h2>
          <div className="similar-products">
            {relatedProducts.map((p) => (
              <div
                key={p._id}
                className="product-card"
                onClick={() => navigate(`/product/${p.slug}`)}
              >
                <img src={p.photo[0]?.url} alt={p.name} />
                <div className="product-info">
                  <h5>{p.name}</h5>
                  <p>${p.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
