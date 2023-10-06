import React from 'react';
import { Box, Button, IconButton, Typography } from "@mui/material";

const Topics = () => {
    return (
        <Box sx={{display : "flex" , flexDirection : "column" , alignItems : "center" , m : "30px 0" , p : "20px 0"}}>
            <Box sx={{textAlign : "center"}}>
        
                <Typography variant='h4' sx={{color : "#0DBADE"}}>
                Trending Topics
                </Typography>
                <Typography sx={{color : "gray"}}>
                Discover the most outstanding articles in all topics

                </Typography>
            </Box>

          <Box sx={{display : "flex" , flexDirection : {xs : "column" , md : "row"}, m : "10px 0"}}>
              <Box sx={{ m : "10px" ,width : "120px" , height : "160px" , borderRadius : "15px", position:"relative"}}>
                  <Typography sx={{position : "absolute" , left : "10px" ,bottom : "20px"}}>nature</Typography>
                  <Typography sx={{position : "absolute" , left : "10px" ,bottom : "2px", color :"gray"}}>25 Articles</Typography>
            
                  <img src='../../../../Imgs/blog1.jpg'  alt='' style={{width: "100%" , height : "100%" , borderRadius : "15px"}}/>
              </Box>
              <Box sx={{ m : "10px" ,width : "120px" , height : "160px" , borderRadius : "15px", position:"relative"}}>
                  <Typography sx={{position : "absolute" , left : "10px" ,bottom : "20px"}}>nature</Typography>
                  <Typography sx={{position : "absolute" , left : "10px" ,bottom : "2px", color :"gray"}}>25 Articles</Typography>
            
                  <img src='../../../../Imgs/blog1.jpg'  alt='' style={{width: "100%" , height : "100%" , borderRadius : "15px"}}/>
              </Box>
              <Box sx={{ m : "10px" ,width : "120px" , height : "160px" , borderRadius : "15px", position:"relative"}}>
                  <Typography sx={{position : "absolute" , left : "10px" ,bottom : "20px"}}>nature</Typography>
                  <Typography sx={{position : "absolute" , left : "10px" ,bottom : "2px", color :"gray"}}>25 Articles</Typography>
            
                  <img src='../../../../Imgs/blog1.jpg'  alt='' style={{width: "100%" , height : "100%" , borderRadius : "15px"}}/>
              </Box>
              <Box sx={{ m : "10px" ,width : "120px" , height : "160px" , borderRadius : "15px", position:"relative"}}>
                  <Typography sx={{position : "absolute" , left : "10px" ,bottom : "20px"}}>nature</Typography>
                  <Typography sx={{position : "absolute" , left : "10px" ,bottom : "2px", color :"gray"}}>25 Articles</Typography>
            
                  <img src='../../../../Imgs/blog1.jpg'  alt='' style={{width: "100%" , height : "100%" , borderRadius : "15px"}}/>
              </Box>
          </Box>
            
        </Box>
    );
}

export default Topics;
