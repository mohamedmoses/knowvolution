import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './i18n';

// Import contexts
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';

// Import pages (we'll create these next)
import Home from './pages/Home';
import MapView from './pages/MapView';
import Chat from './pages/Chat';
import More from './pages/More';
import PropertyDetails from './pages/PropertyDetails';
import Account from './pages/Account';
import Favorites from './pages/Favorites';
import Privacy from './pages/Privacy';
import About from './pages/About';

// Import components (we'll create these next)
import Navigation from './components/Navigation';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chat/:propertyId" element={<Chat />} />
                <Route path="/more" element={<More />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/account" element={<Account />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<About />} />
              </Routes>
              <Navigation />
            </div>
          </Router>
        </FavoritesProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
