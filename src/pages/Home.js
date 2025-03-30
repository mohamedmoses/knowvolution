import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment, 
  IconButton,
  Container,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Drawer,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Divider
} from '@mui/material';
import { 
  Search, 
  FilterList, 
  FavoriteBorder, 
  Favorite, 
  Share, 
  WhatsApp, 
  Message,
  Apartment,
  KingBed,
  Bathtub,
  MeetingRoom,
  LocalParking
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

// Temporary mock data for properties
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
    roomNumbers: 5,
    parkingSpots: 1,
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
    roomNumbers: 3,
    parkingSpots: 2,
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
    roomNumbers: 6,
    parkingSpots: 10,
    image: 'https://images.unsplash.com/photo-1602870045259-82a41de3ad5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
  }
];

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [serviceTypeFilter, setServiceTypeFilter] = useState('');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [bedroomFilter, setBedroomFilter] = useState('');
  const [bathroomFilter, setBathroomFilter] = useState('');
  const [properties, setProperties] = useState(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  // Apply filters to properties
  const applyFilters = () => {
    let result = [...mockProperties];
    
    // Filter by search query (place or title)
    if (searchQuery) {
      result = result.filter(property => 
        property.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by service type
    if (serviceTypeFilter) {
      result = result.filter(property => property.serviceType === serviceTypeFilter);
    }
    
    // Filter by property type
    if (propertyTypeFilter) {
      result = result.filter(property => property.propertyType === propertyTypeFilter);
    }
    
    // Filter by price range
    result = result.filter(property => 
      property.price >= priceRange[0] && property.price <= priceRange[1]
    );
    
    // Filter by bedrooms
    if (bedroomFilter) {
      if (bedroomFilter === '4+') {
        result = result.filter(property => property.bedroomNumbers >= 4);
      } else {
        const bedroomCount = parseInt(bedroomFilter);
        result = result.filter(property => property.bedroomNumbers === bedroomCount);
      }
    }
    
    // Filter by bathrooms
    if (bathroomFilter) {
      if (bathroomFilter === '4+') {
        result = result.filter(property => property.bathroomNumbers >= 4);
      } else {
        const bathroomCount = parseInt(bathroomFilter);
        result = result.filter(property => property.bathroomNumbers === bathroomCount);
      }
    }
    
    setFilteredProperties(result);
    setFilterOpen(false); // Close the filter drawer
  };

  // Effect to update filtered properties when search query changes
  useEffect(() => {
    // Apply just the search filter for real-time search results
    let result = [...mockProperties];
    
    if (searchQuery) {
      result = result.filter(property => 
        property.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProperties(result);
  }, [searchQuery]);

  // Filter button handler
  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Handle service type filter change in the filter drawer
  const handleServiceTypeFilterChange = (e) => {
    setServiceTypeFilter(e.target.value);
  };

  // Handle service type filter change in the toggle button group
  const handleServiceTypeChange = (event, newServiceType) => {
    setServiceTypeFilter(newServiceType);
    
    // Apply filter immediately when using the toggle buttons
    let result = [...mockProperties];
    
    if (newServiceType) {
      result = result.filter(property => property.serviceType === newServiceType);
    }
    
    if (searchQuery) {
      result = result.filter(property => 
        property.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProperties(result);
  };

  // Handle property card click
  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  // Handle favorite toggle
  const handleFavoriteToggle = (e, propertyId) => {
    e.stopPropagation();
    if (isFavorite(propertyId)) {
      removeFromFavorites(propertyId);
    } else {
      addToFavorites(propertyId);
    }
  };

  // Handle share click
  const handleShare = (e, property) => {
    e.stopPropagation();
    // Implement sharing functionality
    const shareText = `${property.title} - ${property.price} ${t('units.egp')} - ${property.place}`;
    // Open native share dialog if available
    if (navigator.share) {
      navigator.share({
        title: t('app.name'),
        text: shareText,
        url: window.location.origin + '/property/' + property.id,
      });
    } else {
      // Fallback
      alert(t('actions.share') + ': ' + shareText);
    }
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = (e, property) => {
    e.stopPropagation();
    const message = encodeURIComponent(`مرحبا أزرقي، عندي استفسار بخصوص العقار # ${property.id}`);
    window.open(`https://wa.me/201554134209?text=${message}`, '_blank');
  };

  // Handle chat click
  const handleChatClick = (e, propertyId) => {
    e.stopPropagation();
    navigate(`/chat/${propertyId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 8, pt: 2 }}>
      {/* Logo and App Name */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <img src="/Logo.png" alt={t('app.name')} style={{ width: 40, height: 40, marginRight: 8 }} />
        <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
          {t('app.name')}
        </Typography>
      </Box>

      {/* Search Bar */}
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 2 }}
      >
        <TextField
          sx={{ ml: 1, flex: 1 }}
          placeholder={t('search.byPlace')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <Search />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton 
          color="primary" 
          sx={{ p: '10px' }} 
          aria-label={t('search.filter')}
          onClick={toggleFilter}
        >
          <FilterList />
        </IconButton>
      </Paper>

      {/* Simple Filter */}
      <Box mb={3}>
        <ToggleButtonGroup
          value={serviceTypeFilter}
          exclusive
          onChange={handleServiceTypeChange}
          aria-label="service type filter"
          fullWidth
        >
          <ToggleButton value="sale" aria-label="sale">
            {t('serviceTypes.sale')}
          </ToggleButton>
          <ToggleButton value="rent" aria-label="rent">
            {t('serviceTypes.rent')}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Property List */}
      <Grid container spacing={2}>
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card 
                elevation={3} 
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => handlePropertyClick(property.id)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={property.image}
                    alt={property.title}
                  />
                  <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <IconButton 
                      sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)' }}
                      onClick={(e) => handleFavoriteToggle(e, property.id)}
                    >
                      {isFavorite(property.id) ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>
                  <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                    <IconButton 
                      sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)' }}
                      onClick={(e) => handleShare(e, property)}
                    >
                      <Share />
                    </IconButton>
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {property.place}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Apartment fontSize="small" />
                      <Typography variant="body2">{property.size} {t('units.sqm')}</Typography>
                    </Box>
                    {property.roomNumbers > 0 && (
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <MeetingRoom fontSize="small" />
                        <Typography variant="body2">{property.roomNumbers}</Typography>
                      </Box>
                    )}
                    {property.bedroomNumbers > 0 && (
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <KingBed fontSize="small" />
                        <Typography variant="body2">{property.bedroomNumbers}</Typography>
                      </Box>
                    )}
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <Bathtub fontSize="small" />
                      <Typography variant="body2">{property.bathroomNumbers}</Typography>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    {property.parkingSpots > 0 && (
                      <Box display="flex" alignItems="center" gap={0.5}>
                        <LocalParking fontSize="small" />
                        <Typography variant="body2">{property.parkingSpots}</Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography variant="h6" component="div" fontWeight="bold">
                    {property.price.toLocaleString()} {t('units.egp')}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
                  <Button 
                    size="small" 
                    color="primary" 
                    startIcon={<WhatsApp />}
                    onClick={(e) => handleWhatsAppClick(e, property)}
                  >
                    WhatsApp
                  </Button>
                  <Button 
                    size="small" 
                    color="primary" 
                    startIcon={<Message />}
                    onClick={(e) => handleChatClick(e, property.id)}
                  >
                    {t('actions.chat')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="text.secondary">
                {t('search.noResults')}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={toggleFilter}
      >
        <Box
          sx={{ width: 300 }}
          role="presentation"
          p={3}
        >
          <Typography variant="h6" gutterBottom>{t('search.filter')}</Typography>
          
          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">{t('property.serviceType')}</FormLabel>
            <RadioGroup
              row
              value={serviceTypeFilter}
              onChange={handleServiceTypeFilterChange}
            >
              <FormControlLabel value="sale" control={<Radio />} label={t('serviceTypes.sale')} />
              <FormControlLabel value="rent" control={<Radio />} label={t('serviceTypes.rent')} />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
            <FormLabel component="legend">{t('property.type')}</FormLabel>
            <RadioGroup
              value={propertyTypeFilter}
              onChange={(e) => setPropertyTypeFilter(e.target.value)}
            >
              <FormControlLabel value="apartment" control={<Radio />} label={t('propertyTypes.apartment')} />
              <FormControlLabel value="restaurant" control={<Radio />} label={t('propertyTypes.restaurant')} />
              <FormControlLabel value="hall" control={<Radio />} label={t('propertyTypes.hall')} />
              <FormControlLabel value="pharmacy" control={<Radio />} label={t('propertyTypes.pharmacy')} />
              <FormControlLabel value="school" control={<Radio />} label={t('propertyTypes.school')} />
            </RadioGroup>
          </FormControl>

          <Box sx={{ mb: 3 }}>
            <Typography id="price-range-slider" gutterBottom>
              {t('filter.priceRange')}
            </Typography>
            <Slider
              value={priceRange}
              onChange={(e, newValue) => setPriceRange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={5000000}
              step={100000}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2">{priceRange[0].toLocaleString()} {t('units.egp')}</Typography>
              <Typography variant="body2">{priceRange[1].toLocaleString()} {t('units.egp')}</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <FormLabel component="legend">{t('property.bedroomNumbers')}</FormLabel>
              <RadioGroup 
                row
                value={bedroomFilter}
                onChange={(e) => setBedroomFilter(e.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4+" control={<Radio />} label="4+" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <FormLabel component="legend">{t('property.bathroomNumbers')}</FormLabel>
              <RadioGroup 
                row
                value={bathroomFilter}
                onChange={(e) => setBathroomFilter(e.target.value)}
              >
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4+" control={<Radio />} label="4+" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Button variant="contained" fullWidth onClick={applyFilters}>
            {t('actions.applyFilter')}
          </Button>
        </Box>
      </Drawer>
    </Container>
  );
};

export default Home;
