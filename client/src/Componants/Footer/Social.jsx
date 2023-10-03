import { Box, Typography } from '@mui/material';
import React from 'react';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const Social = () => {
    return (
        <Box sx={{display : "flex" , flexDirection : {xs : "column" , md : "row"} ,justifyContent : "space-around", alignItems : "center" ,width : "100%" , p : "10px 0" }}>
                <Typography>Created by AhmedSafwat</Typography>
    
        <Box sx={{display : "flex" , justifyContent :  "space-between" }}>
            <Box sx={{ mr : "15px", display : "flex" , alignItems : "center"}}>
            <FacebookOutlinedIcon/>
            Facebook
            </Box>

            <Box sx={{ mr : "15px", display : "flex" , alignItems : "center"}}>
            <InstagramIcon/>
            Instagram
            </Box>

            <Box sx={{ mr : "15px", display : "flex" , alignItems : "center"}}>
            <LinkedInIcon/>
            LinkedIn
            </Box>
        </Box>
        
        
        
        </Box>
    );
}

export default Social;
