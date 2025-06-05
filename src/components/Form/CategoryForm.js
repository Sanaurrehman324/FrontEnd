import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
