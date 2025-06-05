import { Select } from "antd";
import "antd/dist/reset.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Adminmenu from "../../components/Adminmenu";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [modelURL, setModelURL] = useState("");
  const [imageURLs, setImageURLs] = useState([""]);
  const [viewerURL, setViewerURL] = useState("");

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/api/category/get-category");
        if (data?.success) setCategories(data.category);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching categories");
      }
    };
    getAllCategory();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        price,
        category,
        size,
        photo: imageURLs.map((url) => ({ url })),
        modelURL,
        viewerURL,
      };
      const { data } = await axios.post("/api/product/create-product", productData);
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating product");
    }
  };

  // === STYLES ===
  const containerStyle = {
    display: "flex",
    gap: "40px",
    padding: "40px 20px",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  };

  const sidebarStyle = {
    width: "220px",
  };

  const formContainerStyle = {
    flexGrow: 1,
    maxWidth: "800px",
    background: "#fff",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    margin: "0 auto",
  };

  const inputStyle = {
    padding: "14px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "20px",
    backgroundColor: "#fdfdfd",
  };

  const buttonStyle = {
    backgroundColor: "#3A4750",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "all 0.3s ease",
  };

  const labelStyle = {
    fontWeight: "600",
    fontSize: "15px",
    marginBottom: "6px",
    color: "#333",
    display: "block",
  };

  const sectionTitle = {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "700",
    color: "#3A4750",
    marginBottom: "30px",
  };

  const addImageButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3A4750",
    marginBottom: "20px",
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <Adminmenu />
      </div>

      <div style={formContainerStyle}>
        <h2 style={sectionTitle}>Create Product</h2>

        {/* Category Select */}
        <label style={labelStyle}>Select Category</label>
        <Select
          bordered
          placeholder="Select a category"
          size="large"
          style={{ width: "100%", marginBottom: "20px" }}
          onChange={(value) => setCategory(value)}
        >
          {categories.length > 0 ? (
            categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))
          ) : (
            <Option disabled>No categories found</Option>
          )}
        </Select>

        {/* Image URL Inputs */}
        <label style={labelStyle}>Enter Image URLs (from Cloudinary)</label>
        {imageURLs.map((url, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Image URL ${index + 1}`}
            value={url}
            style={inputStyle}
            onChange={(e) => {
              const newURLs = [...imageURLs];
              newURLs[index] = e.target.value;
              setImageURLs(newURLs);
            }}
          />
        ))}
        <button
          type="button"
          style={addImageButtonStyle}
          onClick={() => setImageURLs([...imageURLs, ""])}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          + Add another image
        </button>

        {/* Text Inputs */}
        <input
          type="text"
          value={name}
          placeholder="Product Name"
          style={inputStyle}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          value={description}
          placeholder="Product Description"
          style={{ ...inputStyle, height: "100px" }}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          value={price}
          placeholder="Price"
          style={inputStyle}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          value={size}
          placeholder="Size"
          style={inputStyle}
          onChange={(e) => setSize(e.target.value)}
        />
        <input
          type="text"
          value={modelURL}
          placeholder="Model URL (optional)"
          style={inputStyle}
          onChange={(e) => setModelURL(e.target.value)}
        />
        <input
          type="text"
          value={viewerURL}
          placeholder="3D Viewer URL (optional)"
          style={inputStyle}
          onChange={(e) => setViewerURL(e.target.value)}
        />


        {/* Submit Button */}
        <button
          style={buttonStyle}
          onClick={handleCreate}
          onMouseOver={(e) => (e.target.style.opacity = "0.9")}
          onMouseOut={(e) => (e.target.style.opacity = "1")}
        >
          CREATE PRODUCT
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
