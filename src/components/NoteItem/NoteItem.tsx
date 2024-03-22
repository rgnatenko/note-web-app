import React from 'react';
import cn from 'classnames';
import { Note } from '../../types/Note';
import { useAppDispatch } from '../../redux/hooks';
import classNames from 'classnames';
import { updateNote } from '../../redux/features/notes/notesSlice';
import { ButtonWithIcon } from '../../ui/ButtonWithIcon';
import { normalizeNoteText } from '../../helpers/normalizeNoteText';

type Props = { note: Note, colorName: string };

export const NoteItem: React.FC<Props> = ({ note, colorName }) => {
  const { text } = note;

  const dispatch = useAppDispatch();

  const higlightNote = () => {
    dispatch(updateNote({ ...note, highlighted: !note.highlighted }));
  };

  return (
    <div className={cn(`notes__note note note--${colorName}`)}>
      <div className="note__top">
        <p className="note__text">{normalizeNoteText(text)}</p>

        <div className="note__highlight">
          <ButtonWithIcon
            btnClass={classNames('icon', {
              'icon--not-highlighted': !note.highlighted,
              'icon--highlighted': note.highlighted,
            })}
            onClick={higlightNote}
          />
        </div>
      </div>

      <div className="note__footer">
        <p className="note__date">{note.date}</p>

        <div className="note__edit">
          <ButtonWithIcon
            link={`/update/${note.id}`}
            btnClass="icon icon--edit"
          />
        </div>
      </div>
    </div>
  );
};
