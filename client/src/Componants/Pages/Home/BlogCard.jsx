import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { Box } from "@mui/material";


export default function BlogCard() {
  return (
    <Card
      sx={{
        maxWidth: "280px",
        bgcolor: "#222F43",
        m: "10px",
        p: "15px 10px",
        borderRadius: "15px",
        cursor : "pointer"
      }}
    >
      <CardMedia
        sx={{ borderRadius: "15px" }}
        component="img"
        height="170"
        image="../../../../Imgs/blog1.jpg"
        alt="Paella dish"
      />

      <Box sx={{ display: "flex" }}>
        <Typography sx={{ color: "gray", mt: "10px", mr: "10px" }}>
          #Nature
        </Typography>
        <Typography sx={{ color: "gray", mt: "10px", mr: "10px" }}>
          #Nature
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" sx={{ fontSize: "18px", fontWeight: "600" }}>
          Master The Art Of Nature with These 7 Tips
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", mt: "10px" }}>
          <Avatar sx={{ bgcolor: red[500], mr: "10px" }} aria-label="recipe">
            R
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: "12px", color: "gray" }}>
              Chorizo Paella
            </Typography>
            <Typography sx={{ fontSize: "10px", color: "gray" }}>
              September 14, 2016
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ color: "gray", fontSize: "12px" }}>
          Read More
        </Typography>
      </Box>
    </Card>
  );
}
