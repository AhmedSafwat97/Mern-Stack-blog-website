import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Container, Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchBox from "./SearchBox";
import SearchIcon from "@mui/icons-material/Search";
import { red } from "@mui/material/colors";
import ProfileMenu from "./profileMenu";
import jwtDecode from "jwt-decode";
import MailLink from "../MainLink";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRef } from "react";

const Navbar = ({ Search, setSearch }) => {
  const Navigat = useNavigate();

  const [ShowMobileMenu, setShowMobileMenu] = useState(false);

  let user;

  const token = localStorage.getItem("token");

  if (token) {
    user = jwtDecode(token);
  }

  const queryKey = ["usermenudata" , user];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    if (user) {
      const response = await axios.get(`${MailLink}/api/v1/auth/${user.userId}`);
      return response.data;
    } else {
      return null
    }
  };

  // Use the useQuery hook to fetch and manage the data
  const { data: userData, isLoading } = useQuery(queryKey, fetchData);

  const paperRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the Paper
    const handleOutsideClick = (event) => {
      if (paperRef.current && !paperRef.current.contains(event.target)) {
        setShowMobileMenu(false);
      }
    };
    // Add an event listener to the document when the menu is open
    document.addEventListener("click", handleOutsideClick);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
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
            width: { xs: "100%", lg: "70%" },
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
            sx={{
              position: "relative",
              display: { xs: "none", md: "block" },
              justifyContent: "center",
              mr: "20px",
            }}
          >
            <SearchBox {...{ setSearch, Search }} />
            <SearchIcon
              sx={{
                color: "#FFF",
                position: "absolute",
                right: "5px",
                top: "8px",
              }}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  ref={paperRef}
                  sx={{
                    position: "relative",
                  }}
                >
                  <Avatar
                    sx={{ bgcolor: red[500], mr: "10px", cursor: "pointer" }}
                    aria-label="profile"
                    onClick={() => {
                      setShowMobileMenu(!ShowMobileMenu);
                    }}
                    src={`${MailLink}/${userData?.data.profileimage}`}
                  >
                    {userData?.data.FirstName[0]}
                  </Avatar>
                  <Box>
                    <ProfileMenu
                      {...{
                        ShowMobileMenu,
                        setShowMobileMenu,
                        userData,
                        user,
                        isLoading,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
            {!user && (
              // mobile Menu
              <Box>
                <Box
                  sx={{
                    position: "relative",
                    display: { xs: "block", md: "none" },
                  }}
                  ref={paperRef}
                >
                  <IconButton
                    sx={{ display: { xs: "block", md: "none" } }}
                    onClick={() => {
                      setShowMobileMenu(!ShowMobileMenu);
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Box>
                    <ProfileMenu
                      {...{
                        ShowMobileMenu,
                        setShowMobileMenu,
                        userData,
                        user,
                        isLoading,
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
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
        <SearchBox {...{ setSearch, Search }} />
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
  );
};

export default Navbar;