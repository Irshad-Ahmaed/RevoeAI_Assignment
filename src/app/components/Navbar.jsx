import { useAuth } from '@/context/authContext';
import Link from 'next/link';

export default function Navbar() {
  const {logout} = useAuth();
  
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/dashboard">
          <span className="text-xl font-bold cursor-pointer">Dashboard</span>
        </Link>
        <div>
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}