import React, { useEffect, useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import MailLink from "../../MainLink";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Navigat = useNavigate();



  const submitlogin = useMutation((Login) => {
    return axios.post(`${MailLink}/api/v1/auth/login`, Login);
  }, {
    onSuccess: (data) => {
      console.log("Response from POST request:", data);
      const token = data.data.token
      console.log(token);
      
      if (token) {
        localStorage.setItem("token", token);
      }

        Navigat("/")

    },
  });
  //   try {
  //     const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
  //       Email: Email,
  //       password: password,
  //     });
  //     console.log("Response from POST request:", response.data.token);

  //     const token = response.data.token

  //     if (token) {
  //       localStorage.setItem("token", token);
  //       // Navigate to the desired path after setting the token
  //     }

  //   } catch (error) {
  //     if (error.response) {
  //       // The request was made, but the server responded with an error status code
  //       console.error("Response error data:", error.response.data);
  //       console.error("Response error status:", error.response.status);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error("Request error:", error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an error
  //       console.error("General error:", error.message);
  //     }
  //   }

  // };



  return (
    <Box>
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
            Welcome back !
          </Typography>
        </Box>

        {submitlogin.isError && (
            <Typography sx={{mb : "10px"}}>invalid email or password</Typography>
          )}

        <Box
          sx={{
            width: "280px",
            height: "300px",
            borderRadius: "15px",
            bgcolor: "#222F43",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: "20px",
          }}
        >
          <FormControl
            sx={{ m: 1, width: "30ch", borderRadius: "10px" }}
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
            sx={{ m: 1, width: "30ch", borderRadius: "10px" }}
            variant="filled"
          >
            <InputLabel
              sx={{ color: "#FFF" }}
              htmlFor="outlined-adornment-password"
            >
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
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

          <Typography sx={{ color: "#0DBADE", m: "10px 0" }}>
            Forgot Password
          </Typography>

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
                submitlogin.mutate({ Email: Email, password: password });

              }}
            >
              { submitlogin.isLoading ?  <CircularProgress /> : "Log Me In"  }
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
              Don't Have An Account ?
            </Typography>

            <Typography
              onClick={() => {
                Navigat("/SignUp");
              }}
              sx={{ color: "#0DBADE", cursor: "pointer" }}
            >
              Sign Up
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
