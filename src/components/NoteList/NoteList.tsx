import React from 'react';
import { NoteItem } from '../NoteItem';
import { NoteWithColor } from '../../types/NoteWithColor';

type Props = {
  notes: NoteWithColor[]
};

export const NoteList: React.FC<Props> = ({ notes }) => {
  return (
    <div className="notes">
      {notes.map(note =>
        <NoteItem
          key={note.id}
          note={note}
          colorName={note.colorName}
        />
      )}
    </div>
  );
};
