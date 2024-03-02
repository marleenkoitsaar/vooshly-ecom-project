import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, NavLink } from 'react-router-dom';
import { Badge, useTheme } from '@mui/material';

import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCartContext } from 'src/context/cart';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [
  { title: 'About', path: '/about' },
  { title: 'Collections', path: '/collections' },
  { title: 'Contact', path: '/contact' },
];

const linkStyle: React.CSSProperties = {
  textDecoration: 'none',
};

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const {
    dispatch,
    state: { products },
  } = useCartContext();

  const itemsInCart = Object.keys(products).length;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ path, title }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box display="flex">
      <CssBaseline />
      <AppBar
        component="nav"
        color="white"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link style={{ color: theme.palette.dark.main, ...linkStyle }} to="/">
            <Typography variant="h5">Vooshly</Typography>
          </Link>
          <Box
            justifyContent="flex-end"
            flex={1}
            gap={theme.spacing(5)}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            {navItems.map(({ path, title }) => (
              <NavLink
                style={{ color: theme.palette.dark.main, ...linkStyle }}
                key={path}
                to={path}
              >
                {title}
              </NavLink>
            ))}
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            flex={1}
            gap={theme.spacing(1)}
          >
            <Link
              style={{ color: theme.palette.dark.main, ...linkStyle }}
              to="/login"
            >
              Login
            </Link>
            {itemsInCart === 0 ? (
              <ShoppingBagIcon
                onClick={() => dispatch({ type: 'TOGGLE_CART_DRAWER' })}
              />
            ) : (
              <Badge badgeContent={itemsInCart} color="primary">
                <ShoppingBagIcon
                  onClick={() => dispatch({ type: 'TOGGLE_CART_DRAWER' })}
                />
              </Badge>
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
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
