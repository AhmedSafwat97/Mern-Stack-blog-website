import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MailLink from "../../../MainLink";
import axios from "axios";
import { useState } from "react";
import Profileimage from "./Profileimage";

const Editinfo = () => {
  const Navigate = useNavigate();

  const { id } = useParams();

  // let user;

  // const token = localStorage.getItem("token");

  // if (token) {
  //   user = jwtDecode(token);
  // }

  // console.log(user);

  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [Email, setEmail] = useState();
  const [FacebookLink, setFacebookLink] = useState();
  const [InstagramLink, setInstagramLink] = useState();
  const [LinkedinLink, setLinkedinLink] = useState();
  const [About, setAbout] = useState();

  const queryKey = ["userdata"];

  const queryClient = useQueryClient();

  const submitupdate = async () => {
    try {
      const response = await axios.put(`${MailLink}/api/v1/auth/${id}`, {
        Email: Email,
        FirstName: FirstName,
        LastName: LastName,
        About: About,
        FacebookLink: FacebookLink,
        InstagramLink: InstagramLink,
        LinkedinLink: LinkedinLink,
      });

      console.log("Response:", response.data);

      // After a successful comment submission, invalidate the comments query
      queryClient.invalidateQueries(queryKey);
    } catch (error) {
      console.error("Error updating", error);
    }
  };

  // Define a function to fetch the data from your API
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/auth/${id}`); // Replace with your API endpoint
    return response.data;
  };

  // Use the useQuery hook to fetch and manage the data
  const { data, isLoading } = useQuery(queryKey, fetchData);

  // console.log(data);

  if (isLoading) {
    return <Box sx={{width : "100%" , display : "flex" , justifyContent : "center"}}><CircularProgress/></Box>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          mt: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Profileimage {...{ data, id, queryKey }} />

        <Avatar
          sx={{
            bgcolor: red[500],
            cursor: "pointer",
            width: "130px",
            height: "139px",
          }}
          aria-label="profile"
          src={`${MailLink}/${data?.data.profileimage}`}
        >
          {data?.data.FirstName[0]}
        </Avatar>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          bgcolor: "#222F43",
          position: "absolute",
        }}
      ></Box>

      <Box
        sx={{
          width: { xs: "90%", md: "70%" },
          m: "30px 0",
        }}
      >
        {/* Name */}

        <Accordion
          sx={{ bgcolor: "#222F43", borderRadius: "15px", mb: "10px" }}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Your name</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              fullWidth
              id=""
              label="First Name"
              placeholder="First Name"
              defaultValue={data?.data.FirstName}
              sx={{ m: "10px 0", bgcolor: "#0F172A", width: "49%"  , borderRadius : "15px"}}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Last Name"
              placeholder="Last Name"
              defaultValue={data?.data.LastName}
              sx={{ m: "10px 0", bgcolor: "#0F172A", width: "49%" , borderRadius : "15px" }}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </AccordionDetails>
        </Accordion>

        {/* Email */}

        <Accordion
          sx={{ bgcolor: "#222F43", borderRadius: "15px", mb: "10px" }}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Email</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              fullWidth
              id=""
              label="Email"
              placeholder="Post Content"
              defaultValue={data?.data.Email}
              sx={{ m: "10px 0", bgcolor: "#0F172A" , borderRadius : "15px" }}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </AccordionDetails>
        </Accordion>

        {/* About */}

        <Accordion
          sx={{ bgcolor: "#222F43", borderRadius: "15px", mb: "10px" }}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>About</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{}}>
            <TextField
              fullWidth
              id=""
              label="About"
              placeholder="Anout"
              defaultValue={data?.data.About}
              sx={{ m: "10px 0", bgcolor: "#0F172A" , borderRadius : "15px" }}
              onChange={(e) => {
                setAbout(e.target.value);
              }}
            />
          </AccordionDetails>
        </Accordion>

        {/* social media */}

        <Accordion
          sx={{ bgcolor: "#222F43", borderRadius: "15px", mb: "10px" }}
          defaultExpanded={true}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Socisl Media Links</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{}}>
            <TextField
              fullWidth
              id=""
              label="Facebook"
              placeholder="Facebook"
              defaultValue={data?.data.FacebookLink}
              sx={{ m: "10px 0", bgcolor: "#0F172A" , borderRadius : "15px"}}
              onChange={(e) => {
                setFacebookLink(e.target.value);
              }}
            />

            <TextField
              fullWidth
              id=""
              label="Instagram"
              placeholder="Instagram"
              defaultValue={data?.data.InstagramLink}
              sx={{ m: "10px 0", bgcolor: "#0F172A" }}
              onChange={(e) => {
                setInstagramLink(e.target.value);
              }}
            />

            <TextField
              fullWidth
              id=""
              label="Linkedin"
              placeholder="Linkedin"
              defaultValue={data?.data.LinkedinLink}
              sx={{ m: "10px 0", bgcolor: "#0F172A" }}
              onChange={(e) => {
                setLinkedinLink(e.target.value);
              }}
            />
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          m: "15px 0",
          width: { xs: "90%", md: "70%" },
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          onClick={() => {
            submitupdate();
            Navigate(`/profile/${id}`);
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Editinfo;
