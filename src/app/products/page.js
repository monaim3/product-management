// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getProducts, 
//   searchProducts, 
//   removeProduct, 
//   clearSearch, 
//   setCurrentPage 
// } from '@/store/slices/productsSlice';
// import ProtectedRoute from '@/components/ProtectedRoute';
// import Navbar from '@/components/layout/Navbar';
// import ProductCard from '@/components/products/ProductCard';
// import DeleteModal from '@/components/products/DeleteModal';
// import { Search, Plus, Package, AlertCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
// import toast from 'react-hot-toast';

// // Debounce hook
// function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// function ProductsPageContent() {
//   const router = useRouter();
//   const dispatch = useDispatch();
  
//   const { 
//     items, 
//     searchResults, 
//     loading, 
//     searchLoading, 
//     error, 
//     currentPage, 
//     itemsPerPage, 
//     hasMore,
//     isSearching 
//   } = useSelector((state) => state.products);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const debouncedSearchQuery = useDebounce(searchQuery, 500);


//   useEffect(() => {
//     if (!isSearching) {
//       const offset = (currentPage - 1) * itemsPerPage;
//       dispatch(getProducts({ offset, limit: itemsPerPage }));
//     }
//   }, [dispatch, currentPage, itemsPerPage, isSearching]);

//   // Handle search
//   useEffect(() => {
//     if (debouncedSearchQuery.trim().length > 0) {
//       dispatch(searchProducts(debouncedSearchQuery.trim()));
//     } else {
//       dispatch(clearSearch());
//     }
//   }, [debouncedSearchQuery, dispatch]);


//   const displayProducts = isSearching ? searchResults : items;

//   // Handle delete
// // When user clicks the delete button in ProductCard
// const handleDeleteClick = (product) => {
//   setProductToDelete(product);
//   setDeleteModalOpen(true);
// };

// // When user confirms deletion
// const handleDeleteConfirm = async () => {
//   if (!productToDelete) return;

//   setIsDeleting(true);
//   try {
//     await dispatch(removeProduct(productToDelete.id)).unwrap();

//     toast.success("Product deleted successfully!");

//     setDeleteModalOpen(false);
//     setProductToDelete(null);

//     // Clear search to force refresh
//     dispatch(clearSearch());

//     // Refresh products list
//     const offset = (currentPage - 1) * itemsPerPage;
//     dispatch(getProducts({ offset, limit: itemsPerPage }));
//   } catch (err) {
//     toast.error("Failed to delete product");
//     console.error(err);
//   } finally {
//     setIsDeleting(false);
//   }
// };



//   // Pagination
//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       dispatch(setCurrentPage(currentPage - 1));
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleNextPage = () => {
//     if (hasMore) {
//       dispatch(setCurrentPage(currentPage + 1));
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
     
      
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
//               <p className="text-gray-600">
//                 {isSearching 
//                   ? `Found ${displayProducts.length} results for "${searchQuery}"`
//                   : `Manage your product inventory`
//                 }
//               </p>
//             </div>
//             <button
//               onClick={() => router.push('/products/create')}
//               className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 font-medium"
//             >
//               <Plus className="w-5 h-5" />
//               Add Product
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search products by name..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white shadow-sm"
//             />
//             {searchLoading && (
//               <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 animate-spin" />
//             )}
//           </div>
//         </div>

//         {/* Error State */}
//         {error && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
//             <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
//             <div>
//               <h3 className="font-semibold text-red-900">Error</h3>
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           </div>
//         )}

//         {/* Loading State */}
//         {loading && !isSearching && (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center">
//               <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
//               <p className="text-gray-600">Loading products...</p>
//             </div>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && displayProducts.length === 0 && (
//           <div className="text-center py-20">
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
//               <Package className="w-8 h-8 text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               {isSearching ? 'No products found' : 'No products yet'}
//             </h3>
//             <p className="text-gray-600 mb-6">
//               {isSearching 
//                 ? 'Try adjusting your search query'
//                 : 'Get started by creating your first product'
//               }
//             </p>
//             {!isSearching && (
//               <button
//                 onClick={() => router.push('/products/create')}
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//               >
//                 <Plus className="w-5 h-5" />
//                 Create Product
//               </button>
//             )}
//           </div>
//         )}

//         {/* Products Grid */}
//         {!loading && displayProducts.length > 0 && (
//           <>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
//               {displayProducts.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   onDelete={handleDeleteClick}
//                 />
//               ))}
//             </div>

//             {/* Pagination - Only show when not searching */}
//             {!isSearching && (
//               <div className="flex items-center justify-between pt-6 border-t border-gray-200">
//                 <div className="text-sm text-gray-600">
//                   Page {currentPage}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={handlePrevPage}
//                     disabled={currentPage === 1}
//                     className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700"
//                   >
//                     <ChevronLeft className="w-4 h-4" />
//                     Previous
//                   </button>
//                   <button
//                     onClick={handleNextPage}
//                     disabled={!hasMore}
//                     className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700"
//                   >
//                     Next
//                     <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Delete Modal */}
//       <DeleteModal
//         isOpen={deleteModalOpen}
//         onClose={() => {
//           setDeleteModalOpen(false);
//           setProductToDelete(null);
//         }}
//         onConfirm={handleDeleteConfirm}
//         product={productToDelete}
//         isDeleting={isDeleting}
//       />
//     </div>
//   );
// }

// export default function ProductsPage() {
//   return (
//     <ProtectedRoute>
//       <ProductsPageContent />
//     </ProtectedRoute>
//   );
// }

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
import { Search, Plus, Package, AlertCircle, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
              <p className="text-gray-600">
                {isSearching
                  ? `Found ${displayProducts.length} results for "${searchQuery}"`
                  : `Manage your product inventory`}
              </p>
            </div>
            <button
              onClick={() => router.push('/products/create')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white shadow-sm"
              />
              {searchLoading && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 animate-spin" />
              )}
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Filter by Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {loading && !isSearching && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">Loading products...</p>
            </div>
          </div>
        )}

        {!loading && displayProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {isSearching ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isSearching
                ? 'Try adjusting your search query'
                : 'Get started by creating your first product'}
            </p>
            {!isSearching && (
              <button
                onClick={() => router.push('/products/create')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5" />
                Create Product
              </button>
            )}
          </div>
        )}


        {!loading && displayProducts.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {displayProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {!isSearching && (
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">Page {currentPage}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={!hasMore}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700"
                  >
                    Next
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
