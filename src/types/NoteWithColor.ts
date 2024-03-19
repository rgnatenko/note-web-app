import { ColorName } from './Color';
import { Note } from './Note';

export interface NoteWithColor extends Note {
  colorName: ColorName
}
