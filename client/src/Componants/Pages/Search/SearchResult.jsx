import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MailLink from '../../MainLink';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Box, Typography } from '@mui/material';
import { red } from '@mui/material/colors';
import ScrollToTop from '../../../ScrollToTop';

const SearchResult = ({setSearch , Search}) => {



    const Navigate = useNavigate();

    const queryKey = ["posts"];
  
    // Define a function to fetch the data from your API
    const fetchData = async () => {
      const response = await axios.get(`${MailLink}/api/v1/post`);
      return response.data;
    };
  
    // Use the useQuery hook to fetch and manage the data
    const { data, isLoading } = useQuery(queryKey, fetchData);
  

    if (isLoading) {
      return <div>Loading...</div>;
    }
  
  
    
    const Searchdata = ()=> {
      if(Search !== ""){
        return data?.data.filter((post) => post.title.toUpperCase().startsWith(Search.toUpperCase()) || post.category.name.toUpperCase().startsWith(Search.toUpperCase()))
      
      }else{  
        return null
      }
      } 



    return (
        <div>
            <ScrollToTop/>
             <Box sx={{ display: "flex", justifyContent: "center" , minHeight : "400px"}}>
        <Box
          sx={{
            width: { xs: "95%", md: "70%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            sx={{ m: "20px 0", color: "#0DBADE", fontWeight: "700" }}
          >
            Search Results
          </Typography>

          <Typography>We found {Search !== "" ? Searchdata().length : 0} articles for "{Search}" key word </Typography>

       { Search !== "" &&  <Box>
            {Searchdata().map((posts) => (
                <Box key={posts._id}>
                  <Box
                    sx={{
                      cursor: "pointer",
                      mx: "auto",
                      my: "20px",
                      width: "90%",
                      display: "flex",
                      alignItems: "start",
                    }}
                    onClick={() => {
                      Navigate(`/postDetails/${posts._id}`);
                    }}
                  >
                    <Box sx={{ display: "flex" , width : "200px" , flexDirection : {xs : "column" , md : "row"}}}>
                      <Avatar
                        sx={{ bgcolor: red[500], mr: "10px" }}
                        aria-label="Author"
                        src={`${MailLink}/${posts.author.profileimage}`}
                      >
                        {posts.author.FirstName}
                      </Avatar>

                      <Box>
                        <Box>
                          <Typography
                            sx={{ fontSize: "10px", color: "gray", mr: "10px" }}
                          >
                            {posts.createdAt.slice(0, 10)}
                          </Typography>
                          <Typography sx={{ fontSize: "10px", color: "gray" }}>
                            {posts.createdAt.slice(14, 20)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "18px", mb: "10px", fontWeight: "400" }}
                      >
                        {posts.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "16px", mb: "10px", color: "gray" }}
                      >
                        {posts.content.slice(0, 100)}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{ fontSize: "16px", mb: "10px", color: "gray" }}
                      >
                        #{posts.category.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      border: "1px solid Gray",
                      ml: "20%",
                      width: "75%",
                      opacity: "0.2",
                    }}
                  />
                </Box>
              ))}
          </Box>}
        </Box>
      </Box>
        </div>
    );
}

export default SearchResult;
