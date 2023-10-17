import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Componants/Pages/Home/Home";
import Navbar from "./Componants/Navbar/Navbar";
import Footer from "./Componants/Footer/Footer";
import Login from "./Componants/Pages/Login/Login";
import Signup from "./Componants/Pages/Login/SIgnup";
import CreateNewpost from "./Componants/Pages/CreatePost/CreateNewpost";
import PostDetails from "./Componants/Pages/Postdetails/PostDetails";
import Editinfo from "./Componants/Pages/Profile/Editinfo/Editinfo";
import Profile from "./Componants/Pages/Profile/Profile";
import Categories from "./Componants/Pages/categories/categories";
import { useState } from "react";
import SearchResult from "./Componants/Pages/Search/SearchResult";
import axios from "axios";
import MailLink from "./Componants/MainLink";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography } from "@mui/material";
// import Pin from "./Componants/Pin";

function App() {
  const [Search, setSearch] = useState("");

  const queryKey = ["posts"];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/post?page=1&limit=20`); // Replace with your API endpoint
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading , isError } = useQuery(queryKey, fetchData);

  return (
    <div
      className="App"
      style={{
        maxWidth: "1536px",
        margin: "0 auto",
        backgroundColor: "#0F172A",
      }}
    >

      {isLoading && (
        <Box
          sx={{
            maxWidth: "1536px",
            height: "100vh",
            backgroundColor: "#0F172A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         <Box>
           <Box sx={{ width : "100%" , display : "flex" , justifyContent : "center" }}>
            <CircularProgress />
           </Box>
           <Typography
              variant="h3"
              className="logo"
              sx={{ fontSize: "30px", fontWeight: "800", cursor: "pointer" }}
            >
              WriteWave
            </Typography>
         </Box>
        </Box>
      )}


{isError && (
        <Box
          sx={{
            maxWidth: "1536px",
            height: "100vh",
            backgroundColor: "#0F172A",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         <Box>
           <Typography
              variant="h3"
              className="logo"
              sx={{ fontSize: "25px", cursor: "pointer" }}
            >
              There is an Error!
            </Typography>
         </Box>
        </Box>
      )}


      {data && (
        <Router>
          <Navbar {...{ Search, setSearch }} />
          {/* <Pin /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<Signup />} />
            {/* <Route path="/forgotpass" element={<Profile/>} /> */}
            <Route path="/category/:id" element={<Categories />} />
            <Route path="/postDetails/:id" element={<PostDetails />} />
            <Route path="/Createnewpost" element={<CreateNewpost />} />
            <Route path="/editpost/:id" element={<CreateNewpost />} />
            <Route path="/Profile/:id" element={<Profile />} />
            <Route path="/editprofile/:id" element={<Editinfo />} />
            <Route
              path="/search"
              element={<SearchResult {...{ Search, setSearch }} />}
            />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
