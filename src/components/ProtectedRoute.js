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
    // Try to restore session from localStorage
    if (!token) {
      dispatch(restoreSession());
    }

    // Check if token exists in localStorage
    const storedToken = localStorage.getItem('token');
    
    if (!storedToken) {
      router.push('/login');
    }
  }, [token, dispatch, router]);

  // Show loading spinner while checking auth
  if (!isAuthenticated && !localStorage.getItem('token')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
