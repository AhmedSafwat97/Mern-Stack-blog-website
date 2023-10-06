import { Box, Typography } from "@mui/material";
import React from "react";
import BlogCard from "./BlogCard";

const TrendingBlog = () => {
  return (
    <Box sx={{display : "flex" , flexDirection : "column" , alignItems : "center" ,justifyContent : "center"}}>
      <Box sx={{ textAlign: "start" ,  width : "75%" , m : "20px 0 40px 0"}}>
          <Typography variant="h4" sx={{ color: "#0DBADE" }}>
            Featured Articles
          </Typography>
          <Typography sx={{ color: "gray" }}>
            Discover the most outstanding articles in all topics
          </Typography>
        </Box>
        <Box sx={{display : "flex" , justifyContent : "center" ,flexWrap : "wrap" , width : "75%"}}>
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        </Box>
    </Box>
  );
};

export default TrendingBlog;
