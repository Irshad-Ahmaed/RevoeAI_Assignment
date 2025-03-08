"use client"
import AddColumnModal from '@/app/components/Dashboard/AddColumnModal';
import Table from '@/app/components/Dashboard/Table';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useAuth } from '@/context/authContext';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    if(user){
      fetch('/api/google-sheets')
      .then((res) => res.json())
      .then((data) => setData(data));
    }
  }, []);

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const res = await axios.get('/api/auth/user', {});

  //       if (res.ok) {
  //         const data = await res.json();
  //         console.log('data', res);
  //         // setUserDetails(data);
  //       } else {
  //         console.error('Failed to fetch user details');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user details:', error);
  //     }
  //   };

  //   if (token || user) {
  //     fetchUserDetails();
  //   }
  // }, [token, user]);

  const handleAddColumn = (column) => {
    setColumns([...columns, column]);
  };

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <AddColumnModal onAddColumn={handleAddColumn} />
        <Table data={data} columns={columns} />
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
}