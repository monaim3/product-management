

// import axios from 'axios';

// const API_BASE_URL = 'https://api.bitechx.com';

// // Create axios instance
// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add token to all requests
// apiClient.interceptors.request.use(
//   (config) => {
//     // Get token from localStorage (or you can get from Redux store)
//     const token = localStorage.getItem('token');
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expired or invalid - clear auth and redirect to login
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth API
// export const authAPI = {
//   login: async (email) => {
//     const response = await apiClient.post('/auth', { email });
//     return response.data;
//   },
// };

// // Products API
// export const productsAPI = {
//   getAll: async (offset = 0, limit = 12, categoryId = null) => {
//     const params = { offset, limit };
//     if (categoryId) params.categoryId = categoryId;
    
//     const response = await apiClient.get('/products', { params });
//     return response.data;
//   },
  
//   getBySlug: async (slug) => {
//     const response = await apiClient.get(`/products/${slug}`);
//     return response.data;
//   },
  
//   search: async (searchText) => {
//     const response = await apiClient.get('/products/search', {
//       params: { searchedText: searchText },
//     });
//     return response.data;
//   },
  
//   create: async (productData) => {
//     const response = await apiClient.post('/products', productData);
//     return response.data;
//   },
  
//   update: async (id, productData) => {
//     const response = await apiClient.put(`/products/${id}`, productData);
//     return response.data;
//   },
  
//   delete: async (id) => {
//     const response = await apiClient.delete(`/products/${id}`);
//     return response.data;
//   },
// };

// // Categories API
// export const categoriesAPI = {
//   getAll: async () => {
//     const response = await apiClient.get('/categories');
//     return response.data;
//   },
// };


import axios from 'axios';

const API_BASE_URL = 'https://api.bitechx.com';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ---------------- AUTH API ----------------
export const authAPI = {
  login: async (email) => {
    const response = await apiClient.post('/auth', { email });
    return response.data;
  },
};

// ---------------- PRODUCTS API ----------------
export const productsAPI = {
  getAll: async (offset = 0, limit = 12, categoryId = null) => {
    const params = { offset, limit };
    if (categoryId) params.categoryId = categoryId;
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  getBySlug: async (slug) => {
    const response = await apiClient.get(`/products/${slug}`);
    return response.data;
  },

  search: async (searchText) => {
    const response = await apiClient.get('/products/search', {
      params: { searchedText: searchText },
    });
    return response.data;
  },

  create: async (productData) => {
    const response = await apiClient.post('/products', productData);
    return response.data;
  },

  update: async (id, productData) => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  delete: async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};

// ---------------- CATEGORIES API ----------------
export const categoriesAPI = {
  getAll: async () => {
    const response = await apiClient.get('/categories');
    return response.data;
  },
};
