import { Box } from "@mui/material";
import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Social = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        p: "10px 0",
      }}
    >
      <a href="https://ahmedsafwat-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" >Created by AhmedSafwat</a>

      <Box sx={{ display: "flex", justifyContent: "space-between" , mt : {xs : "10px" , md : "0"} }}>
        <Box sx={{ mr: "15px", display: "flex", alignItems: "center" }}>
          <a href="https://www.facebook.com/a7med.sfwat28/" target="_blank" rel="noopener noreferrer">
            <FacebookOutlinedIcon />
          </a>
          Facebook
        </Box>

        <Box sx={{ mr: "15px", display: "flex", alignItems: "center" }}>
          <a href="insta" target="_blank" rel="noopener noreferrer">
            <InstagramIcon />
          </a>
          Instagram
        </Box>

        <Box sx={{ mr: "15px", display: "flex", alignItems: "center" }}>
          <a href="https://www.linkedin.com/in/ahmad-safwat-07064223b/" target="_blank" rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
          LinkedIn
        </Box>
      </Box>
    </Box>
  );
};

export default Social;
