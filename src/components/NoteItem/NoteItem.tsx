import React from 'react';
import cn from 'classnames';
import { Note } from '../../types/Note';
import { Link } from 'react-router-dom';

type Props = { note: Note, colorName: string };

export const NoteItem: React.FC<Props> = ({ note, colorName }) => {
  const { text } = note;
  const normalizedText = text.split(' ').length > 15
    ? text.split(' ').slice(0, 16).join(' ') + '...'
    : text;

  return (
    <div className={cn(`notes__note note note--${colorName}`)}>
      <div className="note__top">
        <p className="note__text">{normalizedText}</p>

        <div className="note__highlight">
          <button className="icon icon--highlight" />
        </div>
      </div>

      <div className="note__footer">
        <p className="note__date">{note.date}</p>

        <div className="note__edit">
          <Link to={`/update/${note.id}`} className="icon icon--edit" />
        </div>
      </div>
    </div>
  );
};
