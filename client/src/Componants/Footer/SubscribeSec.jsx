import { Box, Button, Typography } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailOutlineIcon from '@mui/icons-material/MailOutline';



const SubscribeSec = () => {
  return (
    <Box sx={{ color: "#FFF" , mt : {xs : "20px" , md : "0"} ,  width :"300px"}}>
      <Typography variant="h6" sx={{mb : "20px"}}>NewsLetter</Typography>
      <Typography variant="h6" sx={{ fontSize: "12px" }}>
        Sign up to be first to receve the latest stories inspiring us, case
        studies, and industry news.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          mt: "10px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField label="Your name" variant="standard" />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <MailOutlineIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField label="Your Email" variant="standard" />
        </Box>
        <Button sx={{ m : "10px" ,bgcolor: "#0DAEE4", color: "#FFF" }}>Subscribe</Button>
      </Box>
    </Box>
  );
};

export default SubscribeSec;
