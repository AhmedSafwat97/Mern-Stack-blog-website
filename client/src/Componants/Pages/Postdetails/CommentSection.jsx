import {
  Avatar,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { useNavigate } from "react-router-dom";
import MailLink from "../../MainLink";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';



const CommentSection = ({ id , user }) => {


  const queryKey = ["comments"];

  const queryClient = useQueryClient();


  const deletepostscomment = (deleteId) => {
    return axios.delete(`${MailLink}/api/v1/comments/${deleteId}`); // Replace with your API endpoint
   };

   const deleteMutation = useMutation(deletepostscomment, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });


  const [Comment, setComment] = useState("");

  const createdAt = new Date(); // Create a Date object for the current date and time
  // Convert the Date object to a formatted string (YYYY-MM-DD)
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const date = createdAt.toLocaleDateString(undefined, options);


  const submitcomment = async () => {
    try {
      await axios.post(`${MailLink}/api/v1/comments`, {
        commentText: Comment,
        date: date,
        user: user.userId,
        post: id
      });

      // console.log("Response from POST request:", response.data);

      // After a successful comment submission, invalidate the comments query
      queryClient.invalidateQueries(queryKey);

      setComment("");
    } catch (error) {
      // console.error("Error", error);
    }
  };


  const Navigate = useNavigate();

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/post/${id}/comments`); // Replace with your API endpoint
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading, isError } = useQuery(queryKey, fetchData);

  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }


  return (
    <Box
      sx={{
        width: { xs: "100%", md: "60%" },
        height: "fit-content",
        m: "20px 0",
      }}
    >
      <Box
        sx={{
          border: "1px solid gray",
          width: "80%",
          mx: "auto",
          opacity: "0.3",
        }}
      />

      <Box sx={{ width: { xs: "90%", md: "80%" }, mx: "auto", mt: "10px" }}>
        <Typography variant="h4" sx={{ color: "#0DBADE", fontWeight: "500" }}>
          Comments
        </Typography>
      </Box>

      {data?.data.map((comments) => (
        <Box
        key={comments._id}
          sx={{
            mt: "15px",
            mb: "15px",
            mx: "auto",
            width: { xs: "90%", md: "80%" },
            display: "flex",
            alignItems: "start",
          }}
        >
          <Box
            sx={{ display: "flex", mt: "10px" }}
             onClick={() => {
              Navigate(`/Profile/${comments.user._id}`)
            }}
          >
            <Avatar
              sx={{ bgcolor: red[500], mr: "10px" }}
              aria-label="Author"
              src={`${MailLink}/${comments.user.profileimage}`}
            >
              {comments.user.FirstName[0]}
            </Avatar>
            <Box  sx={{ width : "100px"}}>
              <Typography sx={{ fontSize: "12px", color: "gray" }}>
                {comments.user.FirstName} {comments.user.LastName}
              </Typography>
              <Typography sx={{ fontSize: "10px", color: "gray"  }}>
               {comments.user.createdAt.slice(0 , 10)}
              </Typography>
              <Typography sx={{ fontSize: "10px", color: "gray"  }}>
               {comments.user.createdAt.slice(14 , 20)}
              </Typography>
            </Box>
          </Box>

          <Paper
            sx={{
              width: "65%",
              fontSize: "14px",
              p: "15px",
              ml: "20px",
              borderRadius: "10px",
              bgcolor: "#222F43",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#0DBADE" }}>
              {comments.commentText}
            </Typography>
           <Box flexGrow="1"  />
            {user?.userId === comments.user._id && 
             <Button
             onClick={() => {
                 deleteMutation.mutate(comments._id);
             }}
             
             >
              <DeleteIcon/>
             </Button>
            
            }


          </Paper>
        </Box>
      ))}

      <Box
        sx={{
          border: "1px solid gray",
          width: "80%",
          mx: "auto",
          my: "20px",
          opacity: "0.3",
        }}
      />

      <Box
        sx={{ width: { xs: "90%", md: "80%" }, mx: "auto", height: "200px" }}
      >
        <Typography sx={{ color: "#0DBADE", mb: "20px" }}>
          Leave Your Comment
        </Typography>
        {user ? (
           <Box sx={{ width: "100%" }}>
           <TextField
             fullWidth
             multiline
             placeholder="Write a comment"
             value={Comment}
             rows={3}
             sx={{ m: "10px 0", bgcolor: "#222F43" }}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              InputProps={{
                style: { color: '#FFF' } // Set the text color to red
              }}
           />
           <Box sx={{ display: "flex", justifyContent: "center", m: "15px 0" }}>
             <Box sx={{ flexGrow: 1 }} />
             <Button
               variant="contained"
                onClick={() => {
                  if ( Comment !== "" ) {
                   submitcomment()
                  }
                }}
             >
               Post Comment
             </Button>
           </Box>
         </Box>
        ) : (



          <Box sx={{height : "100px" , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
          
          <Button 
          
          onClick={() => {
            Navigate("/login")
          }}
          sx={{bgcolor : "#0DAEE4" , color : "#FFF" , borderRadius : "10px" , height : "fit-content" , p : "10px"}} >Sign In To Leave Your comment</Button>

          </Box>


        )}
       
      </Box>
    </Box>
  );
};

export default CommentSection;
