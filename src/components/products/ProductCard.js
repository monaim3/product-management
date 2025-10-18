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
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div 
        className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden cursor-pointer"
        onClick={() => router.push(`/products/${product.slug}`)}
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
            <div className="text-6xl text-gray-300">📦</div>
          </div>
        )}
        
        {product.category && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full shadow-sm">
              {product.category.name}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      <div className="p-5">
        <h3 
          className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => router.push(`/products/${product.slug}`)}
        >
          {product.name}
        </h3>

  
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
          {product.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-medium">Price</span>
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push(`/products/${product.slug}`)}
              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors group/btn cursor-pointer"
              title="View Details"
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => router.push(`/products/${product.slug}/edit`)}
              className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors group/btn cursor-pointer"
              title="Edit Product"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(product)}
              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors group/btn"
              title="Delete Product"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


