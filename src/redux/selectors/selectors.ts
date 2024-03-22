import { useAppSelector } from '../hooks';
import prepareNotes from '../../helpers/prepareNotes';

export const useNotes = () => useAppSelector(state => state.notes);
export const useColors = () => useAppSelector(state => state.colors);


export const useNotesOnThePage = () => {
  const {notes, query, filters, isHighlighted} = useNotes();
  const {colors} = useColors();

  return prepareNotes({
    notes,
    colors,
    query,
    filters,
    isHighlighted
  });
};
