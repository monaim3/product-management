'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const  HomePage=()=> {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    
    if (token) {
      router.push('/products');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );
}
export default HomePage;