import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MenuItem, IconButton, Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TopicsMenu from "./TopicsMenu";
import MobileMenu from "./MobileMenu";
import SearchBox from "./SearchBox";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const Location = useLocation();
  const Navigat = useNavigate();

  const [ShowGridTopics, setShowGridTopics] = useState(false);
  const [ShowMobileMenu, setShowMobileMenu] = useState(false);

  const pages = [
    { Name: "Home", path: "/" },
    {
      Name: "Topics",
      path: "/Topics",
      Icon:
        ShowGridTopics === true ? (
          <ArrowUpwardIcon sx={{ fontSize: "15px" }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: "15px" }} />
        ),
    },
    { Name: "Contact Us", path: "Contact" },
  ];

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
            <Box sx={{display : "flex" ,alignItems : "center"}}>
            <Box sx={{ position : "relative"  , display: { xs: "none", md: "block" } , justifyContent : "center" , mr : "10px"  }}>
          <SearchBox/>
          <SearchIcon sx={{ color: "#FFF" , position : "absolute" , right : "5px" , top : "8px"}} />
        </Box>{" "}
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
              >
                Login
              </Button>
            </Box>{" "}
          </Box>
        </Container>
        {/* For Mobile Search */}
        <Box sx={{ position : "relative"  , display: { xs: "flex", md: "none" } , justifyContent : "center"   }}>
          <SearchBox/>
          <SearchIcon sx={{ color: "#FFF" , position : "absolute" , right : "16%" , top : "8px" }} />
        </Box>{" "}

        {/* for Nav bar Menu */}
        <Box
          sx={{
            width: "100%",
            display: { xs: "flex", md: "none" },
            justifyContent: "center",
            alignItems: "center",
            p: "10px",
          }}
        >
          <Button
            sx={{ color: "#FFF"}}
            onClick={() => {
              setShowMobileMenu(!ShowMobileMenu);
            }}
          >
            {ShowMobileMenu === true ? <CloseIcon /> : <MenuIcon />}
            Menu
          </Button>
        </Box>
      </AppBar>
      <MobileMenu {...{ ShowMobileMenu }} />
    </>
  );
};

export default Navbar;
