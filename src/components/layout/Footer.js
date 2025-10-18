'use client';

import Link from 'next/link';
import { Package, Mail, Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto" style={{ backgroundColor: '#0D1821' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#4E6E5D' }}
              >
                <Package className="w-5 h-5" style={{ color: '#EFF1F3' }} />
              </div>
              <span className="text-xl font-bold" style={{ color: '#EFF1F3' }}>
                Product Store
              </span>
            </div>
            <p className="text-sm mb-4" style={{ color: '#EFF1F3', opacity: 0.8 }}>
              Your one-stop solution for product management. Simple, efficient, and powerful.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#AD8A64' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products">
                  <span 
                    className="text-sm cursor-pointer transition-colors duration-200 inline-block"
                    style={{ color: '#EFF1F3', opacity: 0.8 }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#AD8A64';
                      e.target.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#EFF1F3';
                      e.target.style.opacity = '0.8';
                    }}
                  >
                    Products
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products/create">
                  <span 
                    className="text-sm cursor-pointer transition-colors duration-200 inline-block"
                    style={{ color: '#EFF1F3', opacity: 0.8 }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#AD8A64';
                      e.target.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#EFF1F3';
                      e.target.style.opacity = '0.8';
                    }}
                  >
                    Add Product
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#AD8A64' }}>
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#"
                  className="text-sm transition-colors duration-200 inline-block"
                  style={{ color: '#EFF1F3', opacity: 0.8 }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#AD8A64';
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#EFF1F3';
                    e.target.style.opacity = '0.8';
                  }}
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-sm transition-colors duration-200 inline-block"
                  style={{ color: '#EFF1F3', opacity: 0.8 }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#AD8A64';
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#EFF1F3';
                    e.target.style.opacity = '0.8';
                  }}
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#"
                  className="text-sm transition-colors duration-200 inline-block"
                  style={{ color: '#EFF1F3', opacity: 0.8 }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#AD8A64';
                    e.target.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#EFF1F3';
                    e.target.style.opacity = '0.8';
                  }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: '#AD8A64' }}>
              Connect
            </h3>
            <div className="flex items-center gap-3">
              <a 
                href="#"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ backgroundColor: 'rgba(239, 241, 243, 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4E6E5D';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 241, 243, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Github className="w-5 h-5" style={{ color: '#EFF1F3' }} />
              </a>
              <a 
                href="#"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ backgroundColor: 'rgba(239, 241, 243, 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4E6E5D';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 241, 243, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Linkedin className="w-5 h-5" style={{ color: '#EFF1F3' }} />
              </a>
              <a 
                href="#"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ backgroundColor: 'rgba(239, 241, 243, 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4E6E5D';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 241, 243, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Twitter className="w-5 h-5" style={{ color: '#EFF1F3' }} />
              </a>
              <a 
                href="#"
                className="p-2 rounded-lg transition-all duration-200"
                style={{ backgroundColor: 'rgba(239, 241, 243, 0.1)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4E6E5D';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 241, 243, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Mail className="w-5 h-5" style={{ color: '#EFF1F3' }} />
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div 
          className="my-8 h-px"
          style={{ 
            background: 'linear-gradient(90deg, transparent, #4E6E5D, #AD8A64, #4E6E5D, transparent)'
          }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <p className="text-sm text-center sm:text-left" style={{ color: '#EFF1F3', opacity: 0.7 }}>
            © {currentYear} Product Store. All rights reserved.
          </p>
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;