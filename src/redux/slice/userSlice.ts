import {createSlice} from '@reduxjs/toolkit';
import {User} from '../../types/User';

const initialState: {user: User | undefined; isDoctor: boolean} = {
  user: undefined,
  isDoctor: false,
};

const userSlice = createSlice({
  name: 'slice/user',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      state.user = payload;
      state.isDoctor = payload.userType === 'doctor';
    },
  },
});

const userReducer = userSlice.reducer;

export const {setUser} = userSlice.actions;

export default userReducer;
