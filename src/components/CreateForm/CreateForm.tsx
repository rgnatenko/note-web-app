/* eslint-disable @typescript-eslint/no-empty-function */
//#region IMPORTS
import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { selectColor } from '../../redux/features/colors';
import { useColors, useNotes } from '../../redux/selectors';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Note } from '../../types/Note';
import { createNote, deleteNote, setLoading, updateNote } from '../../redux/features/notes';
import { ButtonWithIcon } from '../../ui/ButtonWithIcon';
import { Input } from '../../ui/Input';
//#endregion

export const CreateForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedColorId, colors } = useColors();
  const { notes, loading } = useNotes();

  const [text, setText] = useState('');
  const [noteToUpdate, setNoteToUpdate] = useState<Note | null>(null);
  const { noteId } = useParams();

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (noteId) {
      const note = notes.find(note => note.id === noteId) as Note;

      setNoteToUpdate(note);
      setText(note.text);
      dispatch(selectColor(note.colorId));
    }
  }, []);

  const setOffLoading = () => setTimeout(() => {
    dispatch(setLoading(false));
  }, 500);

  const handleSubmit = () => {
    const noteDidntChange = text === noteToUpdate?.text
      && noteToUpdate.colorId === selectedColorId;
    if (noteDidntChange) return;

    dispatch(setLoading(true));

    if (!text) {
      if (noteToUpdate) dispatch(deleteNote(noteId as string));

      setOffLoading();
      return;
    }

    if (noteToUpdate) {
      dispatch(updateNote({
        ...noteToUpdate,
        text,
        colorId: selectedColorId,
      }));

      setOffLoading();

      return;
    }

    dispatch(createNote({
      text,
      colorId: selectedColorId
    }));

    setOffLoading();
  };

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div className="create-form">
      <div className="create-form__header">
        <ButtonWithIcon
          link="/"
          title="back to main page"
          btnClass="icon icon--back"
          onClick={handleSubmit}
        />

        <ButtonWithIcon
          title="copy text"
          onClick={handleCopy}
          btnClass="icon icon--copy"
        />

        <ButtonWithIcon
          title="clear text"
          onClick={() => setText('')}
          btnClass="icon icon--clear"
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
              <Input
                type="radio"
                key={color.id}
                inputClass={cn(`create-form__color
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
          {loading ? <Loader /> : 'Save'}
        </button>
      </div>
    </div>
  );
};
