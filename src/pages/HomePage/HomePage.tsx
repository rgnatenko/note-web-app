import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { useColors, useNotes } from '../../redux/selectors';
import { NoteList } from '../../components/NoteList';
import { FirstScreen } from '../../components/FirstScreen';
import { initNotes } from '../../redux/features/notes';
import { initColors } from '../../redux/features/colors';
import { Loader } from '../../components/Loader';
import prepareNotes from '../../helpers/prepareNotes';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const notes = useNotes().data;
  const colors = useColors().data;

  const { colorsAreLoading } = useColors();
  const { notesAreLoading } = useNotes();
  const dataIsBeinLoaded = colorsAreLoading && notesAreLoading;
  const noNotesOnServer = !dataIsBeinLoaded && !notes.length;

  useEffect(() => {
    dispatch(initNotes());
    dispatch(initColors());
  }, []);

  return (<>
    {dataIsBeinLoaded && <Loader />}

    {!dataIsBeinLoaded && notes.length > 0
      && (
        <NoteList
          notes={prepareNotes(notes, colors)}
        />
      )}

    {noNotesOnServer && <FirstScreen />}
  </>);
};
