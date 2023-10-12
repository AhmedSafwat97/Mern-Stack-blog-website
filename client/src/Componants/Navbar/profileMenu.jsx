import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ShowMobileMenu , setShowMobileMenu  , userData , user }) => {

  const pages = [
    { Name: "Home", path: "/" },
    // { Name: "Profile", path: `/Profile/${user.userId}` },
    { Name: "Contact", path: "/Contact" },
  ];

  const Navigat = useNavigate()

  function pageview() {
    const filteredPages = !user ? pages.filter((page) => page.Name !== "Profile") : pages
    return filteredPages
  }



  function SignOut() {
  
    const Signout = localStorage.removeItem("token")
   
    return Signout
   
    }


  return (
  <>
     {ShowMobileMenu && 
     <Paper
        sx={{
          bgcolor: "#222F43",
          width: {xs : "250px" , lg : "300px"},
          height: "fit-content",
          position: "absolute",
          p: "10px",
          top: "100%",
          left: "50%",
          transform: { xs: "translate(-85%, 5%)", lg: "translate(-50%, 5%)" },
          borderRadius: "15px",
          zIndex: "10",
          overflowX : "hidden"
        }}
      >
       { userData && <Box
          sx={{
            m: "20px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>{userData?.data.Email}</Typography>
          <Avatar
            sx={{
              bgcolor: red[500],
              m: "10px",
              cursor: "pointer",
              width: "80px",
              height: "89px",
            }}
            src={userData?.data.profileimage}
            onClick={() => {
              Navigat(`/Profile/${user?.userId}`)
              setShowMobileMenu(false)
            }}
            aria-label="profile"
          >
            R
          </Avatar>
          <Typography>Hi, {userData?.data.FirstName}</Typography>
        </Box>}
        <Box>
          <Accordion sx={{bgcolor : "#0F172A" , borderRadius : "15px" , mb : "10px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Show Menu</Typography>
            </AccordionSummary>
            <AccordionDetails>

              {pageview().map((page) => (
                <Box
                  key={page.Name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "30px",
                    color: "#FFF",
                    p: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    Navigat(page.path);
                    setShowMobileMenu(false)
                  }}
                >
                  { page.Name  }
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
          <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "30px",
                    color: "#FFF",
                    p: "10px",
                    cursor: "pointer",
                  }}
                  onClick={
                    () => {
                      SignOut()
                      Navigat("/")
                      setShowMobileMenu(false)
                    }
                  }
                >
                 LogOut
                </Box>
        </Box>
      </Paper>}
  </>
  );
};

export default ProfileMenu;
