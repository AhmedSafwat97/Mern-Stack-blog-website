import { Box, Typography } from "@mui/material";
import React from "react";
import BlogCard from "./BlogCard";
import PopularPost from "./PopularPost";
import LatestComment from "./LatestComments";


const TrendingBlog = () => {

  return (
    <Box sx={{display : "flex" , flexDirection : "column" , alignItems : "center" ,justifyContent : "center" , mb : "30px"}}>
      <Box sx={{ textAlign: "center" ,  width : "75%" , m : "20px 0 40px 0"}}>
          <Typography variant="h4" sx={{ color: "#0DBADE" }}>
            Featured Articles
          </Typography>
          <Typography sx={{ color: "gray" }}>
            Discover the most outstanding articles in all topics
          </Typography>
        </Box>
       <Box sx={{display : "flex" , justifyContent:"center" ,width : {xs : "90%" , md :"70%"}}}>
         <BlogCard />
         <Box sx={{width : "30%" , display : {xs : "none" , md : "block"}}}>
         <PopularPost/>
         <LatestComment/>
         </Box>
       </Box>
    </Box>
  );
};

export default TrendingBlog;
