import axios from "axios";
import dropin from "braintree-web-drop-in";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import "../pages/CartStyles.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [loading, setLoading] = useState(false);
  const dropinRef = useRef(null);
  const dropinInstance = useRef(null);
  const navigate = useNavigate();
  const [downloadLinks, setDownloadLinks] = useState([]);

  // Get Braintree token
  const getToken = async () => {
    try {
      const { data } = await axios.get("https://backend-production-8ea6.up.railway.app/api/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log("Token Error:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (
      clientToken &&
      auth?.token &&
      dropinRef.current &&
      !dropinInstance.current &&
      cart?.length > 0
    ) {
      dropin.create(
        {
          authorization: clientToken,
          container: dropinRef.current,
          paypal: {
            flow: "vault",
          },
        },
        (err, instance) => {
          if (err) {
            console.error("Drop-in Error:", err);
            return;
          }
          dropinInstance.current = instance;
        }
      );
    }

    return () => {
      if (dropinInstance.current) {
        dropinInstance.current
          .teardown()
          .then(() => {
            dropinInstance.current = null;
          })
          .catch((err) => {
            console.warn("Drop-in teardown error:", err);
          });
      }
    };
  }, [clientToken, auth?.token, cart?.length]);

  const handlePayment = async () => {
    if (!dropinInstance.current || cart.length === 0) {
      alert("Your cart is empty. Please add items before making a payment.");
      return;
    }

    setLoading(true);

    try {
      const { nonce } = await dropinInstance.current.requestPaymentMethod();
      const { data } = await axios.post("https://backend-production-8ea6.up.railway.app/api/product/braintree/payment", {
        nonce,
        cart,
      });

      const links = cart
        ?.filter((item) => item?.modelURL)
        .map((item) => ({
          name: item.name || "Unnamed Product",
          url: item.modelURL,
        }));

      setDownloadLinks(links);
      setLoading(false);

      if (data && data.success) {
        alert("Payment Successful");
      } else {
        alert("Payment Successful");
      }

      setCart([]);
      localStorage.removeItem("cart");
    } catch (err) {
      setLoading(false);
      console.error("Payment Error:", err);
      alert("There was a problem processing your payment.");
    }
  };

  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => (total += item.price));
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const removeCartItem = (item) => {
    const myCart = cart.filter((c) => {
      if (item._id) return c._id !== item._id;
      if (item.id) return c.id !== item.id;
      return true;
    });
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  return (
    <div className="cart-page">
      <h1 className="text-center bg-light p-2 mb-1">
        {!auth?.user ? "Hello Guest" : `Hello ${auth?.token && auth?.user?.username}`}
        <br />
        <p className="text-center">
          {cart?.length
            ? `You have ${cart.length} items in your cart${auth?.token ? "" : " — please login to checkout!"}`
            : "Your Cart Is Empty"}
        </p>
      </h1>

      <div className="cart-layout container">
        {/* Left Side: Cart Items */}
        <div className="cart-items">
          {cart?.map((p) => (
            <div className="cart-item-card" key={p._id || p.id}>
              <div className="cart-left">
                <img src={p?.photo?.[0]?.url} alt={p.name} />
                <div className="cart-details">
                  <h4>{p.name}</h4>
                  <p>${p.price}</p>
                </div>
              </div>
              <button className="remove-btn" onClick={() => removeCartItem(p)}>
                Remove
              </button>
            </div>
          ))}

          {/* Show download links after successful payment */}
          {downloadLinks.length > 0 && (
            <div className="download-links mt-4">
              <h4 className="download-heading">Download Your Files</h4>
              <ul className="download-list">
                {downloadLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-link"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side: Cart Summary and Payment */}
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <p>Total | Checkout</p>
          <hr />
          <h4>Total: {totalPrice()}</h4>

          {!auth?.token && (
            <div className="mb-3">
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/auth", { state: "/cart" })}
              >
                Please login to checkout
              </button>
            </div>
          )}

          {auth?.token && (
            <>
              {cart.length === 0 ? (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  ⚠️ Add items to cart before proceeding to payment.
                </p>
              ) : (
                <>
                  <div ref={dropinRef} className="braintree-dropin-container"></div>
                  <button
                    className="btn btn-primary mt-3"
                    onClick={handlePayment}
                    disabled={loading || cart.length === 0}
                    style={{
                      opacity: loading || cart.length === 0 ? 0.5 : 1,
                      cursor: loading || cart.length === 0 ? "not-allowed" : "pointer",
                    }}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
