import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { } from '../../../types/NoteState';
import { getColors } from '../../../api/colors';
import { ColorState } from '../../../types/ColorState';

const initialState: ColorState = {
  data: [],
  colorsAreLoading: false,
  error: '',
  selectedColorId: null
};

export const initColors = createAsyncThunk('colors/get', () => {
  return getColors();
});

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {
    selectColor: (state, action: PayloadAction<number>) => {
      const colorId = action.payload;

      state.selectedColorId = colorId;
    },
  },

  extraReducers: (buider) => {
    buider.addCase(initColors.pending, state => {
      state.colorsAreLoading = true;
      state.error = '';
    });

    buider.addCase(initColors.fulfilled, (state, action) => {
      state.colorsAreLoading = false;
      state.error = '';

      state.data = action.payload;
    });

    buider.addCase(initColors.rejected, state => {
      state.colorsAreLoading = false;
      state.error = 'Error happened while loading colors, please try again';
    });
  }
});

export const { selectColor } = colorsSlice.actions;

export const colorsReducer = colorsSlice.reducer;

