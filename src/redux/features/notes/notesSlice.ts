import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteState } from '../../../types/NoteState';
import { Note } from '../../../types/Note';
import { Filter } from '../../../types/Filter';
import parseDataFromStorage from '../../../helpers/parseDataFromStorage';
import { createNoteDate } from '../../../helpers/createNoteDate';
import { generateNoteId } from '../../../helpers/generateNoteId';

const initialState: NoteState = {
  notes: parseDataFromStorage<Note[], []>('notes', []),
  loading: false,
  filters: parseDataFromStorage<Filter[], []>('filters', []),
  query: parseDataFromStorage<string, string>('query', ''),
  isHighlighted: parseDataFromStorage<boolean, boolean>('isHighlighted', false),
};

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<Filter>) => {
      const filter = action.payload;

      state.filters.push(filter);
      localStorage.setItem('filters', JSON.stringify(state.filters));
    },

    removeFilter: (state, action: PayloadAction<Filter>) => {
      const filterToDelete = action.payload;

      state.filters = state.filters
        .filter(filter => filter !== filterToDelete);
      localStorage.setItem('filters', JSON.stringify(state.filters));
    },

    clearFilters: state => {
      state.filters = [];
      localStorage.setItem('filters', JSON.stringify(state.filters));
    },

    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;

      localStorage.setItem('query', JSON.stringify(state.query));
    },

    setIsHighlighted: (state, action: PayloadAction<boolean>) => {
      state.isHighlighted = action.payload;

      localStorage.setItem('isHighlighted', JSON.stringify(state.isHighlighted));
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    createNote: (
      state,
      action: PayloadAction<Omit<
        Note, 'id' | 'date' | 'highlighted'
      >>
    ) => {
      const newNote: Note = {
        ...action.payload,
        id: generateNoteId(),
        date: createNoteDate(new Date()),
        highlighted: false
      };

      state.notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },

    updateNote: (state, action: PayloadAction<Note>) => {
      const noteToUpdate = action.payload;
      noteToUpdate.date = createNoteDate(new Date());

      state.notes = state.notes
        .map(note => note.id === noteToUpdate.id
          ? noteToUpdate
          : note);

      localStorage.setItem('notes', JSON.stringify(state.notes));
    },

    deleteNote: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      state.notes = state.notes.filter(note => note.id !== id);
      localStorage.setItem('notes', JSON.stringify(state.notes));
    },
  },
});

export const {
  addFilter,
  removeFilter,
  clearFilters,
  setIsHighlighted,
  setQuery,
  setLoading,
  createNote,
  updateNote,
  deleteNote,
} = notesSlice.actions;

export const notesReducer = notesSlice.reducer;
