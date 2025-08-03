// src/redux/slices/user.slice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone:number
  } | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState['user']>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
