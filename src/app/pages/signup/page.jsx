"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/app/components/Auth/SignupForm';
import axios from 'axios';

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState('');


  const handleSignup = async (name, email, password) => {
    try {
      const res = await axios.post('/api/auth/signup', {
        name,
        email,
        password
      })

      if (res.status === 201) {
        router.push('/pages/login');
      } else {
        setError('Signup failed');
      }
    } catch (error) {
      setError('Signup failed');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-500">
      <SignupForm onSubmit={handleSignup} error={error} />
    </div>
  );
}
