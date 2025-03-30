import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  Grid,
  Divider,
  Paper,
  Dialog,
  AppBar,
  Toolbar,
  Slide
} from '@mui/material';
import {
  ArrowBack,
  Share,
  FavoriteBorder,
  Favorite,
  WhatsApp,
  Message,
  Close,
  Apartment,
  KingBed,
  Bathtub,
  AttachMoney,
  LocationOn
} from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useFavorites } from '../context/FavoritesContext';

// Mock property data
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
    description: 'شقة فاخرة في القاهرة الجديدة، مكونة من 3 غرف نوم و2 حمام ومطبخ وصالة واسعة. الشقة جاهزة للسكن وتطل على حديقة.',
    additionalServices: ['حديقة', 'أمن', 'موقف سيارات', 'تكييف مركزي'],
    images: [
      'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1560448075-cbc97c4e0097?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    ]
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
    description: 'مطعم جاهز للإيجار في مدينة نصر، يقع في منطقة حيوية ذات كثافة سكانية عالية. المطعم مجهز بالكامل ويشمل مطبخ واسع و2 حمام.',
    additionalServices: ['مطبخ مجهز', 'موقف سيارات', 'واجهة زجاجية'],
    images: [
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80'
    ]
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
    description: 'قاعة احتفالات واسعة في المعادي، مناسبة للأفراح والمناسبات المختلفة. القاعة مجهزة بالكامل وتتسع لـ 300 شخص.',
    additionalServices: ['تكييف مركزي', 'نظام صوت', 'إضاءة', 'موقف سيارات كبير', 'مدخل خاص'],
    images: [
      'https://images.unsplash.com/photo-1602870045259-82a41de3ad5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      'https://images.unsplash.com/photo-1593526613712-7b4b8c90d0a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1587825045005-c9ae16d1417d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    ]
  }
];

// Transition for fullscreen image dialog
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PropertyDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  useEffect(() => {
    // In a real app, this would fetch property data from API
    // For now, simulate an API call with setTimeout
    setLoading(true);
    setTimeout(() => {
      const foundProperty = mockProperties.find(p => p.id === id);
      setProperty(foundProperty || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    if (!property) return;
    
    const shareText = `${property.title} - ${property.price.toLocaleString()} ${t('units.egp')} - ${property.place}`;
    
    if (navigator.share) {
      navigator.share({
        title: t('app.name'),
        text: shareText,
        url: window.location.href,
      });
    } else {
      // Fallback
      alert(t('actions.share') + ': ' + shareText);
    }
  };

  const handleFavoriteToggle = () => {
    if (!property) return;
    
    if (isFavorite(property.id)) {
      removeFromFavorites(property.id);
    } else {
      addToFavorites(property.id);
    }
  };

  const handleWhatsAppClick = () => {
    if (!property) return;
    
    const message = encodeURIComponent(`مرحبا أزرقي، عندي استفسار بخصوص العقار # ${property.id}`);
    window.open(`https://wa.me/201554134209?text=${message}`, '_blank');
  };

  const handleChatClick = () => {
    if (!property) return;
    navigate(`/chat/${property.id}`);
  };

  const handleImageClick = (index) => {
    setFullscreenIndex(index);
    setFullscreenOpen(true);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 2, mb: 8, minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>جاري التحميل...</Typography>
      </Container>
    );
  }

  if (!property) {
    return (
      <Container maxWidth="md" sx={{ mt: 2, mb: 8, minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>العقار غير موجود</Typography>
      </Container>
    );
  }

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        {/* App bar */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, p: 2, display: 'flex', justifyContent: 'space-between' }}>
          <IconButton 
            onClick={handleBack} 
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)' }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <IconButton 
              onClick={handleShare} 
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)', mr: 1 }}
            >
              <Share />
            </IconButton>
            <IconButton 
              onClick={handleFavoriteToggle} 
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)' }}
            >
              {isFavorite(property.id) ? <Favorite color="error" /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </Box>
        
        {/* Property images */}
        <Box sx={{ mb: 2 }}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            style={{ height: '300px' }}
          >
            {property.images.map((image, index) => (
              <SwiperSlide key={index} onClick={() => handleImageClick(index)}>
                <Box
                  sx={{
                    height: '300px',
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    cursor: 'pointer'
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        
        <Container maxWidth="md" sx={{ mb: 8 }}>
          {/* Property ID badge */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: -3, 
            mb: 3, 
            position: 'relative', 
            zIndex: 2 
          }}>
            <Paper 
              elevation={3} 
              sx={{ 
                px: 2, 
                py: 1, 
                bgcolor: 'primary.main', 
                color: 'white', 
                borderRadius: '20px' 
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                {t('property.id')}: {property.id}
              </Typography>
            </Paper>
          </Box>

          {/* Property title and price */}
          <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
            {property.title}
          </Typography>
          
          <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
            {property.price.toLocaleString()} {t('units.egp')}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" component="span" sx={{ mr: 2 }}>
              {t(`serviceTypes.${property.serviceType}`)}
            </Typography>
            <Typography variant="subtitle1" component="span">
              {t(`propertyTypes.${property.propertyType}`)}
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          {/* Property details */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
              <Apartment color="primary" />
              <Typography variant="body2" color="textSecondary">
                {t('property.size')}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {property.size} {t('units.sqm')}
              </Typography>
            </Grid>
            
            {property.bedroomNumbers > 0 && (
              <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
                <KingBed color="primary" />
                <Typography variant="body2" color="textSecondary">
                  {t('property.bedroomNumbers')}
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {property.bedroomNumbers}
                </Typography>
              </Grid>
            )}
            
            <Grid item xs={4} display="flex" flexDirection="column" alignItems="center">
              <Bathtub color="primary" />
              <Typography variant="body2" color="textSecondary">
                {t('property.bathroomNumbers')}
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {property.bathroomNumbers}
              </Typography>
            </Grid>
          </Grid>
          
          {/* Property place */}
          <Paper 
            elevation={1} 
            sx={{ 
              p: 2, 
              mb: 3, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
            onClick={() => navigate(`/map?propertyId=${property.id}`)}
          >
            <Box display="flex" alignItems="center">
              <LocationOn color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {t('property.place')}: {property.place}
              </Typography>
            </Box>
            <Typography variant="body2" color="primary">
              {t('actions.viewOnMap')}
            </Typography>
          </Paper>
          
          {/* Property description */}
          <Typography variant="h6" gutterBottom>
            الوصف
          </Typography>
          <Typography variant="body1" paragraph>
            {property.description}
          </Typography>
          
          {/* Additional services */}
          {property.additionalServices && property.additionalServices.length > 0 && (
            <>
              <Typography variant="h6" gutterBottom>
                {t('filter.otherServices')}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {property.additionalServices.map((service, index) => (
                  <Paper key={index} sx={{ px: 2, py: 1 }}>
                    <Typography variant="body2">{service}</Typography>
                  </Paper>
                ))}
              </Box>
            </>
          )}
          
          {/* Contact buttons */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Button 
                variant="contained" 
                fullWidth 
                startIcon={<WhatsApp />}
                onClick={handleWhatsAppClick}
              >
                WhatsApp
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button 
                variant="outlined" 
                fullWidth
                startIcon={<Message />}
                onClick={handleChatClick}
              >
                {t('actions.chat')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Fullscreen image dialog */}
      <Dialog
        fullScreen
        open={fullscreenOpen}
        onClose={() => setFullscreenOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'fixed', top: 0, bgcolor: 'black' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setFullscreenOpen(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {property.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ 
          bgcolor: 'black', 
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 8, // To account for the AppBar
        }}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            style={{ width: '100%', height: '80%' }}
            initialSlide={fullscreenIndex}
          >
            {property.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={image}
                    alt={`${property.title} - Image ${index + 1}`}
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Dialog>
    </>
  );
};

export default PropertyDetails;
