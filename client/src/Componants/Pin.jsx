import { Box } from '@mui/material';
import React from 'react';

const Pin = () => {
    return (
        <Box sx={{display : {xs :"none" , md : "block"}  , width : "250px" , position : "absolute" , 
          }}>
            <img style={{width : "100%"}} src="../../Imgs/free.png" alt="" />
        </Box>
    );
}

export default Pin;
