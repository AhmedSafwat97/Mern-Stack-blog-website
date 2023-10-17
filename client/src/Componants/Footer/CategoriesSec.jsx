import { Box, Typography } from '@mui/material';
import React from 'react';

const CategoriesSec = () => {

const catarray = [

"Programming" , "Bussness" , " Fashion"  , "Sport" , "LifeStyle" , "Naure"

]


    return (
        <Box sx={{color : "#FFF" , mt : {xs : "20px" , md : "0"}}}>
            <Typography variant='h6' sx={{ mb : "20px"}}>
                Categories
            </Typography>

            {catarray.map((cat) => (
                <Typography variant='h6' 
                sx={{fontSize : "18px"}}
                key={cat}>
                    {cat}
                </Typography>

            ))}

        </Box>
    );
}

export default CategoriesSec;
