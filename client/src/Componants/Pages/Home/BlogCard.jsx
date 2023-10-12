import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MailLink from "../../MainLink";

export default function BlogCard() {
  const Navigate = useNavigate();

  const queryKey = ["posts"];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(
      `${MailLink}/api/v1/post?page=1&limit=20`
    ); // Replace with your API endpoint
    return response.data;
  };
  
  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading, isError } = useQuery(queryKey, fetchData);

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data?.data.reverse().map((posts) => (
        <Card
          key={posts._id}
          sx={{
            width: "280px",
            bgcolor: "#222F43",
            m: "10px",
            p: "15px 10px",
            borderRadius: "15px",
            cursor: "pointer",
          }}
        >
          <CardMedia
            sx={{ borderRadius: "15px" }}
            component="img"
            height="170"
            image={posts.imageCover}
            alt="Paella dish"
          />

          <Box sx={{ display: "flex", ml: "10px" }}>
            <Typography sx={{ color: "gray", mt: "10px", mr: "10px" }}>
              {posts.category.name}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: "18px", fontWeight: "600", ml: "10px" }}
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
            <Box sx={{ display: "flex", mt: "10px" }}
               onClick={() => {
                Navigate(`/Profile/${posts.author._id}`)
              }}
            >
              <Avatar
                sx={{ bgcolor: red[500], mr: "10px" }}
                aria-label="Author"
                src={posts.author.profileimage}
              >
                R
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
            <Typography
                onClick={() => {
                  Navigate(`/postDetails/${posts._id}`);
                }}
            sx={{ color: "gray", fontSize: "12px" }}>
              Read More
            </Typography>
          </Box>
        </Card>
      ))}
    </>
  );
}
