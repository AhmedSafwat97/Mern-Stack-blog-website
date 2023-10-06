import { Box, Typography } from "@mui/material";
import React from "react";
import BlogCard from "./BlogCard";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

const RecentPosts = () => {
  return (
    <Box>
      <Box sx={{ width: "75%", m: "auto" }}>
        <Box sx={{ textAlign: "center", m: "0px 0 40px 0" }}>
          <Typography variant="h4" sx={{ color: "#0DBADE" }}>
            Recent
          </Typography>
          <Typography sx={{ color: "gray" }}>
            Don't miss the latest trends
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              maxWidth: { xs: "280px", md: "400px" },
              bgcolor: "#222F43",
              m: "10px",
              p: "15px 10px",
              borderRadius: "15px",
              cursor: "pointer",
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
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", fontWeight: "600" }}
              >
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
                <Avatar
                  sx={{ bgcolor: red[500], mr: "10px" }}
                  aria-label="recipe"
                >
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
          <Card
            sx={{
              maxWidth: { xs: "280px", md: "500px" },
              bgcolor: "#222F43",
              m: "10px",
              p: "15px 10px",
              borderRadius: "15px",
              cursor: "pointer",
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
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", fontWeight: "600" }}
              >
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
                <Avatar
                  sx={{ bgcolor: red[500], mr: "10px" }}
                  aria-label="recipe"
                >
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
          <Card
            sx={{
              maxWidth: { xs: "280px", md: "500px" },
              bgcolor: "#222F43",
              m: "10px",
              p: "15px 10px",
              borderRadius: "15px",
              cursor: "pointer",
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
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", fontWeight: "600" }}
              >
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
                <Avatar
                  sx={{ bgcolor: red[500], mr: "10px" }}
                  aria-label="recipe"
                >
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
          <Card
            sx={{
              maxWidth: { xs: "280px", md: "500px" },
              bgcolor: "#222F43",
              m: "10px",
              p: "15px 10px",
              borderRadius: "15px",
              cursor: "pointer",
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
              <Typography
                variant="h6"
                sx={{ fontSize: "18px", fontWeight: "600" }}
              >
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
                <Avatar
                  sx={{ bgcolor: red[500], mr: "10px" }}
                  aria-label="recipe"
                >
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
        </Box>
      </Box>
    </Box>
  );
};

export default RecentPosts;
