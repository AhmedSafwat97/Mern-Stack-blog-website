import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MailLink from "../../MainLink";
import { useNavigate } from "react-router-dom";

const Topics = () => {

  const queryKey = ["repoData"];
  const Navigate = useNavigate()

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/categories`); // Replace with your API endpoint
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading, isError } = useQuery(queryKey, fetchData);


  if (isLoading) {
    return  <Box
    sx={{
      justifyContent: "center",
      alignItems: "center",
      width : "100%"
    }}
  >
     <CircularProgress sx={{mx : "65px"}}/>
  </Box>
  }

  if (isError) {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: "30px 0",
        p: "20px 0",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ color: "#0DBADE" }}>
          Trending Topics
        </Typography>
        <Typography sx={{ color: "gray" , p  :"10px" }}>
          Discover the most outstanding articles in all topics
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap : "wrap" ,
          justifyContent : "center" ,
          m: "10px 0",
        }}
      >

      {data?.data.map((category) => (
          <Box
          key={category.name}
          sx={{
            m: "10px",
            p : "10px" ,
            borderRadius: "15px",
            bgcolor : "#222F43" ,
            cursor : "pointer"
          }}
          onClick={() => {
            Navigate(`/category/${category._id}`)
          }}
        >
          <Typography
            sx={{}}
          >
            {category.name}
          </Typography>
          {/* <Typography
            sx={{
              position: "absolute",
              left: "10px",
              bottom: "2px",
              color: "gray",
            }}
          >
            25 Articles
          </Typography> */}

          {/* <img
            src={category.image}
            alt=""
            style={{ width: "100%", height: "100%", borderRadius: "15px" }}
          /> */}
        </Box>
      ))}
      </Box>
    </Box>
  );
};

export default Topics;
