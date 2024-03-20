import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createNote, deleteNote, getNotes, updateNote } from '../../../api/notes';
import { NoteState } from '../../../types/NoteState';
import { Note } from '../../../types/Note';
import { UUID } from 'crypto';

const initialState: NoteState = {
  data: [],
  notesAreLoading: false,
  error: '',
};

export const initNotes = createAsyncThunk('notes/get', () => {
  return getNotes();
});

export const createNewNote = createAsyncThunk('notes/create',
  ({ text, colorId, highlighted }: Omit<Note, 'id' | 'date'>) => {
    return createNote({ text, colorId, highlighted });
  });

export const updateSelectedNote = createAsyncThunk('notes/update',
  ({ id, text, colorId, highlighted }: Omit<Note, 'date'>) => {
    return updateNote({ id, text, colorId, highlighted });
  });

export const deleteExistingNote = createAsyncThunk('notes/delete', (id: UUID) => {
  return deleteNote(id);
});

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},

  extraReducers: (buider) => {
    const setLoadingAndError = (
      state: NoteState,
      stateLoading: boolean,
      stateError: string
    ) => {
      state.notesAreLoading = stateLoading;
      state.error = stateError;
    };

    buider.addCase(initNotes.pending, state => {
      setLoadingAndError(state, true, '');
    });

    buider.addCase(initNotes.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');

      state.data = action.payload;
    });

    buider.addCase(initNotes.rejected, state => {
      const error = 'Error happened while loading notes, please try again';
      setLoadingAndError(state, false, error);
    });

    buider.addCase(createNewNote.pending, state => {
      setLoadingAndError(state, true, '');
    });

    buider.addCase(createNewNote.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');

      const newNote = action.payload;
      state.data.push(newNote);
    });

    buider.addCase(createNewNote.rejected, state => {
      const error = 'Error happened while creating note, please try again';
      setLoadingAndError(state, false, error);
    });

    buider.addCase(updateSelectedNote.pending, state => {
      setLoadingAndError(state, true, '');
    });

    buider.addCase(updateSelectedNote.fulfilled, (state, action) => {
      setLoadingAndError(state, false, '');

      const noteToSet = action.payload;
      state.data = state.data
        .map(note => note.id === noteToSet.id
          ? noteToSet
          : note);
    });

    buider.addCase(updateSelectedNote.rejected, state => {
      const error = 'Error happened while updating note, please try again';
      setLoadingAndError(state, false, error);
    });

    buider.addCase(deleteExistingNote.pending, state => {
      setLoadingAndError(state, true, '');
    });

    buider.addCase(deleteExistingNote.fulfilled, state => {
      setLoadingAndError(state, false, '');
    });

    buider.addCase(deleteExistingNote.rejected, state => {
      const error = 'Error happened while updating note, please try again';
      setLoadingAndError(state, false, error);
    });
  }
});

export const notesReducer = notesSlice.reducer;
