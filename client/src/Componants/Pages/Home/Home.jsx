import React from "react";
import { Box, Button, Card, IconButton } from "@mui/material";
import HeroSec from "./HeroSec";
import TrendingBlog from "./TrendingBlog";
import Topics from "./Topics";
import RecentPosts from "./RecentPosts";
import Createpostbutton from "../CreatePost/Createpostbutton";
import ScrollToTop from "../../../ScrollToTop";
import jwtDecode from "jwt-decode";

const Home = () => {
  let user;

  const token = localStorage.getItem("token");

  if (token) {
    user = jwtDecode(token);
  }

 

  return (
    <Box>
      <ScrollToTop />
      <HeroSec />
      <RecentPosts />
      <Topics />
      <TrendingBlog />

      {user && <Createpostbutton />}
    </Box>
  );
};

export default Home;
