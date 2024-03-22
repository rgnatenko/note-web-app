import React from 'react';
import { useNotes, useNotesOnThePage } from '../../redux/selectors';
import { NoteList } from '../../components/NoteList';
import { FirstScreen } from '../../components/FirstScreen';
import { Header } from '../../components/Header';

export const HomePage: React.FC = () => {
  const { notes } = useNotes();

  if (notes.length > 0) {
    return (
      <>
        <Header />
        <NoteList
          notes={useNotesOnThePage()}
        />
      </>
    );
  }

  return (
    <FirstScreen />
  );
};
