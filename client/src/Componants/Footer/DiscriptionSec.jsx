import { Box, Typography } from "@mui/material";
import React from "react";

const DiscriptionSec = () => {
  return (
    <Box sx={{color : "#FFF"}}>
      <Typography
        variant="h3"
        className="logo"
        sx={{ fontSize: "30px", fontWeight: "800", cursor: "pointer" , mb : "20px" }}
        //   onClick={() => {
        //     Navigat("/");
        //   }}
      >
        WriteWave
      </Typography>

      <Typography variant="h6" sx={{width : "300px" , fontSize : "12px" , mb : "20px"}}>
        When unknown prnto sans took a gallary and scrambled it to make specimen
        book not only five When unknown prnto sans took a gallary and scrambled
        it to make specimen book not only five
      </Typography>

    <Box>
        <Typography sx={{fontSize : "18px" , fontWeight : "600" }} >
        Adress
        </Typography>

        <Typography variant="h6" sx={{fontSize : "14px"}}>
        123 Main Street 
        Egypt
      </Typography>
    </Box>



    </Box>
  );
};

export default DiscriptionSec;
