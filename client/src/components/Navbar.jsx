import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import { useTheme,useMediaQuery} from '@mui/material';
import { makeStyles } from '@mui/styles';


const drawerWidth = 240;

const useStyles = makeStyles({
    navlinks: {
        marginLeft: 50,
        display: "flex",
      },
      link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: 0,
        "&:hover": {
       
          borderBottom: "1px solid white",
        },
        }


        ,
        navlinksMobile: {
            display: "grid",
          },
          linkMobile: {
            textDecoration: "none",
            color: "black",
            fontSize: "20px",
           
            "&:hover": {
           
              borderBottom: "1px solid black",
            },
            }


  });

const Navbar = ()=> {

    const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawerMobile = (
    <div>
      <Toolbar />
      
      <List  className={classes.navlinksMobile}>
         <ListItem >
            <ListItemText>
              <Link to="/" className={classes.linkMobile}>Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem >
            <ListItemText>
              <Link to="/reports" className={classes.linkMobile}>Reports</Link>
            </ListItemText>
          </ListItem>
         
        </List>
     
    </div>
  );



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `100%` },
        
        }}
      >
        <Toolbar>

          {isMobile ? (<><IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Ort students
          </Typography>
          </>
          )
          
          :
          (<> 
          <Typography variant="h6" noWrap component="div">
            Ort students
          </Typography>

        <List className={classes.navlinks}>
         <ListItem>
            <ListItemText>
              <Link to="/" className={classes.link} >Home</Link>
            </ListItemText>
          </ListItem>
          <ListItem >
            <ListItemText>
              <Link to="/reports" className={classes.link}>Reports</Link>
            </ListItemText>
          </ListItem>
         
        </List>
          </>)}


       
         
        </Toolbar>
        
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
       
        <Drawer

          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerMobile}
        </Drawer>

       
      </Box>
     
    </Box>
  );
}

export default Navbar;