import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm.js";
import { Modal } from "antd";
import Adminmenu from "../../components/Adminmenu";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Create Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/category/create-category", { name });
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Get All Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete Category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/category/delete-category/${pId}`);
      if (data.success) {
        toast.success("Category deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div
  style={{
    display: "flex",
    minHeight: "100vh",
    background: "#f1f2f6",
  }}
>
  <Adminmenu />

  <div
    style={{
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "60px 30px", // increased padding
    }}
  >
    <div
      className="shadow rounded"
      style={{
        background: "white",
        maxWidth: "900px",
        width: "100%",
        padding: "40px 30px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      {/* Heading */}
      <div className="text-center mb-4">
        <h2 className="fw-bold" style={{ color: "#333" }}>
          Manage Categories
        </h2>
        <p className="text-muted">
          Create, edit, and organize your product categories easily.
        </p>
      </div>

      {/* Form */}
      {/* Form */}
<form
  onSubmit={handleSubmit}
  className="d-flex flex-column flex-md-row align-items-center mb-4"
  style={{
    marginBottom: "40px",
    gap: "16px", // ✅ Adds space between input and button
    flexWrap: "wrap", // ✅ Ensures layout adjusts on smaller screens
  }}
>
  <input
    type="text"
    className="form-control"
    placeholder="Enter new category"
    value={name}
    onChange={(e) => setName(e.target.value)}
    style={{
      borderRadius: "10px",
      padding: "12px",
      border: "1px solid #ddd",
      fontSize: "15px",
      background: "#fafafa",
      flex: "1",
      minWidth: "250px",
    }}
  />
  <button
    type="submit"
    style={{
      background: "#3A4750",
      color: "white",
      border: "none",
      padding: "12px 24px",
      fontWeight: "600",
      fontSize: "16px",
      borderRadius: "10px",
      cursor: "pointer",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      transition: "all 0.3s",
      whiteSpace: "nowrap",
    }}
  >
    Add
  </button>
</form>


      {/* Table */}
      <div
        className="table-responsive rounded"
        style={{
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          marginBottom: "30px",
        }}
      >
        <table className="table align-middle mb-0">
          <thead style={{ background: "#3A4750", color: "white" }}>
            <tr>
              <th style={{ padding: "15px" }}>Category Name</th>
              <th style={{ padding: "15px", width: "200px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((cat) => (
              <tr key={cat._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "15px" }}>{cat.name}</td>
                <td style={{ padding: "15px", display: "flex", gap: "10px" }}>
  <button
    className="btn btn-sm"
    onClick={() => {
      setVisible(true);
      setSelected(cat);
      setUpdatedName(cat.name);
    }}
    style={{
      borderRadius: "8px",
      fontSize: "14px",
      padding: "6px 12px",
      background: "#3A4750",
      color: "white",
      border: "none",
    }}
  >
    Edit
  </button>
  <button
    className="btn btn-sm"
    onClick={() => handleDelete(cat._id)}
    style={{
      borderRadius: "8px",
      fontSize: "14px",
      padding: "6px 12px",
      background: "#d9534f",
      color: "white",
      border: "none",
    }}
  >
    Delete
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title="Edit Category"
      >
        <form onSubmit={handleUpdate} className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Update category name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            style={{
              borderRadius: "10px",
              padding: "12px",
              border: "1px solid #ddd",
              background: "#fafafa",
              fontSize: "15px",
            }}
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(135deg, #4d79f6, #5ec7f8)",
              color: "white",
              border: "none",
              padding: "12px",
              fontWeight: "600",
              fontSize: "16px",
              borderRadius: "10px",
              cursor: "pointer",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.background = "linear-gradient(135deg, #3a66f3, #4db7f6)")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "linear-gradient(135deg, #4d79f6, #5ec7f8)")
            }
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  </div>
</div>

  );
};

export default CreateCategory;
