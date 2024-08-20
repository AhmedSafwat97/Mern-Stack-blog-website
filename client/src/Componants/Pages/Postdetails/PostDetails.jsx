import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import React from "react";
import AvatarSection from "./AvatarSection";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MailLink from "../../MainLink";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import jwtDecode from "jwt-decode";
import CommentSection from "./CommentSection";
import ScrollToTop from "../../../ScrollToTop"



const PostDetails = () => {

    const {id} = useParams()

    const queryKey = ["Post" , id];

    const Navigate = useNavigate()

    // Define a function to fetch the data from your API
    const fetchData = async () => {
      const response = await axios.get(`${MailLink}/api/v1/post/${id}`); // Replace with your API endpoint
      return response.data;
    };
  
    // Use the useQuery hook to fetch and manage the data
    const { data, isLoading } = useQuery(queryKey, fetchData);
  
  
  
    if (isLoading) {
      return   <Box
      sx={{
        justifyContent: "center",
        display : "flex",
        width : "100%"
      }}
    >
       <CircularProgress sx={{mx : "65px"}}/>
    </Box>
    }

    // Define a function to fetch the data from your API
    const deleteData = () => {
     return axios.delete(`${MailLink}/api/v1/post/${id}`); // Replace with your API endpoint
    };  


    let user;

    const token = localStorage.getItem('token')
    
    if (token) {
      user = jwtDecode(token);
    }
  
  return (
  <>
  <ScrollToTop/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: "30px 0",
        }}
      >
        {/* Avatar Section */}
        <AvatarSection {...{data}} />
    
        <Box sx={{ m: "30px 0" , display : "flex"  ,width : { xs : "90%" , md :"50%" } , alignItems : "center" ,justifyContent : "center" , flexDirection : {xs : "column" , md : "row"}}}>
          <Typography variant="h6" sx={{fontSize : { xs : "22px" , md :"30px"} , color: "#0DBADE" , textAlign :{xs : "center" , md : "start"}}}>
            {data?.data.title}
          </Typography>
    
        { user?.userId === data?.data.author ? ( <Box sx={{display : "flex" , ml : "10px"}}>
          <IconButton
          onClick={() => {
            Navigate(`/editpost/${data?.data._id}`)
          }}
          
          ><EditIcon/></IconButton>
    
    
          <IconButton
          onClick={() => {
            deleteData()
            Navigate("/")
          }}
          ><DeleteIcon sx={{
            ":hover" : {
              bgcolor : "red"
            }
          }} /></IconButton>
        </Box>  ) : null
        }
    
        </Box>
    
    
    
        <Box sx={{ width: {xs : "90%" , md : "50%"}, height: "300px", borderRadius: "15px" }}>
          <img
            style={{ width: "100%", height: "100%", borderRadius: "15px" }}
            src={`${MailLink}/${data?.data.imageCover}`}
    
            alt="cover"
          />
        </Box>
    
    
    
      <Box sx={{display : "flex" , justifyContent : "center" ,width : {xs : "100%" , md : "60%"} , m: "30px 0"}}>
          <Typography sx={{  width : "90%" , textAlign : "start" , color : "gray"}}>
          {data?.data.content}
          </Typography>
      </Box>
    
        
    {/* comments Section */}
    
          <CommentSection {...{id , user}} />
    
      </Box>
  </>
  );
};

export default PostDetails;
