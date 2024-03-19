import { useAppSelector } from '../hooks';

export const useNotes = () => useAppSelector(state => state.notes);
export const useColors = () => useAppSelector(state => state.colors);
