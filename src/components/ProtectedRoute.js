// 'use client'; // 👈 must be the first line

// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import { restoreSession } from '@/store/slices/authSlice';

// export default function ProtectedRoute({ children }) {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { isAuthenticated, token } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!token) {
//       dispatch(restoreSession());
//     }
//     const storedToken = localStorage.getItem('token');
    
//     if (!storedToken) {
//       router.push('/login');
//     }
//   }, [token, dispatch, router]);

//   if (!isAuthenticated && !localStorage?.getItem('token')) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }


'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { restoreSession } from '@/store/slices/authSlice';

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (!token) {
      dispatch(restoreSession());
    }

    const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!storedToken) {
      router.push('/login');
    }
  }, [token, dispatch, router, isClient]);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EFF1F3' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4" style={{ borderColor: '#4E6E5D' }}></div>
          <p className="text-lg font-medium" style={{ color: '#4E6E5D' }}>Loading...</p>
        </div>
      </div>
    );
  }

  const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!isAuthenticated && !storedToken) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EFF1F3' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4" style={{ borderColor: '#4E6E5D' }}></div>
          <p className="text-lg font-medium" style={{ color: '#4E6E5D' }}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}