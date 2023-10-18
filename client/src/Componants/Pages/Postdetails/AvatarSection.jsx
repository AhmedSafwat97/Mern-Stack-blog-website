import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { red } from "@mui/material/colors";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import MailLink from "../../MainLink";

const AvatarSection = ({data}) => {


  const queryKey = ["userinfo" , data];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/auth/${data?.data.author}`); // Replace with your API endpoint
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data : Authordata } = useQuery(queryKey, fetchData);

  // console.log(Authordata);

const Navigate = useNavigate()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent:{ xs : "center"  , md : "space-between"},
        alignItems: "center",
        flexDirection : {xs : "column" , md : "row"} ,
        width: {xs : "90%" , md : "60%"},
        flexWrap : "wrap" 
      }}
    >
      <Box sx={{ display: "flex", mt: "10px" }}>
        <Avatar
          sx={{cursor : "pointer" ,width: "60px", height: "60px", bgcolor: red[500], mr: "10px" }}
          aria-label="profile"
        src={`${MailLink}/${Authordata?.data.profileimage}`}
        onClick={() => {
          Navigate(`/Profile/${Authordata?.data._id}`)
        }}
        >
          {Authordata?.data.FirstName[0]}
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: "18px", color: "#FFF" , ml : "10px" }}>
           {Authordata?.data.FirstName} {Authordata?.data.LastName}
          </Typography>
          <Typography sx={{ fontSize: "16px", color: "gray" , ml : "10px"  }}>
            {data?.data.postedAt}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display : "flex" , justifyContent : "center" , mt : {xs : "20px" , md : "0"} ,width : {xs : "100%" , md : "fit-content"} }}>
        <Typography sx={{color : "#0DBADE"}}>Share</Typography>
        <FacebookOutlinedIcon sx={{m : "0 10px"}} />
        <InstagramIcon  sx={{m : "0 10px"}}/>
        <LinkedInIcon sx={{m : "0 10px"}} />
      </Box>
    </Box>
  );
};

export default AvatarSection;
