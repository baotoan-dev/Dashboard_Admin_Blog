import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  console.log('API_URL:', API_URL);
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch users');
  return await res.json();
});
export const addUser = createAsyncThunk('user/addUser', async (user) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to add user');
  return await res.json();
});
export const updateUser = createAsyncThunk('user/updateUser', async (user) => {
  const res = await fetch(`${API_URL}/${user.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return await res.json();
});
export const deleteUser = createAsyncThunk('user/deleteUser', async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
  return id;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.list.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
