"use client"
import AddColumnModal from '@/app/components/Dashboard/AddColumnModal';
import Table from '@/app/components/Dashboard/Table';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useAuth } from '@/context/AouthContext';
import { useData } from '@/context/DataContext';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const {data, loading, error} = useData();
  const [columns, setColumns] = useState([]);

  // Fetch data from Google Sheets

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const res = await fetch('/api/columns');
        if (res.ok) {
          const data = await res.json();
          setColumns(data);
        } else {
          console.error('Failed to fetch columns');
        }
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };
  
    fetchColumns();
  }, [data]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const handleAddColumn = async (column) => {
    try {
      const res = await fetch('/api/columns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(column),
      });
  
      if (res.ok) {
        setColumns([...columns, column]);
      } else {
        console.error('Failed to save column');
      }
    } catch (error) {
      console.error('Error saving column:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6 flex flex-col gap-10">
        <h1 className="text-3xl underline font-bold mb-6 text-gray-600">Dashboard</h1>
        <AddColumnModal onAddColumn={handleAddColumn} />
        <Table data={data} columns={columns} />
      </div>
    </ProtectedRoute>
  );
}