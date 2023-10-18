import { Avatar, Box, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import MailLink from "../../MainLink";
import { useQuery } from "@tanstack/react-query";
import { red } from "@mui/material/colors";

const PopularPost = () => {
  const Navigate = useNavigate();

  const queryKey = ["posts"];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/post`);
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading } = useQuery(queryKey, fetchData);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: "10px", borderRadius: "15px", bgcolor: "#222F43" , mt : "7px" }}>

<Typography variant="h6" sx={{ color: "#0DBADE" }}>
           Popular Posts
          </Typography>

<Box sx={{ borderTop : "3px solid #0DBADE" , width : "30%" , mb : "20px"  }}   />



      {data?.data
        .reverse()
        .slice(0, 4)
        .map((posts, index) => (
          <Box key={posts._id} sx={{cursor : "pointer"}}
          onClick={() => {
            Navigate(`/postDetails/${posts._id}`)
          }}
          
          >
            <Box sx={{ display: "flex", m: "10px 0" }}>
              <Avatar
                sx={{ bgcolor: red[500], mr: "10px" }}
                aria-label="Author"
                src={`${MailLink}/${posts.author.profileimage}`}
              >
                {posts.author.FirstName[0]}
              </Avatar>

              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontSize: "12px", mb: "10px", fontWeight: "400" }}
                >
                  {posts.title.slice(0, 40)}
                </Typography>

             <Box sx={{display : "flex"}}>
                   <Typography sx={{ fontSize: "10px", color: "gray" , mr : "10px" }}>
                     {posts.createdAt.slice(0, 10)}
                   </Typography>
                   <Typography sx={{ fontSize: "10px", color: "gray" }}>
                     {posts.createdAt.slice(14, 20)}
                   </Typography>
             </Box>
              </Box>
            </Box>

            <Box
              sx={{
                border: "1px solid Gray",
                ml: "20%",
                width: "75%",
                opacity: "0.2",
              }}
            />
          </Box>
        ))}
    </Box>
  );
};

export default PopularPost;
