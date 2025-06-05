import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserMenu from "../components/Usermenu";
import { useAuth } from "../context/auth";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (auth?.user) {
      setName(auth.user?.username || auth.user?.name || "");
      setEmail(auth.user?.email || "");
      setPhone(auth.user?.contact || auth.user?.phone || "");
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "https://backendfyp-production.up.railway.app/api/auth/profile",
        {
          username: name,
          email,
          password,
          contact: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // ===== Styles Matching CreateProduct Layout =====
  const containerStyle = {
    display: "flex",
    padding: "20px",
    gap: "30px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  };

  const formContainerStyle = {
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto",
    background: "#fff",
    borderRadius: "8px",
    padding: "30px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "20px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  };

  const labelStyle = {
    fontWeight: "500",
    marginBottom: "8px",
    display: "block",
  };

  return (
    <div style={containerStyle}>
      <div style={{ width: "220px" }}>
        <UserMenu />
      </div>

      <div style={formContainerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Profile</h2>

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
            style={inputStyle}
          />

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email || ""}
            disabled
            style={{ ...inputStyle, backgroundColor: "#e9ecef", cursor: "not-allowed" }}
            placeholder="Your Email"
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            style={inputStyle}
          />

          <label style={labelStyle}>Phone</label>
          <input
            type="text"
            value={phone || ""}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Your Phone"
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
