import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Container, 
  Typography, 
  Box, 
  IconButton, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Divider,
  Button,
  CardActionArea
} from '@mui/material';
import { 
  ArrowBack, 
  Favorite,
  DeleteOutline
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

// Mock properties data (same as used in PropertyDetails.js)
const mockProperties = [
  {
    id: '24001',
    title: 'شقة فاخرة في القاهرة الجديدة',
    propertyType: 'apartment',
    serviceType: 'sale',
    place: 'القاهرة الجديدة',
    location: { lat: 30.007413, lng: 31.447027 },
    price: 2500000,
    size: 150,
    bedroomNumbers: 3,
    bathroomNumbers: 2,
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '24002',
    title: 'مطعم للإيجار في مدينة نصر',
    propertyType: 'restaurant',
    serviceType: 'rent',
    place: 'مدينة نصر',
    location: { lat: 30.050231, lng: 31.367563 },
    price: 15000,
    size: 200,
    bedroomNumbers: 0,
    bathroomNumbers: 2,
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '24003',
    title: 'قاعة احتفالات في المعادي',
    propertyType: 'hall',
    serviceType: 'rent',
    place: 'المعادي',
    location: { lat: 29.958057, lng: 31.249361 },
    price: 25000,
    size: 500,
    bedroomNumbers: 0,
    bathroomNumbers: 4,
    image: 'https://images.unsplash.com/photo-1602870045259-82a41de3ad5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  }
];

const Favorites = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { favorites, removeFromFavorites } = useFavorites();
  
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  
  useEffect(() => {
    // Filter properties to only include those in favorites
    // In a real app, this would fetch from API based on favorite IDs
    const favProps = mockProperties.filter(prop => 
      favorites.includes(prop.id)
    );
    setFavoriteProperties(favProps);
  }, [favorites]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleRemoveFavorite = (e, propertyId) => {
    e.stopPropagation();
    removeFromFavorites(propertyId);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, mb: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={handleBack} edge="start" sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6">
          {t('more.favorites')}
        </Typography>
      </Box>

      {favoriteProperties.length === 0 ? (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '50vh' 
          }}
        >
          <Favorite sx={{ fontSize: 60, color: 'grey.300', mb: 2 }} />
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {t('favorites.empty')}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
          >
            {t('favorites.browseProperties')}
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {favoriteProperties.map((property) => (
            <Grid item xs={12} key={property.id}>
              <Card 
                sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  height: { sm: 180 }
                }}
              >
                <CardActionArea 
                  onClick={() => handlePropertyClick(property.id)}
                  sx={{
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'stretch',
                    height: '100%',
                    width: '100%'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: { xs: '100%', sm: 180 }, 
                      height: { xs: 180, sm: '100%' } 
                    }}
                    image={property.image}
                    alt={property.title}
                  />
                  <CardContent sx={{ flex: 1, position: 'relative' }}>
                    <IconButton
                      onClick={(e) => handleRemoveFavorite(e, property.id)}
                      sx={{ 
                        position: 'absolute', 
                        top: 8, 
                        right: 8,
                        color: 'error.main'
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                    
                    <Typography variant="h6" component="div" noWrap>
                      {property.title}
                    </Typography>
                    
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      {property.place}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', mt: 1 }}>
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        <strong>{t(`propertyTypes.${property.propertyType}`)}</strong>
                      </Typography>
                      <Typography variant="body2">
                        <strong>{property.size}</strong> {t('units.sqm')}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Typography variant="h6" color="primary" fontWeight="bold">
                      {property.price.toLocaleString()} {t('units.egp')}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
