import {
  Avatar,
  Box,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import MailLink from "../../../MainLink";
import { useNavigate } from "react-router-dom";
import {useQueryClient } from "@tanstack/react-query";

export default function Profileimage({id , data , queryKey}) {
  const fileInputRef = useRef(null);

  const [profileimage, setprofileimage] = useState("");

  const Navigate = useNavigate()

  const queryClient = useQueryClient();

  const submitimage = async () => {
    const formData = new FormData();
  
    // Append the image file if it exists
      formData.append("profileimage", profileimage); // Assuming profileimage is a File object

    try {
      const response = await axios.post(`${MailLink}/api/v1/auth/image/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure you set the correct content type
        },
      });
        // After a successful comment submission, invalidate the comments query
        queryClient.invalidateQueries();

      console.log("Response from Update request:", response.data);
    } catch (error) {
      console.error("Error updating", error);
    }
  };




  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setprofileimage(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setprofileimage(selectedFile);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          bgcolor: "#222F43",
          zIndex: "10",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <ModeEditOutlineIcon />
      </IconButton>

      <Dialog
        open={open}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={handleClose}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            bgcolor: "#222F43",
          }}
        >
      <Box sx={{ display: "flex",
            justifyContent: "space-between",
            alignItems: "center",}}>
            <Typography variant="h6">Edit photo</Typography>
        
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon />
            </IconButton>
      </Box>
        </DialogTitle>

        <DialogContent dividers sx={{ bgcolor: "#222F43" }}>
          <div
            style={{
              width: {xs : "300px" , md :"400px"},
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#222F43",
            }}
          >
            <Avatar
              sx={{
                width: "260px",
                height: "260px",
                border: "2px dashed #0DBADE",
                textAlign: "center",
                position: "relative",
                cursor: "pointer",
                bgcolor : "#222F43"
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current.click()}
            >
              {profileimage ? (
                <img
                  src={URL.createObjectURL(profileimage)}
                  alt="Selected"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" , zIndex : "10" }}
                />
              ) : (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                 {data?.data.profileimage ? (
                   <img
                   src={`${MailLink}/${data?.data.profileimage}`}
                   alt="Selected"
                   style={{ width: "270px", height: "270px", borderRadius: "50%" , zIndex : "10" }}
                 />
                 ) : (
                  <Box>
                  <Typography variant="h6">Drop Photo Here</Typography>
                  <DriveFolderUploadIcon sx={{ fontSize: "50px" }} />
                </Box>
                 )}
                </Box>
              )}
            </Avatar>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleInputChange}
              ref={fileInputRef}
            />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }} />
            </Box>
          </div>
        </DialogContent>

        <DialogActions sx={{ bgcolor: "#222F43" }}>
          <Button
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            change photo
          </Button>
          <Button onClick={() => {
            submitimage()
            setOpen(false);
            Navigate(`/Profile/${data?.data._id}`)
          }} autoFocus>
            Save photo
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
