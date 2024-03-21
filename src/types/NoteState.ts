import { Filter } from './Filter';
import { Note } from './Note';

export interface NoteState {
  notes: Note[],
  loading: boolean,
  filters: Filter[],
  query: string,
  isHighlighted: boolean,
}
