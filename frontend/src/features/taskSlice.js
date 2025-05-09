import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const response = await api.get('/tasks');
  return response.data;
});

export const createTask = createAsyncThunk('tasks/create', async (task) => {
  const response = await api.post('/tasks', task);
  return response.data;
});

export const deleteCompletedTasks = createAsyncThunk('tasks/deleteCompleted', async () => {
  await api.delete('/tasks/completed');
  return true;
});

export const toggleComplete = createAsyncThunk('tasks/toggleComplete', async ({ id, completed }) => {
  const response = await api.put(`/tasks/${id}`, { completed });
  return response.data;
});

export const editTask = createAsyncThunk('tasks/edit', async ({ id, title }) => {
  const response = await api.put(`/tasks/${id}`, { title });
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => action.payload)
      .addCase(createTask.fulfilled, (state, action) => [...state, action.payload])
      .addCase(deleteCompletedTasks.fulfilled, (state) => 
        state.filter((task) => !task.completed)
      )
      .addCase(toggleComplete.fulfilled, (state, action) => 
        state.map((task) => task._id === action.payload._id ? action.payload : task)
      )
      .addCase(editTask.fulfilled, (state, action) => 
        state.map((task) => task._id === action.payload._id ? action.payload : task)
      );
  },
});

export default taskSlice.reducer;
