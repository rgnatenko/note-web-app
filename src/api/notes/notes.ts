import { UUID } from 'crypto';
import { Note } from '../../types/Note';
import { client } from '../../fetchClient/fetchClient';

export const getNotes = () => client.get<Note[]>('notes');

export const getNote = (id: UUID) => client.get<Note>(`notes/${id}`);

export const createNote = ({ text, colorId }
  : Omit<Note, 'id' | 'date'>) => {
  return client.post<Note>('notes', { text, colorId });
};

export const deleteNote = (id: UUID) => {
  return client.delete(`notes/${id}`);
};


export const updateNote = ({
  text, colorId, id, highlighted
}: Omit<Note, 'date'>) => {
  return client.patch<Note>(`notes/${id}`, { text, colorId, highlighted });
};
