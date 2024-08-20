import { Box } from "@mui/material";
import React from "react";
import DiscriptionSec from "./DiscriptionSec";
import CategoriesSec from "./CategoriesSec";
import SubscribeSec from "./SubscribeSec";
import Social from "./Social";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#222F43",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          m: "40px 0",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          width: "75%",
        }}
      >
        <DiscriptionSec />
        <CategoriesSec />
        <SubscribeSec />
      </Box>
      <Social />
    </Box>
  );
};

export default Footer;
