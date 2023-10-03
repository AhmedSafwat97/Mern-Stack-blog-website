import { Box, IconButton } from "@mui/material";
import React from "react";


const SearchBox = () => {
  return (
    <>
           
                <Box sx={{width : {xs : "70%" , md : "200px" } , height : "40px"  }}>
                  <input type="Search" placeholder="What do you Want ?"
                style={{backgroundColor : "#222F43" , padding : "0 10px" , height : "100%" , width : "100%" , color : "#FFF"}}
                />
                </Box>
             
    </>
 );
};

export default SearchBox;
