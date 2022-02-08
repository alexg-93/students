import React from 'react';
import Form from '../components/Form'
import Box from '@mui/material/Box';
import NavBar from '../components/Navbar'
import {Typography,Grid} from '@mui/material';
const RegisterScreen = () => {
  return (

    <Box
      sx={{
        width: '100%',
       
      }}
      display="grid"
      justifyContent="center"
      alignItems="center"

    >
     <NavBar/>
  
    <Grid container
      sx={{display:'grid',alignContent:'center'}}
      mt={15}
      >
        <Typography variant="h5">
          טופס רישום תלמיד לשנה״ל תשפ״ג 2022
        </Typography>

      </Grid>
      
      <Typography variant="h6" sx={{display:'grid',justifyContent:'end',maxWidth: "500px",}} mt={3}>
      מוסד: אורט סינגאלובסקי
      </Typography>

    
     <Form/>
  </Box>

  )
};

export default RegisterScreen;
