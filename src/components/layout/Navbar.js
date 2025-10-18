'use client';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '@/store/slices/authSlice';
import Link from 'next/link';
import { LogOut, Package, User } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { email } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <nav className="shadow-lg sticky top-0 z-50" style={{ backgroundColor: '#0D1821' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
                style={{ backgroundColor: '#4E6E5D' }}
              >
                <Package className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: '#EFF1F3' }} />
              </div>
              <Link href="/">
                <span className="text-xl sm:text-2xl font-bold cursor-pointer transition-colors duration-200" 
                  style={{ color: '#EFF1F3' }}
                  onMouseEnter={(e) => e.target.style.color = '#AD8A64'}
                  onMouseLeave={(e) => e.target.style.color = '#EFF1F3'}
                >
                  Product Store
                </span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {email && (
              <div 
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{ backgroundColor: 'rgba(239, 241, 243, 0.1)' }}
              >
                <User className="w-4 h-4" style={{ color: '#AD8A64' }} />
                <span className="text-sm font-medium" style={{ color: '#EFF1F3' }}>
                  {email}
                </span>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-lg"
              style={{
                backgroundColor: '#A44A3F',
                color: '#EFF1F3'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#4E6E5D';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#A44A3F';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Email Display */}
      {email && (
        <div 
          className="sm:hidden px-4 pb-3 flex items-center gap-2"
          style={{ backgroundColor: 'rgba(239, 241, 243, 0.05)' }}
        >
          <User className="w-3 h-3" style={{ color: '#AD8A64' }} />
          <span className="text-xs font-medium" style={{ color: '#EFF1F3', opacity: 0.9 }}>
            {email}
          </span>
        </div>
      )}
    </nav>
  );
}

export default Navbar;