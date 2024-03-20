import React from 'react';
import { NoteItem } from '../NoteItem';
import { NoteWithColor } from '../../types/NoteWithColor';
import { CreateButton } from '../CreateButton';

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

      <div className="notes__note note note--add">
        Add note
        <CreateButton btnClass="note__add-btn" />
      </div>
    </div>
  );
};
