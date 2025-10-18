
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productsAPI } from '@/services/api';

// Get products
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async ({ offset = 0, limit = 12, categoryId = null }, { rejectWithValue }) => {
    try {
      const data = await productsAPI.getAll(offset, limit, categoryId);
      return { data, offset, limit };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Search products
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchText, { rejectWithValue }) => {
    try {
      const data = await productsAPI.search(searchText);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete product
export const removeProduct = createAsyncThunk(
  'products/removeProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await productsAPI.delete(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create product
export const createProductAsync = createAsyncThunk(
  'products/createProductAsync',
  async (productData, { rejectWithValue }) => {
    try {
      const data = await productsAPI.create(productData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// ---------------- Get Product by Slug ----------------
export const getProductBySlug = createAsyncThunk(
  'products/getProductBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const data = await productsAPI.getBySlug(slug);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// Update product
export const updateProductAsync = createAsyncThunk(
  'products/updateProductAsync',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const data = await productsAPI.update(id, updatedData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ------ Slice ---------
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    searchResults: [],
    currentProduct: null,
    loading: false,
    searchLoading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
    hasMore: true,
    isSearching: false,
    lastFetch: null,
    cacheTimeout: 5 * 60 * 1000, // 5 minutes
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearSearch: (state) => {
      state.isSearching = false;
      state.searchResults = [];
    },
    invalidateCache: (state) => {
      state.lastFetch = null;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // ---------------- Get Products ----------------
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.hasMore = action.payload.data.length === action.payload.limit;
        state.lastFetch = Date.now();
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- Search Products ----------------
      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
        state.isSearching = true;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.payload;
      })

      // ---------------- Get Product by Slug ----------------
      .addCase(getProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(getProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // ---------------- Delete Product ----------------
     .addCase(removeProduct.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.searchResults = state.searchResults.filter((item) => item.id !== action.payload);
      state.lastFetch = null; // invalidate cache
    })

      // ---------------- Create Product ----------------
      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.lastFetch = null;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ---------------- Update Product ----------------
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.lastFetch = null;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCurrentPage,
  clearSearch,
  invalidateCache,
  setCurrentProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
