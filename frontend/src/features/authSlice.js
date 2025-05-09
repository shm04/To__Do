import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const loginUser = createAsyncThunk('auth/login', async ({ username, password }) => {
  const response = await api.post('/users/login', { username, password });
  const token = response.data.token;

  if (token) {
    localStorage.setItem('token', token);
  } else {
    console.error('No token received during login');
  }

  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    });
  },
});

export default authSlice.reducer;
