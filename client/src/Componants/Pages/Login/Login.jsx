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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MailLink from "../../MainLink";
import ScrollToTop from "../../../ScrollToTop";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [Email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Navigat = useNavigate();

  const queryClient = useQueryClient();

  const submitlogin = useMutation(
    (Login) => {
      return axios.post(`${MailLink}/api/v1/auth/login`, Login);
    },
    {
      onSuccess: (data) => {
        // console.log("Response from POST request:", data);
        const token = data.data.token;

        queryClient.invalidateQueries();

        if (token) {
          localStorage.setItem("token", token);
        }

        Navigat("/");
      },
    }
  );

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
            Welcome back !
          </Typography>
        </Box>

        {submitlogin.isError && (
          <Typography sx={{ mb: "10px" }}>invalid email or password</Typography>
        )}

        <Box
          sx={{
            width: "300px",
            height: "300px",
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
            sx={{
              m: 1,
              width: "30ch",
              borderRadius: "10px",
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
            sx={{ m: 1, width: "30ch", borderRadius: "10px"  }}
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

          <Typography 
          onClick={() => {
            Navigat("/forgotpass")
          }}
          sx={{ color: "#0DBADE", m: "10px 0", cursor: "pointer" }}>
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
            {submitlogin.isLoading ? <CircularProgress /> : "Log Me In"}
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
