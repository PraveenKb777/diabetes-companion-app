import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IFood} from '../../screens/CaloriesWiseList';

interface IinitialState {
  selectedCalories: string;
  selectedItems: {[key: number]: (IFood | undefined)[]};
  isVariety: boolean | undefined;
}
const initialState: IinitialState = {
  selectedCalories: '',
  selectedItems: {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  },
  isVariety: false,
};

const cmpSlice = createSlice({
  name: 'cmpslice',
  initialState,
  reducers: {
    setSelectedCalories: (state, action: PayloadAction<string>) => {
      //console.log(action.type);
      state.selectedCalories = action.payload;
    },
    resetState: state => {
      state.selectedCalories = '';
      state.selectedItems = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      };
      state.isVariety = false;
    },
    setSelectedItem: (
      state,
      action: PayloadAction<{
        timingIndex: number;
        itemIndex: number;
        isSelected: boolean;
        item: IFood;
      }>,
    ) => {
      const {isSelected, itemIndex, timingIndex, item} = action.payload;
      //console.log(action.payload);

      const newSelectedItem = {...state.selectedItems};
      //console.log(newSelectedItem[timingIndex][itemIndex]);
      newSelectedItem[timingIndex][itemIndex] = isSelected ? undefined : item;
      state.selectedItems = newSelectedItem;
      //console.log(state);
    },
    setIsVariety: (state, action: PayloadAction<boolean | undefined>) => {
      state.isVariety = action.payload;
    },
    resetLunchSelectedItem: state => {
      const newSelectedItem = {...state.selectedItems};
      console.log(newSelectedItem);

      // const remainingItem = newSelectedItem[3][0];
      newSelectedItem[3][3] = undefined;
      newSelectedItem[3][4] = undefined;
      state.selectedItems = newSelectedItem;
    },
  },
});

const cmpReducer = cmpSlice.reducer;
export const {
  setSelectedCalories,
  setSelectedItem,
  resetState,
  resetLunchSelectedItem,
  setIsVariety,
} = cmpSlice.actions;
export default cmpReducer;
