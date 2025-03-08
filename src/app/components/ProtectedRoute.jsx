// src/components/ProtectedRoute.js
import { useAuth } from '@/context/AouthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/pages/login'); // Redirect to login if not authenticated
    }
  }, [user, router]);

  return user ? children : null;
}