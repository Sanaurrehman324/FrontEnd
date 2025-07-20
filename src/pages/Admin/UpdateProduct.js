import { Select } from "antd";
import "antd/dist/reset.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Adminmenu from "../../components/Adminmenu";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [modelURL, setModelURL] = useState("");
  const [productPhotos, setProductPhotos] = useState([]);
  const [id, setId] = useState("");
  const [viewerURL, setViewerURL] = useState("");

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

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#d9534f",
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

  // Fetch single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`https://backend-production-8ea6.up.railway.app/api/product/get-product/${params.slug}`);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setSize(data.product.size);
      setCategory(data.product.category._id);
      setProductPhotos(data.product.photo); // [{ url }]
      setModelURL(data.product.modelURL || "");
      setViewerURL(data.product.viewerURL || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("https://backend-production-8ea6.up.railway.app/api/category/get-category");
        if (data?.success) setCategories(data.category);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong while getting categories");
      }
    };
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name,
        description,
        price,
        size,
        modelURL,
        viewerURL,
        category,
        photo: productPhotos.filter(p => p.url.trim() !== ""), // clean empty
      };
      const { data } = await axios.put(`https://backend-production-8ea6.up.railway.app/api/product/update-product/${id}`, productData);
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.prompt("Are you sure you want to delete this product?");
      if (!answer) return;
      await axios.delete(`https://backend-production-8ea6.up.railway.app/api/product/delete-product/${id}`);
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handlePhotoChange = (index, value) => {
    const updatedPhotos = [...productPhotos];
    updatedPhotos[index] = { url: value };
    setProductPhotos(updatedPhotos);
  };

  const addPhotoInput = () => {
    setProductPhotos([...productPhotos, { url: "" }]);
  };

  const removePhotoInput = (index) => {
    const updated = productPhotos.filter((_, i) => i !== index);
    setProductPhotos(updated);
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <Adminmenu />
      </div>

      <div style={formContainerStyle}>
        <h2 style={sectionTitle}>Update Product</h2>

        {/* Category Select */}
        <label style={labelStyle}>Select Category</label>
        <Select
          bordered
          placeholder="Select a category"
          size="large"
          style={{ width: "100%", marginBottom: "20px" }}
          value={category}
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

        {/* Image URLs with remove buttons */}
        <label style={labelStyle}>Product Image URLs</label>
        {productPhotos.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input
              type="text"
              value={p.url}
              placeholder={`Photo URL ${i + 1}`}
              style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
              onChange={(e) => handlePhotoChange(i, e.target.value)}
            />
            {productPhotos.length > 1 && (
              <button
                type="button"
                onClick={() => removePhotoInput(i)}
                style={{
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          style={addImageButtonStyle}
          onClick={addPhotoInput}
        >
          + Add another image
        </button>

        {/* Other Inputs */}
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
          placeholder="Viewer URL (optional)"
          style={inputStyle}
          onChange={(e) => setViewerURL(e.target.value)}
        />

        {/* Buttons */}
        <button style={buttonStyle} onClick={handleUpdate}>
          UPDATE PRODUCT
        </button>
        <button style={deleteButtonStyle} onClick={handleDelete}>
          DELETE PRODUCT
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;
