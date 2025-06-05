import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";
import { SearchProvider } from "./context/search";
import store from "./redux/store"; // ✅ Ensure correct store import

import 'antd/dist/reset.css';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>  {/* Optional but recommended */}
    <Provider store={store}>  {/* ✅ Wrap Redux Provider first */}
      <AuthProvider>  {/* ✅ Then AuthProvider */}
        <SearchProvider>
          <CartProvider>
            <BrowserRouter>  {/* ✅ Then Router */}
              <App />
            </BrowserRouter>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
