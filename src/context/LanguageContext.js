import React, { createContext, useContext, useEffect } from 'react';
import i18n from '../i18n';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  useEffect(() => {
    // Set document direction to RTL for Arabic
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  return (
    <LanguageContext.Provider value={{ language: 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
