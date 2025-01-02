import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import {  onAuthStateChanged } from "firebase/auth";


import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import SignOutButton from "./auth/SignOutButton";



const drawerWidth = 240;

const navItems = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Users", path: "/users" },
  { name: "Contact", path: "/contact" },
];

const dashboardSubItems = [
  { name: "Add Expenses", path: "/add-expense" },
  { name: "Expense List", path: "/expense-list" },
  { name: "Category Expenses", path: "/category-expenses" },
  { name: "Savings", path: "/savings" },
];

const NavBar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  
    return () => unsubscribe(); // Čišćenje listenera
  }, []);
  
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", color:'#5a34a3' }}>
      <Typography variant="h6" sx={{ my: 2 ,color:'#5a34a3', fontSize:35}}>
        Spendy
      </Typography>
      <Divider  />
      <List  >
        {navItems.map((item ) => (
          <ListItem key={item.name} sx={{verticalAlign:"baseline",}} disablePadding   >
            <ListItemButton  component={Link} to={item.path}sx={{verticalAlign:"baseline",}} >
              <ListItemText primary={item.name} sx={{verticalAlign:"baseline",}} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <Typography variant="subtitle1" sx={{ mt: 2, color: '#5a34a3', fontWeight:300, fontStyle:'italic', mb:3  , verticalAlign: 'baseline' }}>
          Dashboard Items
        </Typography>
        {dashboardSubItems.map((subItem) => (
          <ListItem key={subItem.name} disablePadding >
            <ListItemButton component={Link} to={subItem.path}>
              <ListItemText primary={subItem.name} />
            </ListItemButton>
          </ListItem>
        ))} <hr />

      </List>
      {currentUser ? (
        <SignOutButton/>
      ):(<div className="container-nav-signin-and-up">
        <p>
        If you have an account please
        </p>
      <Button component={Link} to="/sign-in" sx={{ color: "#5a34a3", fontSize: 20 }} >
        Sign In
      </Button>
      <p>
        or
      </p>
      <p>
        Create a new acconut
      </p>
      <Button component={Link} to="/sign-up" sx={{ color: "#5a34a3", fontSize: 20 }}>
        Sign Up
      </Button>
      </div>
        
      )}

    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav"  sx={{
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Poluprozirna pozadina
    backdropFilter: "blur(10px)", // Efekt mutnog stakla
    filter: "blur(0px)", // Osigurajte da se ne primjenjuje dodatni filter
  }}>
        <Toolbar >
          <IconButton
            color="#5a34a3"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            
            sx={{ mr: 2, color:'#5a34a3', padding:1, display: {  sm: "none" } }}
          >
            <MenuIcon  sx={{border:1 , borderRadius:2, fontSize:30 }}/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            color='#5a34a3'
            fontSize={35}
            fontFamily={'Doto, sans-serif'}
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Spendy
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block", color:'#5a34a3', alignItems: "center", } }}>
            {navItems.map((item) =>
              item.name === "Dashboard" ? (
                <Box key={item.name} sx={{  display: "inline-flex", verticalAlign: 'middle', alignItems: "center",  color:'#5a34a3', fontSize:20,  margin:0}}>
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{  color:'#5a34a3' , fontSize:20, verticalAlign: 'baseline', }}
                  >
                    {item.name }
                  </Button>
                  <IconButton
                    color='#5a34a3'
                    onClick={handleMenuOpen}
                    size="small"
                    sx={{ ml:-1, mr:1 , padding:1 , verticalAlign: 'baseline'  
                    }}
                  >
                    <ExpandMoreIcon  />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    color='#977be5'
                  >
                    {dashboardSubItems.map((subItem) => (
                      <MenuItem
                        key={subItem.name}
                        component={Link}
                        to={subItem.path}
                        onClick={handleMenuClose}
                      >
                        {subItem.name}
                      </MenuItem>
                    ))}  
                  </Menu> 
                </Box>
              ) : (
                <Button key={item.name} component={Link} to={item.path} sx={{color:'#5a34a3', mr: 5, fontSize:20}}>
                  {item.name}
                </Button>
              )
            )}
          
          </Box>
        
        </Toolbar>
      
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Bolje performanse na mobilnim uređajima.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
        </Typography>
      </Box>
    
    </Box>
  );
};

NavBar.propTypes = {
  window: PropTypes.func,
};

export default NavBar;
