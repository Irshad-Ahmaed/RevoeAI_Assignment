"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/authContext';
import LoginForm from '@/app/components/Auth/LoginForm';

export default function Login() {
  const router = useRouter();

  const [error, setError] = useState('');
  const { user, setUser } = useAuth();

  useEffect(()=>{
    if(user){
      router.push('/pages/dashboard');
    }
  }, [user])

  const handleLogin = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password
      });

      if (res.status === 200) {
        setUser(res.data.user); // Setting user object directly
        localStorage.setItem('token', res.data.token);
        router.push('/pages/dashboard');
      } else {
        setError('Invalid Credentials failed');
      }
    } catch (error) {
      // Set error message as a string
      setError(error.response?.data?.message || 'Invalid Credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <LoginForm onSubmit={handleLogin} error={error} />
    </div>
  );
}
