import React, { createContext, useState, useEffect } from 'react';
import { fetchPortfolioData } from '../api';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    profile: [],
    about: [],
    experience: [],
    skills: [],
    projects: [],
    services: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const fetchedData = await fetchPortfolioData();
      if (fetchedData) {
        setData(fetchedData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error, reloadData: loadData }}>
      {children}
    </DataContext.Provider>
  );
};
