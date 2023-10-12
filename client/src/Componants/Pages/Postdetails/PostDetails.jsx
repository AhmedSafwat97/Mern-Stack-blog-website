import { Avatar, Box, IconButton, Paper, Typography } from "@mui/material";
import React from "react";
import AvatarSection from "./AvatarSection";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MailLink from "../../MainLink";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import jwtDecode from "jwt-decode";
import { red } from "@mui/material/colors";




const PostDetails = () => {

    const {id} = useParams()

    const queryKey = ["Post"];

    const Navigate = useNavigate()

    // Define a function to fetch the data from your API
    const fetchData = async () => {
      const response = await axios.get(`${MailLink}/api/v1/post/${id}`); // Replace with your API endpoint
      return response.data;
    };
  
    // Use the useQuery hook to fetch and manage the data
    const { data, isLoading, isError } = useQuery(queryKey, fetchData);
  
    console.log(data);
  
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error fetching data</div>;
    }


    // Define a function to fetch the data from your API
    const deleteData = () => {
     return axios.delete(`${MailLink}/api/v1/post/${id}`); // Replace with your API endpoint
    };
  
    // Use the useQuery hook to fetch and manage the data
  






    let user;

    const token = localStorage.getItem('token')
    
    if (token) {
      user = jwtDecode(token);
    }
  
  return (
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

      <Box sx={{ m: "30px 0" , display : "flex" }}>
        <Typography variant="h6" sx={{ fontSize : { xs : "22px" , md :"30px"} , color: "#0DBADE" }}>
          {data?.data.title}
        </Typography>

      { user?.userId === data.data.author ? ( <Box sx={{display : "flex" , ml : "10px"}}>
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
          src={data?.data.imageCover}

          alt="cover"
        />
      </Box>



    <Box sx={{display : "flex" , justifyContent : "center" ,width : {xs : "100%" , md : "60%"} , m: "30px 0"}}>
        <Typography sx={{  width : "90%" , textAlign : "start" , color : "gray"}}>
        {data?.data.content}
        </Typography>
    </Box>


      <Box sx={{border : "1px solid gray" , width : "50%"}} />

{/* comments Section */}

    <Box sx={{ width : { xs : "100%" , md :"60%" }, height : "200px"}}>

      <Typography variant="h4" sx={{color: "#0DBADE", fontWeight: "500"  , m: "20px"}}>Comments</Typography>

        <Box sx={{mt : "15px" , mb : "15px" , mx : "auto" , width : {xs : "90%" , md : "80%"} , display : "flex" , alignItems : "start"}}>
        <Box sx={{ display: "flex", mt: "10px" }}
              //  onClick={() => {
              //   Navigate(`/Profile/${posts.author._id}`)
              // }}
            >
              <Avatar
                sx={{ bgcolor: red[500], mr: "10px" }}
                aria-label="Author"
                // src={posts.author.profileimage}
              >
                R
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: "12px", color: "gray" }}>
                  {/* {posts.author.FirstName} {posts.author.LastName} */}
                  Ahmed Safwat
                </Typography>
                <Typography sx={{ fontSize: "10px", color: "gray" }}>
                  {/* {posts.postedAt} */}
                  3/1/2023
                </Typography>
              </Box>
            </Box>

            <Paper sx={{width : "70%" , fontSize : "14px" ,p : "10px"  , ml : "20px", minHeight : "100px" , borderRadius : "10px" , color : "gray" , bgcolor : "#222F43" }}>
            AHMed AHMed AHMedAHMedAHMedAHMed AHMed AHMed AHMed AHMed
            </Paper>
        </Box>
      </Box>

    </Box>
  );
};

export default PostDetails;
