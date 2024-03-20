//#region IMPORTS
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { initColors, selectColor } from '../../redux/features/colors';
import { useColors, useNotes } from '../../redux/selectors';
import cn from 'classnames';
import { createNewNote, deleteExistingNote, updateSelectedNote } from '../../redux/features/notes';
import { Link, useParams } from 'react-router-dom';
import { getNote } from '../../api/notes';
import { UUID } from 'crypto';
import { Loader } from '../Loader';
import { Note } from '../../types/Note';
//#endregion

export const CreateForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const colors = useColors().data;
  const { error, colorsAreLoading, selectedColorId } = useColors();

  const { notesAreLoading } = useNotes();

  const [text, setText] = useState('');
  const [noteToUpdate, setNoteToUpdate] = useState<Note | null>(null);
  const { noteId } = useParams();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    dispatch(initColors());

    if (noteId) {
      getNote(noteId as UUID)
        .then(note => {
          setNoteToUpdate(note);
          setText(note.text);
          dispatch(selectColor(note.colorId));
        });

      return;
    }

    dispatch(selectColor(0));
  }, []);

  const handleSubmit = () => {
    if (selectedColorId !== null) {
      if (noteToUpdate) {
        if (!text) {
          dispatch(deleteExistingNote(noteId as UUID));

          return;
        }

        dispatch(updateSelectedNote({
          ...noteToUpdate,
          text,
          colorId: selectedColorId,
        }));

        return;
      }

      if (!text) {
        return;
      }

      dispatch(createNewNote({
        text,
        colorId: selectedColorId,
        highlighted: false,
      }));

      return;
    }
  };

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <>
      {colorsAreLoading && <Loader />}

      {!error && !colorsAreLoading && (
        <div className="create-form">
          <div className="create-form__header">
            <Link
              to="/"
              title="back to main page"
              className="icon icon--back"
            />

            <button
              title="copy text"
              onClick={handleCopy}
              className="icon icon--copy"
            />

            <button
              title="clear text"
              onClick={() => setText('')}
              className="icon icon--clear"
            />
          </div>

          <textarea
            ref={inputRef}
            placeholder="Write smth..."
            className="create-form__text-field"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="create-form__footer">
            <div className="create-form__color-section">
              Choose color

              <div className="create-form__colors">
                {colors.map(color => (
                  <input
                    type="radio"
                    key={color.id}
                    className={cn(`create-form__color
                      create-form__color--${color.name}`, {
                      'create-form__color--active': selectedColorId === color.id
                    })}
                    onClick={() => dispatch(selectColor(color.id))}
                  />
                ))}
              </div>
            </div>

            <button
              className="create-form__btn"
              onClick={handleSubmit}
            >
              {notesAreLoading ? <Loader /> : 'Save'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
