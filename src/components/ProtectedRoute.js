'use client'; // 👈 must be the first line

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { restoreSession } from '@/store/slices/authSlice';

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      dispatch(restoreSession());
    }
    const storedToken = localStorage.getItem('token');
    
    if (!storedToken) {
      router.push('/login');
    }
  }, [token, dispatch, router]);

  if (!isAuthenticated && !localStorage.getItem('token')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
