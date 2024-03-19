import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from '../features/notes';
import { colorsReducer } from '../features/colors';

const store = configureStore({
  reducer: {
    notes: notesReducer,
    colors: colorsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
