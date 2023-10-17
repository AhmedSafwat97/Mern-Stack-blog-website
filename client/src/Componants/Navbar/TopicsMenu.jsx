import { Box } from "@mui/material";
import React from "react";

const TopicsMenu = ({ ShowGridTopics, setShowGridTopics }) => {
  const catigory = [
    "Topic",
    "Topic",
    "Topic",
    "Topic",
    "Topic",
    "Topic",
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {ShowGridTopics && (
        <Box
          sx={{
            position: "absolute",
            bgcolor: "#222F43",
            width: "200%",
            height: "250px",
            top: "55px",
            left: "-50%",
            borderRadius: "10px",
            display: "flex",
            p: "5px",
            justifyContent: "space-between",
            zIndex: "1000",
          }}
          onMouseLeave={() => {
            setShowGridTopics(false);
          }}
        >
          <Box
            sx={{ bgcolor: "#FFF", width: "30%", borderRadius: "10px" }}
          ></Box>
          <Box
            sx={{
              width: "69%",
              borderRadius: "10px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {catigory.map((Cat) => (
              <Box
                sx={{
                  width: "49.5%",
                  bgcolor: "#FFF",
                  borderRadius: "10px",
                  height: "calc(225px/3)",
                }}
              ></Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TopicsMenu;
