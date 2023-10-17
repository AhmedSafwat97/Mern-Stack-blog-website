import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MailLink from "../../MainLink";
import ScrollToTop from "../../../ScrollToTop";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Navigat = useNavigate();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [errrormessage, seterrrormessage] = useState("");

  const submitSignIn = async () => {
    try {
      const response = await axios.post(`${MailLink}/api/v1/auth/signup`, {
        Email: Email,
        password: password,
        FirstName: FirstName,
        LastName: LastName,
      });
      // console.log("Response from POST request:", response.data);
      Navigat("/Login");
      // Handle successful response here
    } catch (error) {
      seterrrormessage( "Email already in use" )
      setLoading(false)
      if (error.response) {
        // The request was made, but the server responded with an error status code
        // console.error("Response error data:", error.response.data);
        // console.error("Response error status:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        // console.error("Request error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        // console.error("General error:", error.message);
      }
    }
  };

  return (
    <Box>
      <ScrollToTop />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ m: "30px 0" }}>
          <Typography variant="h4" sx={{ color: "#0DBADE" }}>
            Create an account
          </Typography>
        </Box>
        <Typography>{errrormessage}</Typography>
        <Box
          sx={{
            width: "300px",
            height: "400px",
            borderRadius: "15px",
            bgcolor: "#222F43",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: "20px",
            p : "20px"
          }}
        >
          <FormControl
            sx={{ m: 1, width: "30ch", borderRadius: "10px",

          
          }}
            variant="filled"
          >
            <InputLabel sx={{ color: "#FFF" }}>First name</InputLabel>
            <OutlinedInput
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              label="FirstName"
            />
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "30ch", borderRadius: "10px"  }}
            variant="filled"
          >
            <InputLabel sx={{ color: "#FFF" }}>Last name</InputLabel>
            <OutlinedInput
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              label="lastName"
            />
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "30ch", borderRadius: "10px", 
          }}
            variant="filled"
          >
            <InputLabel sx={{ color: "#FFF" }}>Email</InputLabel>
            <OutlinedInput
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="Email"
            />
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "30ch", borderRadius: "10px"}}
            variant="filled"
          >
            <InputLabel
              sx={{ color: "#FFF" }}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Button
            sx={{
              color: "black",
              bgcolor: "#0DAEE4",
              borderRadius: "10px",
              width: "30ch",
              height: "fit-content",
              ":hover": {
                bgcolor: "#0DAEE",
                color: "#FFF",
              },
            }}
            onClick={() => {
              setLoading(true)
              submitSignIn();
            }}
          >
            {Loading ? <CircularProgress sx={{mx : "65px"}}/> : "Sign in"}
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              m: "10px 0",
            }}
          >
            <Typography sx={{ color: "gray", fontSize: "14px" }}>
              Do You Have Account ?
            </Typography>

            <Typography
              onClick={() => {
                Navigat("/Login");
              }}
              sx={{ color: "#0DBADE", cursor: "pointer" }}
            >
              Login
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
