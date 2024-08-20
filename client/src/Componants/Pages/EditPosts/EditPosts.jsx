import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "react-dropzone-uploader/dist/styles.css"; // Import the styles
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import MailLink from "../../MainLink";
// import jwtDecode from "jwt-decode";
import ScrollToTop from "../../../ScrollToTop";
import EditFileUpload from "./EditFileUpload";

const EditPosts = () => {
  // const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [imageCover, setimage] = useState("");
  const [content, setContent] = useState("");
  const [category, setcategory] = useState("");
  const [Errormessage, setErrormessage] = useState(null);
  const [Loading, setLoading] = useState(false);
  const { id } = useParams();
  // console.log(id);

  const Navigate = useNavigate();
  const queryKey = ["repoData"];

  const QueryKey = ["postdata"];

  // const QueryKeypost = ["updatepostdata"];

  // let user;

  // const token = localStorage.getItem("token");

  // if (token) {
  //   user = jwtDecode(token);
  // }

  const updateImagePost = async () => {
    const formData = new FormData();
    formData.append("imageCover", imageCover); 
    try {
      const response = await axios.post(
        `${MailLink}/api/v1/post/imagecover/${id}`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      console.log("Response from PUT request:", response.data);
      Navigate("/"); // Use 'navigate' with a lowercase 'n'
    } catch (error) {
      console.error("Error updating Image", error);
    }
  };


  const updatePost = async () => {
    try {
      const response = await axios.put(
        `${MailLink}/api/v1/post/${id}`, // Make sure 'id' is defined
        {
          title : title ,
          content : content , 
          category : category
        },
      );
      console.log("Response from PUT request:", response.data);
      Navigate("/"); // Use 'navigate' with a lowercase 'n'
    } catch (error) {
      console.error("Error updating:", error);
    }
  };



  const fetchPostData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/post/${id}`);
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data: postData } = useQuery(QueryKey, fetchPostData);

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/categories`); // Replace with your API endpoint
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
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: "30px 0",
        }}
      >
        <Box sx={{ m: "30px 0" }}>
          {id && (
            <Typography variant="h4" sx={{ color: "#0DBADE" }}>
              Edit your Post
            </Typography>
          )}
        </Box>

        <Typography>{Errormessage}</Typography>
        <Box sx={{ width: { xs: "90%", md: "70%" } }}>
          <TextField
            fullWidth
            id="outlined-multiline-static"
            multiline
            placeholder="Title"
            sx={{ m: "10px 0" }}
            defaultValue={!id ? title : postData?.data.title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            InputProps={{
              style: { color: "#FFF" }, // Set the text color to red
            }}
          />

          <Box sx={{ display: "flex", m: "10px 0" }}>
            <EditFileUpload {...{ imageCover, setimage, postData, id }} />
          </Box>

          <FormControl sx={{ m: "20px 0" }} fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: " #FFF" }}
            >
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              style={{ color: " #FFF" }}
              id="demo-simple-select"
              value={ category  }
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            >
              {data?.data.map((cat) => (
                <MenuItem
                  key={cat._id}
                  value={cat._id}
                  sx={{ color: "black" }}
                  onClick={() => {
                    setcategory(cat._id);
                    //  console.log(category);
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
            multiline
            placeholder="Post Content"
            rows={8}
            sx={{ m: "10px 0" }}
            defaultValue={!id ? content : postData?.data.content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            InputProps={{
              style: { color: "#FFF" }, // Set the text color to red
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", m: "15px 0" }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              onClick={() => {
                if (imageCover !== "") {
                  updateImagePost()
                }
                if (category !== "") {
                  updatePost();
                  setLoading(true);
                } else {
                  window.scrollTo(0, 0);
                  setErrormessage("There is an error in the inputs");
                }
              }}
            >
              {Loading ? <CircularProgress /> : "Save"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EditPosts;
