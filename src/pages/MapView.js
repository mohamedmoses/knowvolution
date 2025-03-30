import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Paper, TextField, InputAdornment, IconButton, Typography, Drawer } from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useNavigate, useLocation } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Temporary mock data for properties (same data as in Home.js)
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

// Helper component to set map view based on property ID
const MapController = ({ properties, selectedPropertyId }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPropertyId) {
      const property = properties.find(p => p.id === selectedPropertyId);
      if (property && property.location) {
        map.setView([property.location.lat, property.location.lng], 15, {
          animate: true,
          duration: 1
        });
      }
    }
  }, [map, properties, selectedPropertyId]);

  return null;
};

const MapView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  
  // Center map on Cairo, Egypt
  const defaultCenter = [30.044420, 31.235712];

  // Extract propertyId from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const propertyId = queryParams.get('propertyId');
    if (propertyId) {
      setSelectedPropertyId(propertyId);
    }
  }, [location.search]);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  const handleMarkerClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <Box sx={{ height: 'calc(100vh - 56px)', width: '100%', position: 'relative' }}>
      {/* Search and Filter Controls */}
      <Box sx={{ position: 'absolute', top: 10, left: 10, right: 10, zIndex: 1000 }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <TextField
            sx={{ ml: 1, flex: 1 }}
            placeholder={t('search.byPlace')}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
          <IconButton 
            color="primary" 
            sx={{ p: '10px' }} 
            aria-label={t('search.filter')}
            onClick={toggleFilter}
          >
            <FilterList />
          </IconButton>
        </Paper>
      </Box>

      {/* Map */}
      <MapContainer 
        center={defaultCenter} 
        zoom={12} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map controller to set view based on selected property */}
        <MapController properties={mockProperties} selectedPropertyId={selectedPropertyId} />
        
        {mockProperties.map(property => (
          <Marker 
            key={property.id} 
            position={[property.location.lat, property.location.lng]}
            eventHandlers={{
              click: () => handleMarkerClick(property.id),
            }}
          >
            <Popup>
              <Typography variant="subtitle2">{property.title}</Typography>
              <Typography variant="body2">
                {property.price.toLocaleString()} {t('units.egp')}
              </Typography>
              <Typography variant="body2">
                {t('property.size')}: {property.size} {t('units.sqm')}
              </Typography>
              {property.bedroomNumbers > 0 && (
                <Typography variant="body2">
                  {t('property.bedroomNumbers')}: {property.bedroomNumbers}
                </Typography>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Filter Drawer - similar to the one in Home.js */}
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
          {/* Filter content - simplified for now */}
          <Typography variant="body2">
            This is a placeholder for the filter panel. In the real implementation, this would contain the same filter options as on the Home page.
          </Typography>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MapView;
