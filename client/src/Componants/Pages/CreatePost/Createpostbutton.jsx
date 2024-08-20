import { Box, IconButton } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Createpostbutton = () => {
  const Navigate = useNavigate();

  return (
    <Box sx={{ position: "fixed", bottom: "20px", right: "20px" }}>
      <IconButton
        onClick={() => {
          Navigate("/Createnewpost");
        }}
        size="large"
        sx={{
          bgcolor: "red",
          ":hover": {
            bgcolor: "#222F43",
          },
        }}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default Createpostbutton;
