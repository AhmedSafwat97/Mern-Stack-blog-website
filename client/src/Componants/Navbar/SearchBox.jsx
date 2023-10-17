import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = ({setSearch , Search}) => {

  const Navigate = useNavigate()

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Trigger navigation or any other action here
      Navigate("/search");
    }
  };

  return (
    <>
      <Box sx={{ width: { xs: "70%", md: "400px" }, height: "40px" }}>
        <input
          type="Search"
          placeholder="Search for blogs "
          style={{
            backgroundColor: "#222F43",
            padding: "0 10px",
            height: "100%",
            width: "100%",
            color: "#FFF",
          }}
          onChange={(e) => {
            setSearch(e.target.value)
            console.log(Search);
          }}
          onKeyPress={handleKeyPress}
        />
      </Box>
    </>
  );
};

export default SearchBox;
