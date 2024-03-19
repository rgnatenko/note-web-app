import React from 'react';
import { CreateButton } from '../CreateButton';

export const FirstScreen: React.FC = () => {
  return (
    <div className="first-screen">
      <p className="first-screen__heading">
        Create your first note!
      </p>

      <CreateButton
        btnClass="first-screen__create-btn"
      />
    </div>
  );
};
