import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import { AuthProvider } from "./context/auth";
import { CartProvider } from "./context/cart";
import { Toaster } from "react-hot-toast";
import './App.css';


// Public Pages
import Home from "./pages/Home";
import Customer from "./pages/Customer";
import InteriorDesign from "./pages/InteriorDesign";
import ExteriorDesign from "./pages/Exterior Desgin";
import Contact from "./pages/Contact";
import Search from "./User/Search";
import CartPage from "./pages/CartPage";
import ProductDetail from "./pages/ProductDetail";

// User Pages
import PrivateRoute from "./components/Routes/private";
import Dashboard from "./User/DashBoard";
import Orders from "./User/Orders";
import Profile from "./User/profile";

// Admin Pages
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Products from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Users from "./pages/Admin/Users";

// Special Tools
import LayoutDecoratorApp from "./components/layoutDecorator";

function App() {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/layoutDecorate"];
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <CartProvider>
        {!hideHeaderFooter && <Header />}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Customer />} />
          <Route path="/interior" element={<InteriorDesign />} />
          <Route path="/exterior" element={<ExteriorDesign />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/layoutDecorate" element={<LayoutDecoratorApp />} />

          {/* Protected Dashboard */}
          <Route path="/dashboard" element={<PrivateRoute />}>
            {/* User Routes */}
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />

            {/* Admin Routes */}
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <AdminDashBoard />
                </AdminRoute>
              }
            />
            <Route
              path="admin/create-category"
              element={
                <AdminRoute>
                  <CreateCategory />
                </AdminRoute>
              }
            />
            <Route
              path="admin/create-product"
              element={
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              }
            />
            <Route
              path="admin/product/:slug"
              element={
                <AdminRoute>
                  <UpdateProduct />
                </AdminRoute>
              }
            />
            <Route
              path="admin/products"
              element={
                <AdminRoute>
                  <Products />
                </AdminRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <AdminRoute>
                  <Users />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
        {!hideHeaderFooter && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
