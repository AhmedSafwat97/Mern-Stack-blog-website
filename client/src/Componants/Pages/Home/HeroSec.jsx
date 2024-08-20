import React from 'react';
import { Box, Button, IconButton, Typography } from "@mui/material";

const HeroSec = () => {
    return (
        <Box sx={{display : "flex" , justifyContent : "center" , m : "30px 0" , p : "20px 0"}}>
            <Box sx={{textAlign : "center" , p : "10px"}}>
                <Typography sx={{color : "gray"}}>Welcom To Our Blog</Typography>
                <Box>
                <Typography variant='h3' sx={{color : "#FFF"}}>
                Being
                <span style={{color : "#0DBADE"}}> unique </span>
                is better
                </Typography>
                
                <Typography variant='h3' sx={{color : "#FFF"}}>
                than being 
                <span style={{color : "#0DBADE"}} > perfect </span>
                </Typography>

                </Box>
            </Box>
        </Box>
    );
}

export default HeroSec;
