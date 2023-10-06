import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Navigat = useNavigate();

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
            Create an account
          </Typography>
        </Box>

        <Box
          sx={{
            width: "280px",
            height: "400px",
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
            <InputLabel sx={{ color: "#FFF" }}>First name</InputLabel>
            <OutlinedInput label="FirstName" />
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "30ch", borderRadius: "10px" }}
            variant="filled"
          >
            <InputLabel sx={{ color: "#FFF" }}>Last name</InputLabel>
            <OutlinedInput label="lastName" />
          </FormControl>

          <FormControl
            sx={{ m: 1, width: "30ch", borderRadius: "10px" }}
            variant="filled"
          >
            <InputLabel sx={{ color: "#FFF" }}>Email</InputLabel>
            <OutlinedInput label="Email" />
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
              Navigat("/Login");
            }}
          >
            Sign up
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
