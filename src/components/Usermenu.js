import React from "react";
import { NavLink } from "react-router-dom";

const Usermenu = () => {
  const sidebarStyle = {
    width: "220px",
    backgroundColor: "#37474f",
    color: "white",
    padding: "20px 10px",
    height: "100vh",
    position: "sticky",
    top: 0,
    display: "flex",
    flexDirection: "column",
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

  return (
    <div style={sidebarStyle}>
      <h4 style={titleStyle}>Dashboard</h4>

      <NavLink
        to="/dashBoard/user/profile"
        style={({ isActive }) => ({
          ...linkStyle,
          ...(isActive ? activeLinkStyle : {}),
        })}
      >
        Profile
      </NavLink>
    </div>
  );
};

export default Usermenu;
