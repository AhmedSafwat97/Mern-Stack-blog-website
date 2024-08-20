import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import MailLink from "../MainLink";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ProfileMenu = ({ShowMobileMenu , setShowMobileMenu  , userData , user , isLoading }) => {

  const pages = [
    { Name: "Home", path: "/" },
  ];

  const Navigat = useNavigate()

  const queryClient = useQueryClient();

  const queryKey = ["repoData"];
  const fetchData = async () => {
    const response = await axios.get(`${MailLink}/api/v1/categories`); // Replace with your API endpoint
    return response.data;
  };


  // Use the useQuery hook to fetch and manage the data
  const { data } = useQuery(queryKey, fetchData);



  function SignOut() {
  
    const Signout = localStorage.removeItem("token")
    queryClient.invalidateQueries();
    return Signout
   
    }



  return (
  <>
     {ShowMobileMenu && 
     <Paper
        sx={{
          bgcolor: "#222F43",
          width: {xs : "250px" , lg : "300px"},
          maxHeight: {xs : "fit-content" , md :"400px"},
          position: "absolute",
          p: "10px",
          top: "100%",
          left: "50%",
          transform: { xs: "translate(-85%, 5%)", lg: "translate(-50%, 5%)" },
          borderRadius: "15px",
          zIndex: "10",
          overflowX : "hidden"
        }}
      >
       { user && <Box
          sx={{
            m: "20px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>{userData?.data.Email}</Typography>
          <Avatar
            sx={{
              bgcolor: red[500],
              m: "10px",
              cursor: "pointer",
              width: "80px",
              height: "89px",
            }}
            src={`${MailLink}/${userData?.data.profileimage}`}
            onClick={() => {
              Navigat(`/Profile/${user?.userId}`)
              setShowMobileMenu(false)
            }}
            aria-label="profile"
          >
            {userData?.data.FirstName[0]}
          </Avatar>
          <Typography>Hi, {userData?.data.FirstName}</Typography>
        </Box>}
        <Box>



        {pages.map((page) => (
                <Box
                  key={page.Name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "30px",
                    color: "#FFF",
                    p: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    Navigat(page.path);
                    setShowMobileMenu(false)
                  }}
                >
                  { page.Name  }
                </Box>
              ))}





          <Accordion sx={{bgcolor : "#0F172A" , borderRadius : "15px" , mb : "10px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Category Menu</Typography>
            </AccordionSummary>
            <AccordionDetails>
            {data?.data.map((category) => (
                <Box
                  key={category._id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "30px",
                    color: "#FFF",
                    p: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    Navigat(`/category/${category._id}`);
                    setShowMobileMenu(false)
                  }}
                >
                  { category.name  }
                </Box>
              ))}
             
            </AccordionDetails>
          </Accordion>
         {user && 
          <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "30px",
            color: "#FFF",
            p: "10px",
            cursor: "pointer",
          }}
          onClick={
            () => {
              SignOut()
              Navigat("/login")
            }
          }
        >
         LogOut
        </Box>
         
         }
        </Box>
      </Paper>}
  </>
  );
};

export default ProfileMenu;
