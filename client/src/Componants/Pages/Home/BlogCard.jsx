import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MailLink from "../../MainLink";
import { useState } from "react";

export default function BlogCard() {



  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // c = 2 , p per page = 3 , indexLast = 2 * 3 = 6 , indexoffirst = 6 - 3 = 3
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);

  };

  const Navigate = useNavigate();

  const queryKey = ["posts"];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(
      `${MailLink}/api/v1/post?page=${currentPage}&limit=4`
    ); 
    return response.data;
  };
  
  // Use the useQuery hook to fetch and manage the data
  const { data} = useQuery(queryKey, fetchData);

  return (
    <Box sx={{display : "block" ,width : {xs : "100%"  ,md :"75%"}}}>
    <Box sx={{display : "flex" , justifyContent : "center" ,flexWrap : "wrap" , width : "90%" , mx : "auto"}}>
      {data?.data.reverse().slice(indexOfFirstPost, indexOfLastPost).map((posts) => (
        <Card
          key={posts._id}
          sx={{
            width: "280px",
            bgcolor: "#222F43",
            m: "10px",
            p: "15px 10px",
            borderRadius: "15px",
            cursor: "pointer",
            ":hover" : {
              border : "2px solid #0DBADE"
            }
          }}
        >
          <CardMedia
            sx={{ borderRadius: "15px" }}
            component="img"
            height="170"
            image={`${MailLink}/${posts.imageCover}`}
            alt="Post Cover"
            onClick={() => {
              Navigate(`/postDetails/${posts._id}`);
            }}
          />

          <Box sx={{ display: "flex", ml: "10px" }}>
            <Typography sx={{ color: "gray", mt: "10px", mr: "10px" }}>
              {posts.category.name}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: "18px", height : "50px", my : "auto" ,fontWeight: "600", ml: "10px" }}
            >
              {posts.title.slice(0 , 30)}
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
                src={`${MailLink}/${posts.author.profileimage}`}
                
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
      </Box>
      <Box sx={{p : "10px"}}>
      <Pagination
       count={Math.ceil(data.data.length / postsPerPage)}
       page={currentPage}
       onChange={handlePageChange}
       color="secondary"
       />
      </Box>
    </Box>
  );
}
