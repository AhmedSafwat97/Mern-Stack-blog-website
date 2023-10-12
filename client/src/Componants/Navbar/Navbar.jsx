import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem, Button, Container, Avatar, IconButton } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import TopicsMenu from "./TopicsMenu";
import SearchBox from "./SearchBox";
import SearchIcon from "@mui/icons-material/Search";
import { red } from "@mui/material/colors";
import ProfileMenu from "./profileMenu";
import jwtDecode from "jwt-decode";
import MailLink from "../MainLink";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {
  const Location = useLocation();
  const Navigat = useNavigate();

  const [ShowGridTopics, setShowGridTopics] = useState(false);
  const [ShowMobileMenu, setShowMobileMenu] = useState(false);

  const pages = [
    { Name: "Home", path: "/" },

    { Name: "Contact Us", path: "Contact" },
  ];

  let user;

  const token = localStorage.getItem("token");

  if (token) {
    user = jwtDecode(token);
  }



  const queryKey = ["usermenudata"];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/auth/${user.userId}`); // Replace with your API endpoint
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data : userData } = useQuery(queryKey, fetchData);





  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: { xs: "fit-content", md: "80px" },
          bgcolor: "transparent",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: { xs: "100%", lg: "75%" },
            }}
          >
            <Typography
              variant="h3"
              className="logo"
              sx={{ fontSize: "30px", fontWeight: "800", cursor: "pointer" }}
              onClick={() => {
                Navigat("/");
              }}
            >
              WriteWave
            </Typography>



            <Box
              className="Pages"
              sx={{ position: "relative", display: { xs: "none", md: "flex" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.Name} onClick={() => {}}>
                  <Typography
                    textAlign="center"
                    onClick={() => {
                      Navigat(page.path);
                      setShowGridTopics(false);
                    }}
                    sx={{
                      borderBottom:
                        Location.pathname === page.path
                          ? "2px solid #FFF"
                          : null,
                    }}
                    onMouseEnter={() => {
                      setShowGridTopics(page.Name === "Topics" ? true : null);
                    }}
                  >
                    {page.Name}
                  </Typography>
                  {page.Icon}
                </MenuItem>
              ))}
              <TopicsMenu {...{ ShowGridTopics, setShowGridTopics }} />
            </Box>


            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  display: { xs: "none", md: "block" },
                  justifyContent: "center",
                  mr: "10px",
                }}
              >
                <SearchBox />
                <SearchIcon
                  sx={{
                    color: "#FFF",
                    position: "absolute",
                    right: "5px",
                    top: "8px",
                  }}
                />
              </Box>
              
              
              {" "}
              {!user ? (
                <>
                  <Button
                    sx={{
                      color: "#FFF",
                      bgcolor: "#0DAEE4",
                      borderRadius: "20px",
                      width: "90px",
                      height: "fit-content",
                      ":hover": {
                        bgcolor: "#0DAEE",
                      },
                    }}
                    onClick={() => {
                      Navigat("/Login");
                    }}
                  >
                    Login
                  </Button>
                 
                </>
              ) : (
                <Box>
                  <Box
                    sx={{
                      // display: { xs: "none", md: "block" },
                      position: "relative",
                    }}
                  >
                    
                    <Avatar
                      sx={{ bgcolor: red[500], mr: "10px", cursor: "pointer" }}
                      aria-label="profile"
                      onClick={() => {
                        setShowMobileMenu(!ShowMobileMenu);
                      }}
                      src={userData?.data.profileimage}
                    >
                      {userData?.data.FirstName[0]}
                    </Avatar>
                    <Box>
                      <ProfileMenu {...{ ShowMobileMenu , setShowMobileMenu , userData , user}} />
                    </Box>
                  </Box>
                </Box>
              )}



            { !user && 
           // mobile Menu 
            <Box>
            <Box
              sx={{
                position: "relative",
                display : {xs :"block" , md : "none"}
              }}
            >
              
              <IconButton
                    sx={{display : {xs :"block" , md : "none"}}}
                      onClick={() => {
                        setShowMobileMenu(!ShowMobileMenu);
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
              <Box>
                <ProfileMenu {...{ ShowMobileMenu , setShowMobileMenu }} />
              </Box>
            </Box>

          </Box>
            
            }
            </Box>{" "}
          </Box>
        </Container>
        {/* For Mobile Search */}
        <Box
          sx={{
            position: "relative",
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            mb: "10px",
          }}
        >
          <SearchBox />
          <SearchIcon
            sx={{
              color: "#FFF",
              position: "absolute",
              right: "16%",
              top: "8px",
            }}
          />
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;
