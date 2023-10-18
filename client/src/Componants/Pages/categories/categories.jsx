import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Pagination,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MailLink from "../../MainLink";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ScrollToTop from "../../../ScrollToTop";

const Categories = () => {
  const { id } = useParams();

  const Navigate = useNavigate();

  const queryKey = ["postscategory" , id];
  const QueryKey = ["category" , id];

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // c = 2 , p per page = 3 , indexLast = 2 * 3 = 6 , indexoffirst = 6 - 3 = 3
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  // Define a function to fetch the data from your API
  const fetchCatedata = async () => {
    const response = await axios.get(`${MailLink}/api/v1/categories/${id}`);
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data: category } = useQuery(QueryKey, fetchCatedata);


  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(
      `${MailLink}/api/v1/categories/${id}/posts`
    );
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data } = useQuery(queryKey, fetchData);


  return (
    <>
      <ScrollToTop />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ mt: "20px", width: { xs: "90%", md: "70%" }, p: "10px 0" }}>
          <Typography variant="h4" sx={{ fontWeight: "600" }}>
            {category?.data.name}
          </Typography>
          <Typography
            sx={{ mt: "20px", width: { xs: "90%", md: "50%" }, color: "gray" }}
          >
            {category?.data.decription}
          </Typography>
        </Box>

        <Box
          sx={{
            border: "1px solid gray",
            width: "70%",
            mx: "auto",
            opacity: "0.3",
            mt: "20px",
            mb: "20px",
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            width: { xs: "90%", md: "70%" },
            justifyContent: "center",
          }}
        >
          {data?.data
            .reverse()
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((posts) => (
              <Card
                key={posts._id}
                sx={{
                  width: { xs: "280px", md: "450px" },
                  bgcolor: "#222F43",
                  m: "10px",
                  p: "15px 10px",
                  borderRadius: "15px",
                  cursor: "pointer",
                  ":hover": {
                    border: "2px solid #0DBADE",
                  },
                }}
                onClick={() => {
                  Navigate(`/postDetails/${posts._id}`);
                }}
              >
                <CardMedia
                  sx={{ borderRadius: "15px" }}
                  component="img"
                  height="170"
                  image={`${MailLink}/${posts.imageCover}`}
                  alt="Paella dish"
                />

                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ color: "gray", mt: "10px", mr: "10px" }}>
                    {posts.category.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: "18px", fontWeight: "600" }}
                  >
                    {posts.title.slice(0, 30)}
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
                      src={`${MailLink}/${posts.author.profileimage}`}
                    >
                      {posts.author.FirstName[0]}A
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


        {data?.data.length === 0 &&
        
        <Box>
          <Typography>There are no articles for this category now!</Typography>
        </Box>
        
        }

        <Box sx={{ p: "10px" }}>
          <Pagination
            count={data ? Math.ceil(data?.data.length / postsPerPage) : 1}
            page={currentPage}
            onChange={handlePageChange}
            color="secondary"
          />
        </Box>
      </Box>
    </>
  );
};

export default Categories;
