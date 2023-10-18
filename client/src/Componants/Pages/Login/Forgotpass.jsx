import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../../ScrollToTop";

const Forgotpass = () => {

    const Navigat = useNavigate()


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
            Forgot Password
          </Typography>
        </Box>

        <Box
          sx={{
            width: "300px",
            height: "200px",
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
              label="Email"
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
          >
            Send Code
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

export default Forgotpass;
