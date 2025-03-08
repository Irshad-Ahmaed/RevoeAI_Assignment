import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined' || !router.isReady) return; // Ensure the code runs only on the client side and router is ready
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          router.push('/login');
        } else {
          setUser(decoded);
        }
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return { user, logout };
}