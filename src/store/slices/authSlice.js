import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '@/services/api';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (email, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(email);
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      return {
        token: data.token,
        email: email,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    email: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Logout action
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    
    // Restore session from localStorage
    restoreSession: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
    
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login pending
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Login success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.email = action.payload.email;
        state.isAuthenticated = true;
        state.error = null;
      })
      // Login failed
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, restoreSession, clearError } = authSlice.actions;
export default authSlice.reducer;