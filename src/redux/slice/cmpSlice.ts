import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  selectedCalories: '',
};

const cmpSlice = createSlice({
  name: 'cmpslice',
  initialState,
  reducers: {
    setSelectedCalories: (state, action: PayloadAction<string>) => {
      console.log(action.type);
      state.selectedCalories = action.payload;
    },
  },
});

const cmpReducer = cmpSlice.reducer;
export const {setSelectedCalories} = cmpSlice.actions;
export default cmpReducer;
