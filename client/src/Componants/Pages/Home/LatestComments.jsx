import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import MailLink from "../../MainLink";
import { useQuery } from "@tanstack/react-query";
import { red } from "@mui/material/colors";

const LatestComment = () => {

  const queryKey = ["comments"];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/comments`);
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading } = useQuery(queryKey, fetchData);

  if (isLoading) {
    return <Box
    sx={{
      justifyContent: "center",
      alignItems: "center",
      width : "100%"
    }}
  >
     <CircularProgress sx={{mx : "65px"}}/>
  </Box>
  }

  return (
    <Box sx={{ p: "10px", borderRadius: "15px", bgcolor: "#222F43" , mt : "7px" }}>

<Typography variant="h6" sx={{ color: "#0DBADE" }}>
           Latest Comments
          </Typography>

<Box sx={{ borderTop : "3px solid #0DBADE" , width : "30%" , mb : "20px"  }}   />



      {data?.data.reverse().slice(-3)
        .map((comment) => (
          <Box key={comment._id} sx={{cursor : "pointer"}}>
              <Typography
                  variant="h6"
                  sx={{ fontSize: "12px", mb: "10px", fontWeight: "400" , color : "gray" }}
                >
                  {comment.commentText }
                </Typography>
            <Box sx={{ display: "flex", m: "10px 0" }}>
              <Avatar
                sx={{ bgcolor: red[500], mr: "10px" }}
                aria-label="Author"
                src={`${MailLink}/${comment.user.profileimage}`}
              >
                {comment.user.FirstName[0]}
              </Avatar>

              <Box>
             <Box sx={{display : "flex"}}>
             <Typography sx={{ fontSize: "10px", color: "gray" , mr : "10px" }}>
                     {comment.user.FirstName}
                   </Typography>


                   <Typography sx={{ fontSize: "10px", color: "gray" , mr : "10px" }}>
                     {comment.createdAt.slice(0, 10)}
                   </Typography>
                   <Typography sx={{ fontSize: "10px", color: "gray" }}>
                     {comment.createdAt.slice(14, 20)}
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

export default LatestComment;
