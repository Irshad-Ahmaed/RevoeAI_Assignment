"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AouthContext';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching Data from Google sheet
  // useEffect(() => {
  //   // Initialize SSE connection
  //   if (user) {
  //     const eventSource = new EventSource('/api/sse');
  //     console.log('event', eventSource);

  //     eventSource.onmessage = (event) => {
  //       const newData = JSON.parse(event.data);
  //       console.log('Received data:', newData);
  //       setData(newData);
  //       setLoading(false);
  //     };

  //     console.log('onMess');

  //     eventSource.onerror = (error) => {
  //       console.error('SSE error:', error);
  //       setError('Failed to connect to the server');
  //       setLoading(false);
  //       eventSource.close();
  //     };

  //     console.log('Error');
  //     // Cleanup SSE connection on unmount
  //     return () => {
  //       eventSource.close();
  //     };
  //   }
  // }, [user]);

  const fetchData = async () => {
    try {
      const res = await axios.get('/api/google-sheets');
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data);
        setError(null);
      } else {
        console.error('Failed to fetch data from Google Sheets');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data immediately
    fetchData();

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [user]);
  
  

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);