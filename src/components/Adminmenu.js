import React from "react";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  const sidebarStyle = {
    width: "220px",
    backgroundColor: "#3A4750",
    color: "white",
    padding: "30px 15px",
    height: "800px", // Custom adjustable height
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
    paddingBottom: "10px",
  };

  const linkStyle = {
    color: "white",
    padding: "10px 15px",
    textDecoration: "none",
    borderRadius: "4px",
    margin: "4px 0",
    transition: "background 0.3s ease",
  };

  const activeLinkStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  };

  return (
    <div style={sidebarStyle}>
      <h4 style={titleStyle}>Admin Panel</h4>

      <NavLink
        to="/dashboard/admin/create-category"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeLinkStyle : {}),
        })}
      >
        Create Category
      </NavLink>

      <NavLink
        to="/dashboard/admin/create-product"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeLinkStyle : {}),
        })}
      >
        Create Product
      </NavLink>

      <NavLink
        to="/dashboard/admin/products"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeLinkStyle : {}),
        })}
      >
        Products
      </NavLink>
    </div>
  );
};

export default Adminmenu;
