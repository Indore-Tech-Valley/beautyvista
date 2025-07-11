// src/redux/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ADMIN_LOGIN_URL } from '../../../../config';
const API_URL =ADMIN_LOGIN_URL ; // 🔁 Change this

// ✅ Replace email with username here
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, {
        username,
        password,
      },  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

      const token = res.data.access_token; // Adjust if your response shape is different
      Cookies.set('authToken', token, { expires: 7 });
      
      return token;
    }catch (error) {
      const status = error.response?.status;
      const defaultMsg = 'Login failed. Please try again.';

      // You can customize this further per status code
      const message =
        status === 429
          ? 'Too many login attempts. Please wait and try again later.'
          : error.response?.data?.detail?.[0]?.msg || defaultMsg;

      return rejectWithValue({ message, status });
    }
  }
);


export const logoutAdmin = createAsyncThunk('auth/logoutAdmin', async () => {
  Cookies.remove('authToken');
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: Cookies.get('authToken') || null,
    isAuthenticated: !!Cookies.get('authToken'),
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
  state.loading = false;
  state.error = {
    message: action.payload?.message || 'Login failed',
    status: action.payload?.status || null,
  };
})

      .addCase(logoutAdmin.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
      })
      ;
  },
});

export default authSlice.reducer;
