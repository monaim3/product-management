'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser, clearError } from '@/store/slices/authSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);
 
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/products');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');

    // Validation
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    const result = await dispatch(loginUser(email));
    
    if (loginUser.fulfilled.match(result)) {
      router.push('/products');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #EFF1F3 0%, #4E6E5D 100%)' }}>
      <div className="max-w-md w-full">
        <div className="rounded-2xl shadow-2xl p-8" style={{ backgroundColor: '#EFF1F3' }}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#4E6E5D' }}>
              <svg className="w-8 h-8" style={{ color: '#EFF1F3' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#0D1821' }}>Welcome Back</h1>
            <p style={{ color: '#4E6E5D' }}>Sign in to manage your products</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#0D1821' }}>
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                  if (error) dispatch(clearError());
                }}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                style={{
                  backgroundColor: '#ffffff',
                  border: emailError || error ? '2px solid #A44A3F' : '2px solid #4E6E5D',
                  color: '#0D1821'
                }}
                onFocus={(e) => {
                  if (!emailError && !error) {
                    e.target.style.borderColor = '#AD8A64';
                    e.target.style.boxShadow = '0 0 0 3px rgba(173, 138, 100, 0.1)';
                  }
                }}
                onBlur={(e) => {
                  if (!emailError && !error) {
                    e.target.style.borderColor = '#4E6E5D';
                    e.target.style.boxShadow = 'none';
                  }
                }}
                disabled={isLoading}
              />
              {emailError && (
                <p className="mt-2 text-sm flex items-center" style={{ color: '#A44A3F' }}>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {emailError}
                </p>
              )}
              {error && (
                <p className="mt-2 text-sm flex items-center" style={{ color: '#A44A3F' }}>
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: '#4E6E5D',
                color: '#EFF1F3'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#AD8A64';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.backgroundColor = '#4E6E5D';
                }
              }}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm" style={{ color: '#4E6E5D' }}>
            <p>Use your registered email to sign in</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;