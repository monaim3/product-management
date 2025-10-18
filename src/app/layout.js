'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';

import './globals.css';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbar = pathname === '/login'; 

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
           <Toaster position="top-right" />
          {!hideNavbar && <Navbar />}

          <main className="min-h-screen">{children}</main>
           {!hideNavbar && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
