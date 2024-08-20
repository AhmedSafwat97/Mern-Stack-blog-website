import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import jwtDecode from "jwt-decode";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import MailLink from "../../MainLink";
import { useQuery } from "@tanstack/react-query";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ScrollToTop from "../../../ScrollToTop";
import ProfileCard from "./ProfileCards";

const Profile = () => {

  const Navigate = useNavigate();

  const { id } = useParams();

  const queryKey = ["userdata", id];

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/auth/${id}`); // Replace with your API endpoint
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading } = useQuery(queryKey, fetchData);


  if (isLoading) {
    return   <Box
    sx={{
      display : "flex" ,
      justifyContent: "center",
      width : "100%"
    }}
  >
     <CircularProgress sx={{mx : "65px"}}/>
  </Box>
  }
  

  let user;

  const token = localStorage.getItem("token");

  if (token) {
    user = jwtDecode(token);
  }

  return (
    <div>
      <ScrollToTop />
      <Box
        sx={{
          bgcolor: "#222F43",
          height: { xs: "fit-content", md: "400px" },
          p: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", md: "70%" },
            height: "fit-content",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              bgcolor: red[500],
              m: "10px 0",
              cursor: "pointer",
              width: "130px",
              height: "130px",
            }}
            src={`${MailLink}/${data.data.profileimage}`}
            aria-label="profile"
          >
            {data?.data.FirstName[0]}
          </Avatar>

          <Box
            sx={{
              height: "100%",
              width: "70%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#0DBADE", fontWeight: "800" }}
              >
                {data?.data.FirstName} {data?.data.LastName}
              </Typography>
              <Typography variant="h6" sx={{ m: "2px 0", color: "gray" }}>
                {data?.data.Email}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  textAlign: { xs: "center", md: "start" },
                  m: "5px 0",
                  color: "gray",
                }}
              >
                {data?.data.About}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100px",
              }}
            >
              <a
                href={data?.data.FacebookLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlinedIcon sx={{ cursor: "pointer" }} />
              </a>
              <a
                href={data?.data.InstagramLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon sx={{ cursor: "pointer" }} />
              </a>{" "}
              <a
                href={data?.data.LinkedinLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon sx={{ cursor: "pointer" }} />
              </a>
            </Box>
          </Box>
        </Box>
        {user?.userId === id ? (
          <Box
            sx={{
              width: "200px",
              color: "#FFF",
              fontWeight: "800",
              m: "20px 0",
            }}
          >
            <Button
              onClick={() => {
                Navigate(`/editprofile/${data?.data._id}`);
              }}
              sx={{
                color: "#FFF",
                fontWeight: "700",
                width: "100%",
                bgcolor: "#0F172A",
              }}
            >
              Edit Profile Info
            </Button>
          </Box>
        ) : null}
      </Box>
      <Box
        sx={{
          bgcolor: "#0F172A",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: "70%", mt: "20px" }}>
          <Typography variant="h6" sx={{ color: "#0DBADE", fontSize: "30px" }}>
            {" "}
            Posted by {data?.data.FirstName}{" "}
          </Typography>
          <Typography variant="h6" sx={{ color: "gray", fontSize: "16px" }}>
            {" "}
            Exclusive author{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "70%",
            m: "30px 0",
          }}
        >
          <ProfileCard {...{ id, user }} />
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
