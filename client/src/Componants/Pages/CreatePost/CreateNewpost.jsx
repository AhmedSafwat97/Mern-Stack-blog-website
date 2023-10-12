import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css"; // Import the styles
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FileUpload from "./FileUpload ";
import { useNavigate, useParams } from "react-router-dom";
import MailLink from "../../MainLink";
import jwtDecode from "jwt-decode";
import ScrollToTop from "../../../ScrollToTop";

const CreateNewpost = () => {
  // const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [imageCover, setimage] = useState("");
  const [content, setContent] = useState("");
  const [category, setcategory] = useState("");
  const [Errormessage, setErrormessage] = useState(null);


  const {id} = useParams()
  console.log(id);

  const Navigate = useNavigate();
  const queryKey = ["repoData"];

  let user;

  const token = localStorage.getItem("token");

  if (token) {
    user = jwtDecode(token);
  }

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/categories`); // Replace with your API endpoint
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading, isError } = useQuery(queryKey, fetchData);

  // console.log(data);

  const createdAt = new Date(); // Create a Date object for the current date and time
  // Convert the Date object to a formatted string (YYYY-MM-DD)
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };

  const postedAt = createdAt.toLocaleDateString(undefined, options);

  // Get the time components
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();

  // Create a time string in HH:MM:SS format
  const posttime = `${hours}:${minutes}`;

  const submitposts = async () => {
    const formData = new FormData();
    formData.append("imageCover", imageCover); // Append the file
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("author", user.userId);
    formData.append("postedAt", postedAt);
    formData.append("posttime", posttime);

    try {
      const response = await axios.post(
        `${MailLink}/api/v1/post`,
        formData, // Send formData instead of just { title }
        {
          headers: {
            "Content-Type": "multipart/form-data", // Specify content type for file upload
          },
        }
      );
      console.log("Response from POST request:", response.data);
      Navigate("/");
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrormessage(error)
    }
  };

  console.log(user.userId);

  return (
   <>
       <ScrollToTop />
     <Box
       sx={{
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         flexDirection: "column",
         p: "30px 0",
       }}
     >
       <Box sx={{ m: "30px 0" }}>
        {id ? (
           <Typography variant="h4" sx={{ color: "#0DBADE" }}>
           Edit your Post
         </Typography>
        ) : (
          <Typography variant="h4" sx={{ color: "#0DBADE" }}>
           Create New Post
         </Typography>
        ) }
       </Box>
       
       <Typography>{Errormessage}</Typography>
       <Box sx={{ width: { xs: "90%", md: "70%" } }}>
         <FormControl
           sx={{ width: "100%", borderRadius: "10px", m: "15px 0" }}
           variant="filled"
         >
           <InputLabel sx={{ color: "#FFF" }}>Title</InputLabel>
           <OutlinedInput
             label="Title"
             value={title}
             onChange={(e) => {
               setTitle(e.target.value);
               console.log(title);
             }}
           />
         </FormControl>
    
         <Box sx={{ display: "flex", m: "10px 0" }}>
           <FileUpload {...{ imageCover, setimage }} />
         </Box>
    
         <FormControl sx={{ m: "20px 0" }} fullWidth>
           <InputLabel id="demo-simple-select-label">Category</InputLabel>
           <Select
             labelId="demo-simple-select-label"
             id="demo-simple-select"
             value={category}
             label="category"
             onChange={(e) => {
               setcategory(e.target.value);
             }}
           >
             {data?.data.map((cat) => (
               <MenuItem
                 key={cat._id}
                 value={cat._id}
                 onClick={() => {
                   setcategory(cat._id);
                   console.log(category);
                 }}
               >
                 {cat.name}
               </MenuItem>
             ))}
           </Select>
         </FormControl>
    
         <TextField
           fullWidth
           id="outlined-multiline-static"
           label="Post Content"
           multiline
           placeholder="Post Content"
           rows={8}
           sx={{ m: "10px 0" }}
           onChange={(e) => {
             setContent(e.target.value);
           }}
         />
    
         <Box sx={{ display: "flex", justifyContent: "center", m: "15px 0" }}>
           <Box sx={{ flexGrow: 1 }} />
           <Button
             variant="contained"
             onClick={() => {
               if (title !== "" && category !== "" && content !== "" ) {
                submitposts();
               } else {
                window.scrollTo(0, 0);
                setErrormessage("There is an error in the inputs")
               }
             }}
           >
             Send
           </Button>
         </Box>
       </Box>
     </Box>
   </>
  );
};

export default CreateNewpost;
