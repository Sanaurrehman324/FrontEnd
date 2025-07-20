import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Adminmenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Media query checker
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsOpen(window.innerWidth > 768); // open sidebar by default on desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: isOpen ? "220px" : "0px",
    backgroundColor: "#3A4750",
    color: "white",
    padding: isOpen ? "30px 15px" : "0",
    height: "100vh",
    overflow: "hidden",
    transition: "width 0.3s ease, padding 0.3s ease",
    position: isMobile ? "fixed" : "relative",
    zIndex: 999,
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
    whiteSpace: "nowrap",
  };

  const activeLinkStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  };

  const hamburgerStyle = {
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 1000,
    fontSize: "24px",
    background: "#3A4750",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "4px",
    cursor: "pointer",
    display: isMobile ? "block" : "none",
  };

  return (
    <>
      {/* Hamburger Button */}
      {isMobile && (
        <button style={hamburgerStyle} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div style={sidebarStyle}>
        {isOpen && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default Adminmenu;
