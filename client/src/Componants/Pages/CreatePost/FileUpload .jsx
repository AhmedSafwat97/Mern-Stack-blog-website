import { Box , Typography } from "@mui/material";
import React, { useRef } from "react";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

const FileUpload = ({imageCover, setimage  }) => {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setimage(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setimage(selectedFile);
  };


  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          height: "220px",
          border: "2px dashed #0DBADE",
          textAlign: "center",
          padding: "20px",
          position: "relative",
          cursor: "pointer",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
      >
        {imageCover ? (
           <img
             src={URL.createObjectURL(imageCover)}
             alt="Selected"
             style={{ maxWidth: "100%", maxHeight: "100%" }}
           />
        ) : (
          <Box sx={{border : "2px solid #0DBADE" , height : "100%" , display : "flex" , alignItems : "center" , justifyContent : "center"}}>
           <Box>
           <Typography variant="h6">
               Drag &amp; Drop and image or click here to select one
             </Typography>
             <DriveFolderUploadIcon sx={{fontSize : "50px"}}/>
           </Box>
          </Box>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleInputChange}
        ref={fileInputRef}
      />

      <Box sx={{ display: "flex" ,alignItems : "center" }}>
        <Box sx={{ flexGrow: 1 }} />

      </Box>
    </div>
  );
};

export default FileUpload;
