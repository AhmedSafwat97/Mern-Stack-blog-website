import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import MailLink from "../../MainLink";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecentPosts = () => {

  const navigate = useNavigate()
  const queryKey = ["posts"];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(
      `${MailLink}/api/v1/post?page=1&limit=20`
    ); // Replace with your API endpoint
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading } = useQuery(queryKey, fetchData);


  if (isLoading) {
    return   <Box
    sx={{
      justifyContent: "center",
      alignItems: "center",
    }}
  >
     <CircularProgress sx={{mx : "65px"}}/>
  </Box>
  }


  return (
    <Box>
      <Box sx={{ width: "75%", m: "auto" }}>
        <Box sx={{ textAlign: "center", m: "0px 0 40px 0" }}>
          <Typography variant="h4" sx={{ color: "#0DBADE" }}>
            Recent
          </Typography>
          <Typography sx={{ color: "gray" }}>
            Don't miss the latest trends
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
       {data?.data.slice(-4).reverse().map((posts) => (
            <Card
            key={posts._id}
            sx={{
              width: { xs: "280px", md: "400px" },
              bgcolor: "#222F43",
              m: "10px",
              p: "15px 10px",
              borderRadius: "15px",
              cursor: "pointer",
              ":hover" : {
                border : "2px solid #0DBADE"
              }
            }}
            onClick={() => {
              navigate(`/postDetails/${posts._id}`)
            }}
          >
            <CardMedia
              sx={{ borderRadius: "15px" }}
              component="img"
              height="170"
              image={posts.imageCover}
              alt="Post Cover"
            />
    
            <Box sx={{ display: "flex" }}>
              <Typography sx={{ color: "gray", mt: "10px", mr: "10px" }}>
                {posts.category.name}
              </Typography>
              <Typography sx={{ color: "gray", mt: "10px", mr: "10px" }}>
                {posts.category.createdAt}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", fontWeight: "600" }}
              >
                {posts.title}
              </Typography>
            </Box>
    
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", mt: "10px" }}>
                <Avatar
                  sx={{ bgcolor: red[500], mr: "10px" }}
                  aria-label="profile"
                  src={posts.author.profileimage}
                >
                  {posts.author.FirstName[0]}
                </Avatar>
                <Box>
                  <Typography sx={{ fontSize: "12px", color: "gray" }}>
                    {posts.author.FirstName} {posts.author.LastName}
                  </Typography>
                  <Typography sx={{ fontSize: "10px", color: "gray" }}>
                    {posts.postedAt}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ color: "gray", fontSize: "12px" }}>
                Read More
              </Typography>
            </Box>
          </Card>
       ))}
        </Box>
      </Box>
    </Box>
  );
};

export default RecentPosts;
