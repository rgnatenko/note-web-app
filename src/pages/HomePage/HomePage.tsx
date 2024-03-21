import React from 'react';
import { useColors, useNotes } from '../../redux/selectors';
import { NoteList } from '../../components/NoteList';
import { FirstScreen } from '../../components/FirstScreen';
import prepareNotes from '../../helpers/prepareNotes';
import { Header } from '../../components/Header';

export const HomePage: React.FC = () => {
  const { colors } = useColors();
  const { notes, query, filters, isHighlighted } = useNotes();
  const notesOnThePage = prepareNotes({
    notes,
    colors,
    query,
    filters,
    isHighlighted
  });

  return (<>
    {notes.length > 0
      ? (
        <>
          <Header />
          <NoteList
            notes={notesOnThePage}
          />
        </>
      ) : <FirstScreen />}
  </>);
};
