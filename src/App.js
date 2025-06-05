import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import { AuthProvider } from "./context/auth";
import Customer from "./pages/Customer";
import ExteriorDesign from "./pages/Exterior Desgin";
import Home from "./pages/Home";
import InteriorDesign from "./pages/InteriorDesign";

import { Toaster } from "react-hot-toast";
import CartPage from "../src/pages/CartPage";
import Dashboard from "./User/DashBoard";
import Orders from "./User/Orders";
import Search from "./User/Search";
import Profile from "./User/profile";
import AdminRoute from "./components/Routes/AdminRoute";
import PrivateRoute from "./components/Routes/private";
import LayoutDecoratorApp from "./components/layoutDecorator";
import { CartProvider } from "./context/cart";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Users from "./pages/Admin/Users";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const location = useLocation();

  // List of paths where you DON'T want header/footer, e.g. /layoutDecorate
  const noHeaderFooterRoutes = ["/layoutDecorate"];

  // Check if current path matches one of these routes
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);
  return (
    <AuthProvider>
      <CartProvider>
        {!hideHeaderFooter && <Header />}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* your routes */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashBoard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/users" element={<Users />} />
          </Route>
          <Route path="/auth" element={<Customer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/interior" element={<InteriorDesign />} />
          <Route path="/exterior" element={<ExteriorDesign />} />
          <Route path="/layoutDecorate" element={<LayoutDecoratorApp />} />
        </Routes>
        {!hideHeaderFooter && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
