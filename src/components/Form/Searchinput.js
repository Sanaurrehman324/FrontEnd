import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data.results });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f1f1f1",
      borderRadius: "999px",
      px: 2,
      py: 0.5,
      boxShadow: "inset 0 0 0 1px #e0e0e0",
      width: { xs: "100%", sm: "250px", md: "300px" },
    }}>
      <InputBase
        placeholder="Home Interior"
        value={values.keyword}
        onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        sx={{
          ml: 1,
          flex: 1,
          fontSize: "0.9rem",
          color: "#6e6e6e",
        }}
        inputProps={{ "aria-label": "search" }}
      />
      <IconButton type="submit" sx={{ p: "6px" }} aria-label="search">
        <SearchIcon sx={{ color: "#333" }} />
      </IconButton>
    </Box>
  );
};

export default SearchInput;
