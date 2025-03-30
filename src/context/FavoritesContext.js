import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Fetch user's favorites when auth state changes
  useEffect(() => {
    const fetchFavorites = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFavorites(userData.favorites || []);
          }
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      } else {
        // User not logged in, check local storage
        const localFavorites = localStorage.getItem('favorites');
        if (localFavorites) {
          setFavorites(JSON.parse(localFavorites));
        } else {
          setFavorites([]);
        }
      }
      setLoading(false);
    };

    fetchFavorites();
  }, [currentUser]);

  // Add property to favorites
  const addToFavorites = async (propertyId) => {
    if (favorites.includes(propertyId)) return;
    
    try {
      if (currentUser) {
        // User is logged in, update Firestore
        await updateDoc(doc(db, 'users', currentUser.uid), {
          favorites: arrayUnion(propertyId)
        });
      } else {
        // User not logged in, update local storage
        const updatedFavorites = [...favorites, propertyId];
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
      
      setFavorites(prev => [...prev, propertyId]);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  // Remove property from favorites
  const removeFromFavorites = async (propertyId) => {
    if (!favorites.includes(propertyId)) return;
    
    try {
      if (currentUser) {
        // User is logged in, update Firestore
        await updateDoc(doc(db, 'users', currentUser.uid), {
          favorites: arrayRemove(propertyId)
        });
      } else {
        // User not logged in, update local storage
        const updatedFavorites = favorites.filter(id => id !== propertyId);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      }
      
      setFavorites(prev => prev.filter(id => id !== propertyId));
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  // Check if a property is in favorites
  const isFavorite = (propertyId) => {
    return favorites.includes(propertyId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    loading
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
