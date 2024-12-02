import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = {
  id: string;
  name: string;
  native_name: string;
};

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, string>;
  availableLanguages: Language[];
  translate: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ru');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      setCurrentLanguage(savedLang);
    }

    // Fetch available languages
    const fetchLanguages = async () => {
      const { data: languages } = await supabase
        .from('languages')
        .select('*');
      if (languages) {
        setAvailableLanguages(languages);
      }
    };

    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchTranslations = async () => {
      const { data: translations } = await supabase
        .from('translations')
        .select('key, value')
        .eq('language_id', currentLanguage);

      if (translations) {
        const translationsMap = translations.reduce((acc, { key, value }) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        setTranslations(translationsMap);
      }
    };

    fetchTranslations();
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang);
  };

  const translate = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setLanguage,
      translations,
      availableLanguages,
      translate
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};