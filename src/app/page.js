"use client"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AouthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const {user} = useAuth();

  const handlePage = () => {
    if(user){
      router.push('/pages/dashboard')
    } else{
      router.push('/pages/login')
    }
  }
  return (
    <div className="flex flex-col items-center pt-[10%] h-screen text-white text-3xl bg-gray-400">
      <span>WELCOME TO EXCEL READER</span>
      <Button 
        onClick={handlePage}
        className="cursor-pointer px-16 py-5 mt-10 bg-gradient-to-l from-gray-500 to-black hover:from-black hover:to-gray-500 transition-colors duration-500 delay-200">
        Continue
      </Button>

    </div>
  );
}
