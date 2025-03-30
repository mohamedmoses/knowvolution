import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Map, Chat, MoreVert } from '@mui/icons-material';

const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const pathToValue = {
    '/': 0,
    '/map': 1,
    '/chat': 2,
    '/more': 3
  };
  
  const currentValue = pathToValue[location.pathname] ?? 0;

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={currentValue}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              navigate('/');
              break;
            case 1:
              navigate('/map');
              break;
            case 2:
              navigate('/chat');
              break;
            case 3:
              navigate('/more');
              break;
            default:
              navigate('/');
          }
        }}
      >
        <BottomNavigationAction label={t('nav.home')} icon={<Home />} />
        <BottomNavigationAction label={t('nav.map')} icon={<Map />} />
        <BottomNavigationAction label={t('nav.chat')} icon={<Chat />} />
        <BottomNavigationAction label={t('nav.more')} icon={<MoreVert />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;
