import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { } from '../../../types/NoteState';
import { ColorState } from '../../../types/ColorState';

const initialState: ColorState = {
  colors: [
    { id: 0,name: 'purple',hash: '#B488F8' },
    { id: 1, name: 'yellow', hash: '#E5F699' },
    { id: 2, name: 'red', hash: '#F5957A' },
    { id: 3, name: 'blue', hash: '#26E6FA' },
    { id: 4, name: 'orange', hash: '#F9CA7C' }
  ],
  selectedColorId: 0
};

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    selectColor: (state, action: PayloadAction<number>) => {
      const colorId = action.payload;

      state.selectedColorId = colorId;
    },
  },
});

export const { selectColor } = colorsSlice.actions;

export const colorsReducer = colorsSlice.reducer;

