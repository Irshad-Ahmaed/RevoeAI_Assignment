"use client"
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AouthContext';
import Link from 'next/link';

export default function Navbar() {
  const {user, logout} = useAuth();
  
  return (
    <>
    {
      user &&
      <nav className="p-4 text-white shadow">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/pages/dashboard">
            <span className="text-3xl font-bold cursor-pointer text-gray-700">EXCEL <span className='text-blue-400'>READER</span></span>
          </Link>
          <div>
            <Button className="cursor-pointer hover:scale-95 duration-200 transition-all" onClick={logout}>Logout</Button>
          </div>
        </div>
      </nav>
    }
    </>
  );
}