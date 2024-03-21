import { Color } from '../types/Color';
import { Filter } from '../types/Filter';
import { Note } from '../types/Note';
import { NoteWithColor } from '../types/NoteWithColor';
import { normalizeString } from './normalizeString';

interface PrepareNotesArgs {
  notes: Note[];
  colors: Color[];
  query: string;
  filters: Filter[];
  isHighlighted: boolean;
}

const prepareNotes: (args: PrepareNotesArgs) => NoteWithColor[] = ({
  notes,
  colors,
  query,
  filters,
  isHighlighted
}) => {
  const preparedNotes = notes.map(note => ({
    ...note,
    colorName: colors.find(color => color.id === note.colorId)?.name || 'purple'
  }));

  return preparedNotes.filter(note => {
    const matchesQuery = !query || normalizeString(note.text).includes(normalizeString(query));
    const matchesFilters = filters.length === 0 || filters
      .some(filter => normalizeString(note.colorName)
        .includes(normalizeString(filter)));
    const shouldBeHighlighted = !isHighlighted || note.highlighted;

    return matchesQuery && matchesFilters && shouldBeHighlighted;
  });
};

export default prepareNotes;
