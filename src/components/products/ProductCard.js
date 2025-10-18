'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit, Eye } from 'lucide-react';

export default function ProductCard({ product, onDelete }) {
  const router = useRouter();
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div 
      className="group rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      style={{ 
        backgroundColor: '#ffffff',
        border: '2px solid #EFF1F3'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#4E6E5D';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#EFF1F3';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div 
        className="relative h-48 sm:h-56 overflow-hidden cursor-pointer"
        onClick={() => router.push(`/products/${product.slug}`)}
        style={{ backgroundColor: '#EFF1F3' }}
      >
        {!imageError && product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-5xl sm:text-6xl">📦</div>
          </div>
        )}
        
        {product.category && (
          <div className="absolute top-3 left-3">
            <span 
              className="px-3 py-1.5 text-xs font-semibold rounded-full shadow-md backdrop-blur-sm"
              style={{ 
                backgroundColor: 'rgba(78, 110, 93, 0.95)',
                color: '#EFF1F3'
              }}
            >
              {product.category.name}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div 
            className="px-4 py-2 rounded-lg font-semibold text-sm shadow-lg backdrop-blur-sm"
            style={{ 
              backgroundColor: 'rgba(239, 241, 243, 0.95)',
              color: '#0D1821'
            }}
          >
            View Details
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 
          className="font-bold text-base sm:text-lg mb-2 line-clamp-2 cursor-pointer transition-colors duration-200 min-h-[3rem]"
          style={{ color: '#0D1821' }}
          onClick={() => router.push(`/products/${product.slug}`)}
          onMouseEnter={(e) => e.target.style.color = '#4E6E5D'}
          onMouseLeave={(e) => e.target.style.color = '#0D1821'}
        >
          {product.name}
        </h3>

        <p 
          className="text-xs sm:text-sm mb-4 line-clamp-2 min-h-[2.5rem]"
          style={{ color: '#4E6E5D' }}
        >
          {product.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between pt-4" style={{ borderTop: '2px solid #EFF1F3' }}>
          <div className="flex flex-col">
            <span className="text-xs font-medium mb-1" style={{ color: '#4E6E5D' }}>
              Price
            </span>
            <span className="text-lg sm:text-xl font-bold" style={{ color: '#AD8A64' }}>
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => router.push(`/products/${product.slug}`)}
              className="p-2 rounded-lg transition-all duration-200"
              style={{ backgroundColor: '#EFF1F3', color: '#4E6E5D' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4E6E5D';
                e.currentTarget.style.color = '#EFF1F3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF1F3';
                e.currentTarget.style.color = '#4E6E5D';
              }}
              title="View Details"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => router.push(`/products/${product.slug}/edit`)}
              className="p-2 rounded-lg transition-all duration-200"
              style={{ backgroundColor: '#EFF1F3', color: '#AD8A64' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#AD8A64';
                e.currentTarget.style.color = '#EFF1F3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF1F3';
                e.currentTarget.style.color = '#AD8A64';
              }}
              title="Edit Product"
            >
              <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => onDelete(product)}
              className="p-2 rounded-lg transition-all duration-200"
              style={{ backgroundColor: '#EFF1F3', color: '#A44A3F' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#A44A3F';
                e.currentTarget.style.color = '#EFF1F3';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#EFF1F3';
                e.currentTarget.style.color = '#A44A3F';
              }}
              title="Delete Product"
            >
              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}