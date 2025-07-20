import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Usermenu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarStyle = {
    width: "220px",
    backgroundColor: "#37474f",
    color: "white",
    padding: "20px 10px",
    height: "100vh",
    position: isMobile ? "fixed" : "sticky",
    top: 0,
    left: isMobile ? (showSidebar ? "0" : "-250px") : "0",
    zIndex: 1000,
    transition: "left 0.3s ease",
    display: "flex",
    flexDirection: "column",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 999,
    display: showSidebar ? "block" : "none",
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
    backgroundColor: "#546e7a",
  };

  const toggleBtnStyle = {
    backgroundColor: "#37474f",
    color: "white",
    border: "none",
    padding: "10px 15px",
    fontSize: "18px",
    cursor: "pointer",
    display: isMobile ? "block" : "none",
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 1001,
  };

  return (
    <>
      {/* Hamburger Button */}
      {isMobile && (
        <button onClick={() => setShowSidebar(!showSidebar)} style={toggleBtnStyle}>
          ☰
        </button>
      )}

      {/* Overlay when sidebar is open */}
      {isMobile && showSidebar && (
        <div style={overlayStyle} onClick={() => setShowSidebar(false)}></div>
      )}

      {/* Sidebar */}
      <div style={sidebarStyle}>
        <h4 style={titleStyle}>Dashboard</h4>

        <NavLink
          to="/dashboard/user/profile"
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {}),
          })}
        >
          Profile
        </NavLink>
      </div>
    </>
  );
};

export default Usermenu;
