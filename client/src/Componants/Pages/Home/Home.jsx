import React from 'react';
import { Box, Button, Card, IconButton } from "@mui/material";
import HeroSec from './HeroSec';
import TrendingBlog from './TrendingBlog';
import Topics from './Topics';
import RecentPosts from './RecentPosts';


const Home = () => {
    return (
      <Box>
        <HeroSec/>
        <RecentPosts/>
        <Topics/>
        <TrendingBlog/>
      </Box>
    );
}

export default Home;
