import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./Nav.css"

const MobileMenu = ({ShowMobileMenu}) => {

  const [ShowNestedList, setShowNestedList] = useState(false);
  const pages = [
    { Name: "Home", path: "/" },
    { Name: "Courses", path: "Courses" , Icon : ShowNestedList === true ? (
      <ArrowUpwardIcon sx={{ fontSize: "15px" }} />
    ) : (
      <ArrowDownwardIcon sx={{ fontSize: "15px" }} />
    )},
    { Name: "About us", path: "about" },
    { Name: "Contact", path: "Contact" },
  ];

  const category = [
    { Name: "Home", path: "/" },
    { Name: "Courses", path: "Courses" , Icon : <AddIcon/> },
    { Name: "About us", path: "about" },
    { Name: "Contact", path: "Contact" },
  ];

  return (
   <>
   {ShowMobileMenu &&
    <Box
    className="mobileMenu"
    sx={{
      display: { xs: "block", md: "none" },
      width: "100%",
      height: "fit-content",
    }}
  >
    {pages.map((page) => (
   <>
   { page.Name === "Courses" ? (
    <>
         <Button
         sx={{
           display: "flex",
           alignItems: "center",
           justifyContent : "space-between" ,
           width: "100%",
           height: "30px",
           borderBottom: "1px solid blue",
           color : "black" ,
           p : "10px"
      
         }}
         onClick={() => {
          setShowNestedList(!ShowNestedList)
         }}
       >
         {page.Name}
      
         <IconButton>
             {page.Icon}
         </IconButton>
       </Button>
      
    {ShowNestedList && 
        <Box className="mobileMenu">
        {category.map((cate) => (
         <Button
         key={cate.Name}
         sx={{
           display: "flex",
           alignItems: "center",
           justifyContent : "space-between" ,
           width: "100%",
           height: "30px",
           borderBottom: "1px solid blue",
           color : "black" ,
           p : "10px"
       
         }}
       >
         {cate.Name}
       
         <IconButton>
             {cate.Icon}
         </IconButton>
       </Button>
        ))}
     </Box>
    }
    </>

   ) : (
    <Button
    key={page.Name}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent : "space-between" ,
      width: "100%",
      height: "30px",
      borderBottom: "1px solid blue",
      color : "black" ,
      p : "10px"

    }}
  >
    {page.Name}

    <IconButton>
        {page.Icon}
    </IconButton>
  </Button>
   )}
   
   
   
   </>
    ))}
  </Box>
   }
   </>
  );
};

export default MobileMenu;
