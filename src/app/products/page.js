'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  searchProducts,
  removeProduct,
  clearSearch,
  setCurrentPage,
} from '@/store/slices/productsSlice';

import ProtectedRoute from '@/components/ProtectedRoute';
import ProductCard from '@/components/products/ProductCard';
import DeleteModal from '@/components/products/DeleteModal';
import { Search, Plus, Package, AlertCircle, Loader2, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { getCategories } from '@/store/slices/categoriesSlice';

// Debounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function ProductsPageContent() {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    items,
    searchResults,
    loading,
    searchLoading,
    error,
    currentPage,
    itemsPerPage,
    hasMore,
    isSearching,
  } = useSelector((state) => state.products);

  const { categories } = useSelector((state) => state.categories);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!isSearching) {
      const offset = (currentPage - 1) * itemsPerPage;
      dispatch(getProducts({ offset, limit: itemsPerPage, categoryId: selectedCategory || null }));
    }
  }, [dispatch, currentPage, itemsPerPage, isSearching, selectedCategory]);

  useEffect(() => {
    if (debouncedSearchQuery.trim().length > 0) {
      dispatch(searchProducts(debouncedSearchQuery.trim()));
    } else {
      dispatch(clearSearch());
    }
  }, [debouncedSearchQuery, dispatch]);

  const displayProducts = isSearching ? searchResults : items;

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await dispatch(removeProduct(productToDelete.id)).unwrap();
      setDeleteModalOpen(false);
      setProductToDelete(null);

      const offset = (currentPage - 1) * itemsPerPage;
      dispatch(getProducts({ offset, limit: itemsPerPage, categoryId: selectedCategory || null }));
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      dispatch(setCurrentPage(currentPage + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen mt-6" style={{ backgroundColor: '#FAF9F6' }}>
      {/* Header Section */}
      <div className="sticky top-0 z-10 shadow-lg" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: '#4E6E5D' }}>
                Products
              </h1>
              <p className="text-sm sm:text-base" style={{ color: '#4E6E5D', opacity: 0.8 }}>
                {isSearching
                  ? `Found ${displayProducts.length} results for "${searchQuery}"`
                  : `Manage your product inventory`}
              </p>
            </div>
            <button
              onClick={() => router.push('/products/create')}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
              style={{ backgroundColor: '#4E6E5D', color: '#EFF1F3' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#AD8A64'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4E6E5D'}
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
 
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#4E6E5D' }} />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-xl outline-none transition-all shadow-md text-base"
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #4E6E5D',
                color: '#0D1821'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#AD8A64';
                e.target.style.boxShadow = '0 0 0 3px rgba(173, 138, 100, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#4E6E5D';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            />
            {searchLoading && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin" style={{ color: '#4E6E5D' }} />
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl shadow-md" style={{ backgroundColor: '#ffffff' }}>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" style={{ color: '#4E6E5D' }} />
              <label className="font-semibold text-sm sm:text-base" style={{ color: '#0D1821' }}>
                Category:
              </label>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg outline-none transition-all font-medium"
              style={{
                backgroundColor: '#EFF1F3',
                border: '2px solid #4E6E5D',
                color: '#0D1821'
              }}
              onFocus={(e) => e.target.style.borderColor = '#AD8A64'}
              onBlur={(e) => e.target.style.borderColor = '#4E6E5D'}
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory('')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{ backgroundColor: '#A44A3F', color: '#EFF1F3' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.85'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 rounded-xl flex items-start gap-3 shadow-lg" style={{ backgroundColor: '#ffffff', border: '2px solid #A44A3F' }}>
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#A44A3F' }} />
            <div>
              <h3 className="font-semibold" style={{ color: '#A44A3F' }}>Error</h3>
              <p className="text-sm" style={{ color: '#4E6E5D' }}>{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !isSearching && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" style={{ color: '#4E6E5D' }} />
              <p className="text-lg font-medium" style={{ color: '#4E6E5D' }}>Loading products...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && displayProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ backgroundColor: 'rgba(78, 110, 93, 0.1)' }}>
              <Package className="w-10 h-10" style={{ color: '#4E6E5D' }} />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#0D1821' }}>
              {isSearching ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-base mb-8 max-w-md mx-auto" style={{ color: '#4E6E5D' }}>
              {isSearching
                ? 'Try adjusting your search query or filters'
                : 'Get started by creating your first product'}
            </p>
            {!isSearching && (
              <button
                onClick={() => router.push('/products/create')}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
                style={{ backgroundColor: '#4E6E5D', color: '#EFF1F3' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#AD8A64'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#4E6E5D'}
              >
                <Plus className="w-5 h-5" />
                Create Product
              </button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {!loading && displayProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {/* Pagination */}
            {!isSearching && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl shadow-md" style={{ backgroundColor: '#ffffff' }}>
                <div className="text-base font-semibold" style={{ color: '#0D1821' }}>
                  Page {currentPage}
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: currentPage === 1 ? '#EFF1F3' : '#4E6E5D',
                      color: currentPage === 1 ? '#4E6E5D' : '#EFF1F3',
                      border: `2px solid #4E6E5D`
                    }}
                    onMouseEnter={(e) => {
                      if (currentPage > 1) {
                        e.target.style.backgroundColor = '#AD8A64';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentPage > 1) {
                        e.target.style.backgroundColor = '#4E6E5D';
                      }
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                    <span className="sm:hidden">Prev</span>
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={!hasMore}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: !hasMore ? '#EFF1F3' : '#4E6E5D',
                      color: !hasMore ? '#4E6E5D' : '#EFF1F3',
                      border: `2px solid #4E6E5D`
                    }}
                    onMouseEnter={(e) => {
                      if (hasMore) {
                        e.target.style.backgroundColor = '#AD8A64';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (hasMore) {
                        e.target.style.backgroundColor = '#4E6E5D';
                      }
                    }}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

    
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        product={productToDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <ProtectedRoute>
      <ProductsPageContent />
    </ProtectedRoute>
  );
}