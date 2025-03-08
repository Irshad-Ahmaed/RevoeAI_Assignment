"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/authContext';

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <p className='text-center mt-2'>Don't have an account? <span onClick={() => router.push('/pages/signup')} className='text-blue-500 hover:underline hover:cursor-pointer'>Signup</span></p>
        </form>
      </div>
    </div>
  );
}
