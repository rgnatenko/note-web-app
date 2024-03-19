import { Color } from '../types/Color';
import { Note } from '../types/Note';
import { NoteWithColor } from '../types/NoteWithColor';

type PrepareNotes = (notes: Note[], colors: Color[]) => NoteWithColor[];

const prepareNotes: PrepareNotes = (notes, colors) => {
  return notes.map(note => ({
    ...note,
    colorName: colors.find(color => color.id === note.colorId)?.name || 'purple'
  }));
};

export default prepareNotes;
