import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Container, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Divider, 
  Typography,
  Avatar,
  Box
} from '@mui/material';
import { 
  AccountCircle, 
  Favorite, 
  Policy, 
  Info,
  Logout,
  Login
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const More = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mb: 8, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t('nav.more')}
      </Typography>

      {/* User Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2 }}>
        <Avatar 
          src={currentUser?.photoURL} 
          alt={currentUser?.displayName || t('more.account')}
          sx={{ width: 60, height: 60, mr: 2 }}
        >
          {!currentUser?.photoURL && <AccountCircle fontSize="large" />}
        </Avatar>
        <Box>
          <Typography variant="h6">
            {currentUser?.displayName || t('more.account')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {currentUser?.email || (t('more.account'))}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Menu List */}
      <List component="nav">
        <ListItem button onClick={() => handleNavigation('/account')}>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={t('more.account')} />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/favorites')}>
          <ListItemIcon>
            <Favorite />
          </ListItemIcon>
          <ListItemText primary={t('more.favorites')} />
        </ListItem>

        <Divider />

        <ListItem button onClick={() => handleNavigation('/privacy')}>
          <ListItemIcon>
            <Policy />
          </ListItemIcon>
          <ListItemText primary={t('more.privacy')} />
        </ListItem>

        <ListItem button onClick={() => handleNavigation('/about')}>
          <ListItemIcon>
            <Info />
          </ListItemIcon>
          <ListItemText primary={t('more.aboutUs')} />
        </ListItem>

        <Divider />

        {currentUser ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="تسجيل الخروج" />
          </ListItem>
        ) : (
          <ListItem button onClick={() => handleNavigation('/account')}>
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText primary="تسجيل الدخول" />
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export default More;
