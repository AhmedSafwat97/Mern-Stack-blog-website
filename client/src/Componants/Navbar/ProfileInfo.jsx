import { Avatar, Box } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';

const ProfileInfo = () => {
    return (
        <Box sx={{ m: "20px 0" }}>
        <Avatar
          sx={{
            bgcolor: red[500],
            mr: "10px",
            cursor: "pointer",
            width: "80px",
            height: "89px",
          }}
          aria-label="profile"
        >
          R
        </Avatar>
      </Box>
    );
}

export default ProfileInfo;
