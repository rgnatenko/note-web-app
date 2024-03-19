import { Note } from './Note';

export interface NoteState {
  data: Note[],
  notesAreLoading: boolean,
  error: string,
}
