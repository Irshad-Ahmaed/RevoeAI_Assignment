"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authContext';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const {user} = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from Google Sheets
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/google-sheets');
        console.log(res);
        if (res.status == 200) {
          const result = res.data;
          console.log('result', result);
          setData(result);
          setError(null);
        } else {
          console.error('Failed to fetch data from Google Sheets');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if(user) fetchData();

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use DataContext
export const useData = () => useContext(DataContext);